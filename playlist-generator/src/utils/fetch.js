export const fetchGenres = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    const { genres } = data;
    return genres;
};

export const searchArtist = async (token, searchTerm) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    return data.artists.items[0];
};
