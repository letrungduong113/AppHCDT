import ApiService, { API_LIST ,rootAPI} from ".";
import moment from 'moment'
class WeatherAPI extends ApiService {
    async get(lat,long) {
        res = await rootAPI.getWeather(lat,long);
        return res;
    }
  
 
}

export default new WeatherAPI;
