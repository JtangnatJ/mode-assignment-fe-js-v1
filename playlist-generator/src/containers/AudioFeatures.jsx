import React, { useState } from 'react';
import '../styles/AudioFeatures.scss';

const AUDIO_FEATURES = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'popularity', 'valence'];

export const AudioFeatures = ({ handleAudioFeatures }) => {
    const [preferredFeatures, setPreferredFeatures] = useState({});

    const handleChange = (event) => {
        const temp = { ...preferredFeatures };

        if (Number(event.target.value) > 100) {
            temp[event.target.name] = 100;
        } else if (Number(event.target.value) < 0) {
            temp[event.target.name] = 0;
        } else {
            temp[event.target.name] = event.target.value;
        }

        setPreferredFeatures(temp);

        handleAudioFeatures(temp);

        event.preventDefault();
    };

    return (
        <div className="audioFeatures">
            <div className="audioFeaturesLabel">
                Audio Features:
                Feel free to customize playlist vibe
            </div>

            {AUDIO_FEATURES.map((feature) => {
                return (
                    <div className="featureInput">
                        {`${feature.toUpperCase()} (0-100):`}
                        <input
                            type="number"
                            min="0"
                            max="100"
                            name={feature}
                            value={preferredFeatures[feature]}
                            onChange={handleChange}
                        />
                    </div>
                );
            })}
        </div>
    );
};
