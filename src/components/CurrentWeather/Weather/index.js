import React from 'react';

import './Weather.css';

export default function Weather({weather}) {
    const {title, abbr, temp} = weather;
    
    return (
        <div className='weather'>
            <img className='weather__abbr' src={`/static/img/weather/png/${abbr}.png`} alt={abbr}/>
            <div className='weather__content'>
                <div className='weather__title'>
                    {title}
                </div>
                <div className='weather__temp'>
                    {temp}
                </div>
            </div>
        </div>
    );
}