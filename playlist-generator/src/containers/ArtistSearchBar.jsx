import React, { useContext, useState } from 'react';
import { spotifyAppContext } from '../utils/Context';
import { searchArtist } from '../utils/fetch';

export const ArtistSearchBar = ({ handleSeedSelect }) => {
    const context = useContext(spotifyAppContext);
    // const { user, token } = context;
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
            const artistName = response.name;
            const artistID = response.id;
            console.log(response.id);
            handleSeedSelect({ type: 'artist', artistName, artistID });
            setValue('');
        }).catch((error) => {
            console.log(error);
        });
        e.preventDefault();
    };

    return (
        <div className="artistSearchBar">
            ArtistSearchBar
            {/* TODO: test query */}
            <form onSubmit={handleSubmit}>
                <input type="search" value={value} onChange={handleChange} />
            </form>
        </div>
    );
};
