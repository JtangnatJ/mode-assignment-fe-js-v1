import React, { useState, useEffect } from 'react';
import { SavePlaylistButton } from './SavePlayListButton';

export const RecommendedTracks = ({ generatedTracks }) => {
    const [tracks, setTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('Playlist');

    useEffect(() => {
        setTracks(generatedTracks);
    }, [generatedTracks]);

    const handleChange = (e) => {
        setPlaylistName(e.target.value);
        e.preventDefault();
    };

    return (
        <div>
            {generatedTracks.length > 0 && (
                <div className="recommendedTracks">
                    {/* name playlist, save playlist */}
                    <div>
                        <input type="text" value={playlistName} onChange={handleChange} />
                        <SavePlaylistButton playlistName={playlistName} tracks={tracks} />
                    </div>
                    {tracks.map((track) => { return (<div>{track.name}</div>); })}
                </div>
            )}
        </div>

    );
};
