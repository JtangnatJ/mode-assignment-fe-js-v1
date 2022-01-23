import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { spotifyAppContext } from '../utils/Context';
import { fetchGenres, getRecommendations } from '../utils/fetch';
import { objDeepCheck } from '../utils/utils';
import { ArtistSearchBar } from './ArtistSearchBar';
import { AudioFeatures } from './AudioFeatures';
// import { GenerateButton } from './GenerateButton';
import { Genres } from './Genres/Genres';
import { RecommendedTracks } from './RecommendedTracks';

export const PlaylistInitialization = () => {
    const context = useContext(spotifyAppContext);
    const { user, token } = context;
    const [seed, setSeed] = useState([]);
    const [maxSeedsReached, setMaxSeedsReached] = useState(false);
    const [noSeeds, setNoSeeds] = useState(false);
    const [genres, setGenres] = useState([]);
    const [generatedTracks, setGeneratedTracks] = useState([]);

    if (!user || !token) {
        // User is NOT logged in, take the user to the login page
        return (
            <Redirect to="/login" />
        );
    }

    useEffect(() => {
        fetchGenres(token).then((response) => {
            setGenres(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    // TODO: delete
    useEffect(() => {
        console.log(seed);
    }, [seed]);

    const handleSeedSelect = (value) => {
        if (maxSeedsReached) {
            return;
        }

        if (seed.length > 0) {
            const equals = seed.filter((elem) => { return objDeepCheck(elem, value); });

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

    const handleGenerate = () => {
        if (seed.length === 0) {
            setNoSeeds(true);
        }

        let seedArtists = '';
        let seedGenres = '';
        seed.forEach((elem) => {
            if (elem.type === 'artist') {
                if (seedArtists === '') {
                    seedArtists += `${elem.artistID}`;
                } else {
                    seedArtists += `,${elem.artistID}`;
                }
            } else if (seedGenres === '') {
                seedGenres += `${elem.genre}`;
            } else {
                seedGenres += `,${elem.genre}`;
            }
        });

        getRecommendations(user, token, seedArtists, seedGenres).then((response) => {
            console.log('GENERATED', response);
            setGeneratedTracks(response.tracks);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="playlistInitialization">
            Hello There! Please select up to 5 seeds in any combination of genres and artist.
            {/* display seeds */}
            {noSeeds && <div>PLEASE ADD SEEDS FIRST</div>}
            {maxSeedsReached && <div>MAX SEED REACHED</div>}
            <Genres genres={genres} handleSeedSelect={handleSeedSelect} />
            <ArtistSearchBar handleSeedSelect={handleSeedSelect} />
            <AudioFeatures />
            {/* Total playtime in minutes: 30/45/60/90 */}
            <button type="button" onClick={handleGenerate}>GENERATE</button>
            <RecommendedTracks generatedTracks={generatedTracks} />
        </div>
    );
};
