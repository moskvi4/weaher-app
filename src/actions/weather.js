import {createAction} from 'redux-actions';
import MetaWeatherApi from '../services/MetaWeatherApi';

const weatherActions = {
    SET_CURRENT_GEOLOCATION: 'SET_CURRENT_GEOLOCATION',
    SET_CURRENT_WEATHER: 'SET_CURRENT_WEATHER',
    SET_SEARCHED_POSITIONS: 'SET_SEARCHED_POSITIONS',
    SET_CURRENT_TEMP: 'SET_CURRENT_TEMP'
};

const setCurrentPosition = createAction(weatherActions.SET_CURRENT_GEOLOCATION, currentPosition => currentPosition);

const setCurrentWeather = createAction(weatherActions.SET_CURRENT_WEATHER, currentWeather => currentWeather);

const setCurrentTemp = createAction(weatherActions.SET_CURRENT_TEMP, temp => temp);

const loadWeather = woeid => dispatch => {
    MetaWeatherApi.getWeather(woeid)
        .then(currentWeather => dispatch(setCurrentWeather(currentWeather)));
};

const loadCurrentWeather = currentPosition => dispatch => {
    const {latt, long} = currentPosition;
    
    MetaWeatherApi.searchByLocation(latt, long)
        .then(([{woeid}]) => woeid)
        .then(woeid => dispatch(loadWeather(woeid)));
};

const setSearchedPositions = createAction(weatherActions.SET_SEARCHED_POSITIONS, positions => positions);

const searchPositions = query => dispatch => {
    MetaWeatherApi.search(query)
        .then(searchedPositions => dispatch(setSearchedPositions(searchedPositions)));
};

export {
    weatherActions,
    setCurrentPosition,
    loadWeather,
    loadCurrentWeather,
    searchPositions,
    setCurrentTemp
};
