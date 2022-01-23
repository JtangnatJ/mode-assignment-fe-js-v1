import React, { useState } from 'react';
import { SavePlaylistButton } from './SavePlayListButton';

export const RecommendedTracks = ({ generatedTracks }) => {
    const [playlistName, setPlaylistName] = useState('Playlist');

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
                        <SavePlaylistButton playlistName={playlistName} tracks={generatedTracks} />
                    </div>
                    {generatedTracks.map((track) => { return (<div>{track.name}</div>); })}
                </div>
            )}
        </div>

    );
};
