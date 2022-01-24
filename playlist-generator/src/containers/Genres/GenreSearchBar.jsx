import React, { useState } from 'react';
import '../../styles/GenreSearchBar.scss';

export const GenreSearchBar = ({ genres, handleSeedSelect }) => {
    const [filteredGenres, setFilteredGenres] = useState([]);
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        // console.log(searchTerm);
        setValue(searchTerm);
        genreSearch(searchTerm);
        // run seedselect
        event.preventDefault();
    };

    const handleClick = (event) => {
        const genreValue = event.target.value;
        handleSeedSelect({ type: 'genre', name: genreValue });
        setValue('');
        setFilteredGenres([]);
        event.preventDefault();
    };

    const genreSearch = (string) => {
        if (string === '') {
            setFilteredGenres([]);
            return;
        }

        const foundGenres = genres.filter((genre) => {
            return genre.startsWith(string);
        });

        setFilteredGenres(foundGenres);
    };

    return (
        <div className="genreSearch">
            <div className="genreSearchLabel">
                Search for a genre:
            </div>
            <div className="genreSearchBar">
                <input
                    className="genreInput"
                    type="search"
                    size="15"
                    value={value}
                    onChange={handleChange}
                />
                {filteredGenres.length > 0 && (
                    <div className="genreSuggestions">
                        {filteredGenres.map((genre) => {
                            return (
                                <input
                                    className="genreButton"
                                    type="button"
                                    value={genre}
                                    onClick={handleClick}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
