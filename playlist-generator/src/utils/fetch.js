const spotifyFetch = async (url, token, params = {}, options) => {
    let queryString = '';

    if (Object.keys(params).length > 0) {
        queryString += '?';
    }

    Object.entries(params).forEach(([key, value], index) => {
        if (index === 0) {
            queryString += `${key}=${encodeURIComponent(value)}`;
        } else if (key === 'audioFeatures') {
            queryString += value;
        } else {
            queryString += `&${key}=${encodeURIComponent(value)}`;
        }
    });

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${url}${queryString}`, { ...defaultOptions, ...options });
    return response.json();
};

export const fetchGenres = async (token) => {
    const response = await spotifyFetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', token);

    const { genres } = response;
    return genres;
};

export const searchArtist = async (token, searchTerm) => {
    const params = {
        q: searchTerm,
        type: 'artist',
    };

    const response = await spotifyFetch('https://api.spotify.com/v1/search', token, params);

    return response.artists.items[0];
};

export const getRecommendations = async (user, token, artists, genres, audioFeatures) => {
    const params = {
        limit: 35,
        market: user.country,
        seed_artists: artists,
        seed_genres: genres,
        audioFeatures,
    };

    Object.entries(params).forEach(([key, value]) => {
        if (value === '') {
            delete params[key];
        }
    });

    const response = await spotifyFetch('https://api.spotify.com/v1/recommendations', token, params);

    return response;
};

export const savePlaylist = async (user, token, playlistName, tracks) => {
    const createOptions = {
        method: 'POST',
        body: JSON.stringify({
            name: playlistName,
            description: 'New Playlist',
            public: false,
        }),
    };

    const createPlaylist = await spotifyFetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, token, {}, createOptions);
    const playlistID = createPlaylist.id;

    const songsToAdd = [];

    tracks.forEach((track) => {
        songsToAdd.push(track.uri);
    });

    const addSongsOptions = {
        method: 'POST',
        body: JSON.stringify({
            uris: songsToAdd,
        }),
    };

    const addSongs = await spotifyFetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, token, {}, addSongsOptions);
    return addSongs;
};
