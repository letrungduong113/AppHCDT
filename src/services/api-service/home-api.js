import ApiService, { API_LIST, rootAPI } from ".";

class HomeAPI extends ApiService {
    async getTinHome(limit) {
        res = await rootAPI.apiGetListExternal('http://aicdemo.com/0rikkei/hcdt/public/api/client/tin_tuc?limit=' + limit);
        return res;
    }
}

export default new HomeAPI;
