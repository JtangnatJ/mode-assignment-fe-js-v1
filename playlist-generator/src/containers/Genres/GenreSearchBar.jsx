import React, { useState } from 'react';

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
        handleSeedSelect({ type: 'genre', genre: genreValue });
        setValue('');
        event.preventDefault();
    };

    const genreSearch = (string) => {
        const foundGenres = genres.filter((genre) => {
            return genre.startsWith(string);
        });

        setFilteredGenres(foundGenres);
    };

    return (
        <div>
            GenreSearchBar
            <input
                className="genreInput"
                type="search"
                value={value}
                onChange={handleChange}
            />
            {value.length > 0
                && (
                    <div className="genreSuggestions">
                        Suggestions:
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
    );
};
