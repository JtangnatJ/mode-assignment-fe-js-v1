import React from 'react';
import { Option } from '../../components/Option';
import '../../styles/GenreDropdown.scss';

export const GenreDropdown = ({ genres, handleSeedSelect }) => {
    const handleChange = (event) => {
        const genreValue = event.target.value;
        handleSeedSelect({ type: 'genre', name: genreValue });
        event.preventDefault();
    };

    return (
        <div className="genreDropdown">
            <div className="genreDropdownLabel">or select:</div>
            <select onChange={handleChange} className="genreSelect">
                <option disabled selected>
                    --Please Select Genre--
                </option>
                {genres.map((genre) => {
                    return <Option value={genre} />;
                })}
            </select>
        </div>
    );
};
