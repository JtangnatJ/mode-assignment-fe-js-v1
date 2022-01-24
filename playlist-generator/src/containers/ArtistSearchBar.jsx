import React, { useContext, useState } from 'react';
import { spotifyAppContext } from '../utils/Context';
import { searchArtist } from '../utils/fetch';
import '../styles/ArtistSearchBar.scss';

export const ArtistSearchBar = ({ handleSeedSelect }) => {
    const context = useContext(spotifyAppContext);
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        if (value === '') {
            e.preventDefault();
            return;
        }

        searchArtist(context.token, value).then((response) => {
            const { name } = response;
            const artistID = response.id;
            handleSeedSelect({ type: 'artist', name, artistID });
            setValue('');
        }).catch((error) => {
            console.log(error);
        });
        e.preventDefault();
    };

    return (
        <div className="artistSearchBar">
            <div className="artistSearchLabel">
                Search an artist and enter:
            </div>

            <form onSubmit={handleSubmit}>
                <input type="search" value={value} onChange={handleChange} />
            </form>
        </div>
    );
};
