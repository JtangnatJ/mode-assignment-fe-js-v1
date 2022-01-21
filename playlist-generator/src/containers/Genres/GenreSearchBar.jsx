import React from 'react';

// TODO: auto suggest
export const GenreSearchBar = () => {
    const handleChange = (event) => {
        const searchTerm = event.target.value;
        console.log(searchTerm);
        // run seedselect
        event.preventDefault();
    };

    return (
        <div>
            GenreSearchBar
            <input
                className="genreInput"
                type="text"
                onChange={handleChange}
            />
        </div>
    );
};
