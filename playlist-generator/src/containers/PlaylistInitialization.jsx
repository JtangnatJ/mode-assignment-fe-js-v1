import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { spotifyAppContext } from '../utils/Context';
import { fetchGenres } from '../utils/fetch';
import { ArtistSearchBar } from './ArtistSearchBar';
import { Genres } from './Genres/Genres';

export const PlaylistInitialization = () => {
    const context = useContext(spotifyAppContext);
    const { user, token } = context;
    const [seed, setSeed] = useState([]);
    const [genres, setGenres] = useState([]);

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

    useEffect(() => {
        console.log(seed);
    }, [seed]);

    const handleSeedSelect = (value) => {
        const tempSeed = [...seed];
        tempSeed.push(value);
        setSeed(tempSeed);
    };

    return (
        <div className="playlistInitialization">
            Hello There! Please select up to 5 seeds in any combination of genres and artist.
            <Genres genres={genres} handleSeedSelect={handleSeedSelect} />
            <ArtistSearchBar />
            {/* <GenerateButton /> */}
        </div>
    );
};
