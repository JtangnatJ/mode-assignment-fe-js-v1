import React from 'react';
import { Option } from '../components/Option';
import '../styles/PlaylistDuration.scss';

const PLAYLIST_DURATION_IN_MINUTES = [30, 45, 60, 90];

export const PlaylistDuration = ({ handleDuration }) => {
    const handleChange = (event) => {
        handleDuration(event.target.value);
        event.preventDefault();
    };

    return (
        <div className="playlistDuration">
            <div className="playlistDurationLabel">
                Approximate total playtime of playlist in minutes:
            </div>

            <select onChange={handleChange}>
                {PLAYLIST_DURATION_IN_MINUTES.map((time) => {
                    return <Option value={time} />;
                })}
            </select>
        </div>
    );
};
