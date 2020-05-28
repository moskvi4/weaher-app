import React, {useState} from 'react';
import {connect} from 'react-redux';
import {searchPositions} from '../../actions/weather';
import {getSearchedPositions} from '../../reducers/weather';
import SearchItem from './SearchItem';

import './Search.css';

function Search(props) {
    const {searchPositions, searchedPositions} = props;
    const [query, setQuery] = useState('');
    
    const keyUpHandler = event => {
        if (query && event.keyCode === 13) {
            event.preventDefault();
            searchPositions(query);
        }
    };
    
    return (
        <div className='search'>
            <div className='search__block'>
                <input value={query} onChange={event => setQuery(event.target.value)} onKeyUp={keyUpHandler}/>
                <button onClick={() => searchPositions(query)} disabled={!query}>
                    Search
                </button>
            </div>
            {searchedPositions &&
            <div className='search__results'>
                {searchedPositions.map(position => <SearchItem key={position.woeid} position={position}/>)}
                {searchedPositions.length === 0 && 'Not founds'}
            </div>}
        </div>
    );
}

const mapStateToProps = state => ({
        searchedPositions: getSearchedPositions(state)
    }),
    mapDispatchToProps = dispatch => ({
        searchPositions: query => dispatch(searchPositions(query))
    });

export default connect(mapStateToProps, mapDispatchToProps)(Search);
