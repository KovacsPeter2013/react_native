
import axios from "axios";


 var Baseurl = 'http://192.168.0.22/reactnativeAPI';

const request = ({url, method, data}) => {
    return axios({
        method: method || 'get',
        url: `${Baseurl}${url}`,
        data,
        });
      }

 export default request; 