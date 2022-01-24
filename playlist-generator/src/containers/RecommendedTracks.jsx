import React, { useState } from 'react';
import { SavePlaylistButton } from './SavePlayListButton';
import { TrackDisplay } from './TrackDisplay';
import '../styles/RecommendedTracks.scss';

export const RecommendedTracks = ({ generatedTracks }) => {
    const [playlistName, setPlaylistName] = useState('Playlist');

    const handleChange = (e) => {
        setPlaylistName(e.target.value);
        e.preventDefault();
    };

    return (
        <div className="recommendedTracksWrapper">
            {generatedTracks.length > 0 && (
                <div className="recommendedTracks">
                    {/* name playlist, save playlist */}
                    <div className="playlistInteraction">
                        <input type="text" className="playlistTitle" value={playlistName} onChange={handleChange} />
                        <SavePlaylistButton playlistName={playlistName} tracks={generatedTracks} />
                    </div>
                    {generatedTracks.map((track) => { return (<TrackDisplay track={track} />); })}
                </div>
            )}
        </div>

    );
};
