import React, { useContext } from 'react';
import { savePlaylist } from '../utils/fetch';
import { spotifyAppContext } from '../utils/Context';

export const SavePlaylistButton = ({ playlistName, tracks }) => {
    const context = useContext(spotifyAppContext);
    const { user, token } = context;

    const handleClick = (event) => {
        savePlaylist(user, token, playlistName, tracks);
        event.preventDefault();
    };

    return (
        <button type="button" onClick={handleClick}>Save Playlist</button>
    );
};
