import React, { useState } from 'react';

const AUDIO_FEATURES = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'popularity', 'valence'];

export const AudioFeatures = ({ handleAudioFeatures }) => {
    const [preferredFeatures, setPreferredFeatures] = useState({});

    const handleChange = (event) => {
        const temp = { ...preferredFeatures };

        temp[event.target.name] = event.target.value;

        setPreferredFeatures(temp);

        handleAudioFeatures(temp);

        event.preventDefault();
    };

    return (
        <div>
            Audio Features:
            Feel free to customize playlist vibe:
            (each goes from 0-100%)
            {AUDIO_FEATURES.map((feature) => {
                return (
                    <div>
                        {`${feature.toUpperCase()} (0-100)`}
                        <input type="number" min="0" max="100" name={feature} value={preferredFeatures[feature]} onChange={handleChange} />
                    </div>
                );
            })}
        </div>
    );
};
