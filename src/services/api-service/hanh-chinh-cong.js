import ApiService, { API_LIST ,rootAPI} from ".";
import moment from 'moment';
class HanhChinhCongAPI extends ApiService {
    async getInfoDetail(year, month) {
        let url = `http://aicdemo.com/0rikkei/hcdt/public/api/crawler/hcc?nam=${year}&thang=${month}`;
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            if (response.status == "200") {
                let responseJson = await response.json();
                //console.log(responseJson);
                return responseJson;
            }
            else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    async getSoNganh() {
        let url = `http://aicdemo.com/0rikkei/hcdt/public/api/crawler/so_nganh`;
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            if (response.status == "200") {
                let responseJson = await response.json();
                //console.log(responseJson);
                return responseJson;
            }
            else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
    async getChart(id,year,month) {
        console.log(year+" "+month+" "+id)
        var so = id;
        if(so == 0){
            so = "1105,1125,1569,1242,2085,1250,2086,2290,36,202,66,49,81,93,107,150,126,139,158,168,193,177,1989,215,226,1471"
        }
        var m = parseInt((year-2013)*12,10)+parseInt(month,10)
        var y = parseInt(year,10)-2013;
        let url = `http://dichvucong.quangninh.gov.vn/DesktopModules/CongDan/CongDan.GUI/Ajax/THTT_chPieChartDonVi.aspx?nam=${y}&thang=${m}&sn=${so}`;
        try {
            let response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        
                    },
                }
            )
            if (response.status == "200") {
                let responseJson = await response.json();
                console.log('data:',year+" "+month+" "+responseJson);
                return responseJson;
            }
            else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }
}

export default new HanhChinhCongAPI;
