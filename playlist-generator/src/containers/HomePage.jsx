import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { spotifyAppContext } from '../utils/Context';
import '../styles/HomePage.scss';
import { UserComp } from '../components';

export const HomePage = () => {
    const context = useContext(spotifyAppContext);
    const { user, token } = context;
    const history = useHistory();

    if (!user || !token) {
        // User is NOT logged in, take the user to the login page
        return (
            <Redirect to="/login" />
        );
    }

    const onCreatePlaylistClick = () => {
        // eslint-disable-next-line no-alert
        // <Redirect to="/playlistSettings" />;
        history.replace('/playlistInitialization');
    };

    return (
        <div className="home-page">
            <UserComp user={user} />
            <button
                className="button"
                type="button"
                onClick={onCreatePlaylistClick}
            >
                Create Playlist
            </button>
        </div>
    );
};
