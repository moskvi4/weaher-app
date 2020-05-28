import {weatherActions} from '../actions/weather';

const defaultState = {
    currentPosition: null,
    currentWeather: null,
    searchedPositions: null
};

function weather(state = defaultState, action) {
    switch (action.type) {
        case weatherActions.SET_CURRENT_GEOLOCATION: {
            return {
                ...state,
                currentPosition: action.payload && {
                    latt: action.payload.coords.latitude,
                    long: action.payload.coords.longitude
                }
            };
        }
        case weatherActions.SET_CURRENT_WEATHER: {
            const {
                title,
                consolidated_weather: [{weather_state_abbr, the_temp}]
            } = action.payload;
            
            return {
                ...state,
                currentWeather: {
                    title,
                    abbr: weather_state_abbr,
                    temp: the_temp
                }
            };
        }
        case weatherActions.SET_CURRENT_TEMP: {
            return {
                ...state,
                currentWeather: {
                    ...state.currentWeather,
                    temp: action.payload
                }
            };
        }
        case weatherActions.SET_SEARCHED_POSITIONS: {
            return {
                ...state,
                searchedPositions: action.payload
            };
        }
        default:
            return state;
    }
}

const getCurrentPosition = state => state.weather.currentPosition;

const getCurrentWeather = state => state.weather.currentWeather;

const getSearchedPositions = state => state.weather.searchedPositions;

export {
    getCurrentPosition,
    getCurrentWeather,
    getSearchedPositions
};

export default weather;
