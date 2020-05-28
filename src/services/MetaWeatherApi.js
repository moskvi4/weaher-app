class MetaWeatherApi {
    search(name) {
        return fetch(`/api/location/search/?query=${name || ''}`)
            .then(response => response.json());
    }
    
    searchByLocation(latt, long) {
        return fetch(`/api/location/search/?lattlong=${latt},${long}`)
            .then(response => response.json());
    }
    
    getWeather(woeId) {
        return fetch(`/api/location/${woeId}/`)
            .then(response => response.json());
    }
}

export default new MetaWeatherApi();
