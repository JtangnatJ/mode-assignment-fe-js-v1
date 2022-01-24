import React from 'react';
import { GenreDropdown } from './GenreDropdown';
import { GenreSearchBar } from './GenreSearchBar';
import '../../styles/Genres.scss';

export const Genres = ({ genres, handleSeedSelect }) => {
    return (
        <div className="genres">
            <GenreSearchBar genres={genres} handleSeedSelect={handleSeedSelect} />
            <GenreDropdown genres={genres} handleSeedSelect={handleSeedSelect} />
        </div>
    );
};
