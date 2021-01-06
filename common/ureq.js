
import req from './request'
import {apim,apib} from './cfgs'

const initUrl = (act) => {
    let comp = 'ver='+ apim.ver + '&sk='+ apim.psk +'&_v=2020-0106';
    return '/sapi.php/'+act+'?'+comp;
    //return '/sapi.php?'+act+'&'+comp;
}

const commApi = (act, parm, method) => {
    let path = initUrl(act); //console.log(path, apim.url);
    let func = method ? method : 'get'
    return req[func](path, {
        baseUrl:apim.url,
        data:parm.data
    })
}
const blogApi = (act, parm, method) => {
    let path = initUrl(act); //console.log(path, apim.url);
    let func = method ? method : 'get'
    return req[func](path, {
        baseUrl:apib.url,
        data:parm.data
    })
}

const posBaidu = (parm) => {
    let url = 'https://api.map.baidu.com/geocoder/v2/'
    let data = {ak: '***',output:'json',pois:0}
    return req.get(url,{data})
}

// 默认全部导出
export default {
	commApi, blogApi,
    posBaidu,
    initUrl
}

/*

*/
