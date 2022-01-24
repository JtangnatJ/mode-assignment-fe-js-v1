import React from 'react';
import '../styles/TrackDisplay.scss';

export const TrackDisplay = ({ track }) => {
    const { album } = track;

    const handleArtists = (artists) => {
        let artistString = '';
        artists.forEach((artist, index) => {
            if (index !== 0) {
                artistString += `, ${artist.name}`;
            } else {
                artistString += `${artist.name}`;
            }
        });

        return artistString;
    };

    return (
        <div className="displayedTrack">
            <img
                className="trackImg"
                src={album.images[1].url}
                alt="album art"
            />
            <div className="trackBreakdown">
                <div className="trackInfo" id="titleLabel">
                    <div className="trackInfoLabel">Title:</div>

                    <div className="trackData" id="titleData">
                        {track.name}
                    </div>
                </div>

                <div className="trackInfo" id="artistLabel">
                    <div className="trackInfoLabel">Artist:</div>

                    <div className="trackData" id="artistData">
                        {handleArtists(track.artists)}
                    </div>
                </div>

                <div className="trackInfo" id="albumLabel">
                    <div className="trackInfoLabel">Album:</div>

                    <div className="trackData" id="albumData">
                        {album.name}
                    </div>
                </div>
                <div className="trackInfo" id="releaseLabel">
                    <div className="trackInfoLabel">Release Date:</div>

                    <div className="trackData" id="releaseData">
                        {album.release_date}
                    </div>
                </div>
            </div>
        </div>
    );
};
