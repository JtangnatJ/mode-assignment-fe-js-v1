import React, { useEffect, useState } from 'react';
import '../styles/SeedsVisual.scss';

export const SeedsVisual = ({ seeds, deleteSeed }) => {
    const [seedsArray, setSeedsArray] = useState([]);

    useEffect(() => {
        const temp = [];

        seeds.forEach((seed) => {
            temp.push(seed.name);
        });

        setSeedsArray(temp);
    }, [seeds]);

    const handleClick = (event) => {
        deleteSeed(event.target.name);
        event.preventDefault();
    };

    return (
        <div className="displaySeeds">
            {seedsArray.map((seed) => {
                return (
                    <div className="seed">
                        <div className="seedText">
                            {seed}
                        </div>
                        <button type="button" name={seed} onClick={handleClick}>x</button>
                    </div>
                );
            })}
        </div>
    );
};
