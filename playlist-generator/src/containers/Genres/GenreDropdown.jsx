import React from 'react';
import { Option } from '../../components/Option';

export const GenreDropdown = ({ genres, handleSeedSelect }) => {
    const handleChange = (event) => {
        const genreValue = event.target.value;
        handleSeedSelect({ type: 'genre', genre: genreValue });
        event.preventDefault();
    };

    return (
        <div className="genreDropdown">
            GenreDropdown
            <select onChange={handleChange}>
                <option disabled selected>--Please Select Genre--</option>
                {genres.map((genre) => {
                    return (
                        <Option value={genre} />
                    );
                })}
            </select>
        </div>
    );
};
