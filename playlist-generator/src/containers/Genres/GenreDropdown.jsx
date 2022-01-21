import React from 'react';

export const GenreDropdown = ({ genres, handleSeedSelect }) => {
    const handleChange = (event) => {
        handleSeedSelect(event.target.value);
        event.preventDefault();
    };

    return (
        <div className="genreDropdown">
            GenreDropdown
            <select onChange={handleChange}>
                {genres.map((genre) => {
                    return (
                        <option value={`${genre}`}>{genre}</option>
                    );
                })}
            </select>
        </div>
    );
};
