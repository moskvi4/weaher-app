import React from 'react';
import {connect} from 'react-redux';
import {loadWeather} from '../../../actions/weather';

import './SearchItem.css';

function SearchItem({position, loadWeather}) {
    const {woeid, location_type, title} = position;
    
    return (
        <div className='search-item' onClick={() => loadWeather(woeid)}>
            {`${title}, ${location_type}`}
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    loadWeather: woeid => dispatch(loadWeather(woeid))
});

export default connect(null, mapDispatchToProps)(SearchItem);
