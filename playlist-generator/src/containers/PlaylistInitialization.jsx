/* eslint-disable no-plusplus */
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { spotifyAppContext } from '../utils/Context';
import { fetchGenres, getRecommendations } from '../utils/fetch';
import { objDeepCheck } from '../utils/utils';
import { ArtistSearchBar } from './ArtistSearchBar';
import { AudioFeatures } from './AudioFeatures';
// import { GenerateButton } from './GenerateButton';
import { Genres } from './Genres/Genres';
import { PlaylistDuration } from './PlaylistDuration';
import { RecommendedTracks } from './RecommendedTracks';
import { SeedsVisual } from './SeedsVisual';
import '../styles/PlaylistInitialization.scss';

export const PlaylistInitialization = () => {
    const context = useContext(spotifyAppContext);
    const { user, token } = context;
    const [seed, setSeed] = useState([]);
    const [maxSeedsReached, setMaxSeedsReached] = useState(false);
    const [noSeeds, setNoSeeds] = useState(false);
    const [genres, setGenres] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState({});
    const [playlistDuration, setPlaylistDuration] = useState(1800000);
    const [generatedTracks, setGeneratedTracks] = useState([]);
    const [generatedTracksIndex, setGeneratedTracksIndex] = useState(0);

    // User is NOT logged in, take the user to the login page
    if (!user || !token) {
        return <Redirect to="/login" />;
    }

    useEffect(() => {
        fetchGenres(token)
            .then((response) => {
                setGenres(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSeedSelect = (value) => {
        if (maxSeedsReached) {
            return;
        }

        if (seed.length > 0) {
            const equals = seed.filter((elem) => {
                return objDeepCheck(elem, value);
            });

            if (equals.length !== 0) {
                return;
            }
        }

        const tempSeed = [...seed];
        tempSeed.push(value);

        if (tempSeed.length >= 5) {
            setMaxSeedsReached(true);
        }

        setSeed(tempSeed);
        setNoSeeds(false);
    };

    const handleDeleteSeed = (seedToDelete) => {
        const temp = [...seed];

        const remainingSeeds = temp.filter((elem) => { return elem.name !== seedToDelete; });

        setSeed(remainingSeeds);
    };

    const handleAudioFeatures = (features) => {
        setAudioFeatures(features);
    };

    const handleDuration = (duration) => {
        const durationMS = duration * 60000;
        setPlaylistDuration(durationMS);
    };

    const handleGenerate = () => {
        // deny generation if there are no seeds
        if (seed.length === 0) {
            setNoSeeds(true);
            return;
        }

        // transforming strings for fetch queries
        let seedArtists = '';
        let seedGenres = '';
        let audioFeaturesQuery = '';

        seed.forEach((elem) => {
            if (elem.type === 'artist') {
                if (seedArtists === '') {
                    seedArtists += `${elem.artistID}`;
                } else {
                    seedArtists += `,${elem.artistID}`;
                }
            } else if (seedGenres === '') {
                seedGenres += `${elem.name}`;
            } else {
                seedGenres += `,${elem.name}`;
            }
        });

        Object.entries(audioFeatures).forEach(([key, value]) => {
            audioFeaturesQuery += `&target_${key}=${value / 100}`;
        });

        // fetch recommendations
        getRecommendations(
            user,
            token,
            seedArtists,
            seedGenres,
            audioFeaturesQuery,
        )
            // manipulation of generated tracks
            .then((response) => {
                console.log('GENERATED', response);
                const { tracks } = response;
                const displayedSongs = [];
                let displayedTime = 0;

                if (generatedTracks.length > 0) {
                    let i = generatedTracksIndex;
                    while (displayedTime < playlistDuration) {
                        i %= tracks.length;
                        displayedSongs.push(tracks[i]);
                        displayedTime += tracks[i].duration_ms;
                        setGeneratedTracksIndex(i + 1);
                        i++;
                    }
                } else {
                    tracks.forEach((track) => {
                        if (displayedTime < playlistDuration) {
                            displayedSongs.push(track);
                            displayedTime += track.duration_ms;
                        }
                    });
                }

                console.log('TEST', displayedSongs);
                setGeneratedTracks(displayedSongs);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="playlistInitialization">
            <div className="welcome">
                Hello There! Please select up to 5 seeds in any combination of
                genres and artist.
            </div>

            <SeedsVisual seeds={seed} deleteSeed={handleDeleteSeed} />

            {noSeeds && <div className="warning">PLEASE ADD SEEDS FIRST</div>}
            {maxSeedsReached && <div className="warning">MAX SEEDS REACHED</div>}

            <Genres genres={genres} handleSeedSelect={handleSeedSelect} />

            <ArtistSearchBar handleSeedSelect={handleSeedSelect} />

            <AudioFeatures handleAudioFeatures={handleAudioFeatures} />

            <PlaylistDuration handleDuration={handleDuration} />

            <button className="generateButton" type="button" onClick={handleGenerate}>
                GENERATE
            </button>

            <RecommendedTracks generatedTracks={generatedTracks} />
        </div>
    );
};
