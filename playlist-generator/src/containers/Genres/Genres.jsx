import React from 'react';
import { GenreDropdown } from './GenreDropdown';
import { GenreSearchBar } from './GenreSearchBar';

export const Genres = ({ genres, handleSeedSelect }) => {
    return (
        <div>
            <GenreSearchBar genres={genres} handleSeedSelect={handleSeedSelect} />
            <GenreDropdown genres={genres} handleSeedSelect={handleSeedSelect} />
        </div>
    );
};
