import React from 'react';
import CurrentWeather from './components/CurrentWeather';
import Search from './components/Search';

import './App.css';

function App() {
    return (
        <div className="App">
            <CurrentWeather/>
            <Search/>
        </div>
    );
}

export default App;
