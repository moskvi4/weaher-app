import React from 'react';
import {connect} from 'react-redux';
import {setCurrentPosition, loadCurrentWeather, setCurrentTemp} from '../../actions/weather';
import {getCurrentPosition, getCurrentWeather} from '../../reducers/weather';
import Weather from './Weather';
import ColorUtils from '../../utlis/colorUtils';

import './CurrentWeather.css';

class CurrentWeather extends React.Component {
    componentDidMount() {
        const {setCurrentPosition} = this.props;
        
        navigator.geolocation.getCurrentPosition(
            setCurrentPosition,
            () => setCurrentPosition(null)
        );
    }
    
    componentDidUpdate(prevProps) {
        const {currentPosition, loadCurrentWeather} = this.props;
        
        if (currentPosition && currentPosition !== prevProps.currentPosition) {
            loadCurrentWeather(currentPosition);
        }
    }
    
    render() {
        const {currentWeather, setCurrentTemp} = this.props;
        
        return (
            <React.Fragment>
                <div className='current-weather'>
                    {currentWeather &&
                    <React.Fragment>
                        <Weather weather={currentWeather}/>
                        <div
                            className='current-weather__indicator'
                            style={{backgroundColor: ColorUtils.getBgColor(currentWeather.temp)}}/>
                    </React.Fragment>}
                </div>
                {currentWeather &&
                <div className='current-weather__temp'>
                    <input
                        type='range'
                        min={-10}
                        max={30}
                        step={0.1}
                        onChange={event => setCurrentTemp(+event.target.value)}
                        value={currentWeather.temp}
                        className='current-weather__temp-slider'/>
                </div>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
        currentPosition: getCurrentPosition(state),
        currentWeather: getCurrentWeather(state)
    }),
    mapDispatchToProps = dispatch => ({
        setCurrentPosition: currentPosition => dispatch(setCurrentPosition(currentPosition)),
        loadCurrentWeather: currentPosition => dispatch(loadCurrentWeather(currentPosition)),
        setCurrentTemp: temp => dispatch(setCurrentTemp(temp))
    });

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
