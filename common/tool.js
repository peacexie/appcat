
import {sroot, apim, ctab} from './cfgs'

let sysApp = function (sinfo) {
    plus.device.getInfo({
        success:function(e){
            sinfo['val'] = JSON.stringify(e)
        },
        fail:function(e){
            sinfo['val'] = JSON.stringify(e)
        }
    })
}
let sysMp = function (sinfo) {
    let type='mp', obj = ''
    if(typeof(wx)!='undefined'){   type='wx';   obj=wx }   // 微信(腾讯)小程序
    if(typeof(swan)!='undefined'){ type='swan'; obj=swan } // 智能(百度)小程序
    if(typeof(my)!='undefined'){   type='my';   obj=my }   // 支付宝(蚂蚁)小程序
    if(typeof(tt)!='undefined'){   type='tt';   obj=tt }   // 字节(头条)小程序
    sinfo['type'] = type
    if(obj){ sinfo['val']=JSON.stringify(obj['getSystemInfoSync']()) }
}

// 常用方法,免得页面的`methods`里写很多重复方法
export default {
   
    sroot, apim,
    sysApp, sysMp,
    
    wColor: function (row, key) { 
        if(key=='vtxt'){
            let vtxt = row.vtxt ? row.vtxt.replace('text-','') : ''
            let ctext = "#"+(ctab[vtxt] ? ctab[vtxt] : '666')
            return ctext
        }else{
            let vbg = row.vbg ? row.vbg.replace('bg-','') : ''
            let cbg = "#"+(ctab[vbg] ? ctab[vbg] : 'EEE')
            return cbg
        } //console.log(ctext+cbg, row.vtxt, row.vbg, vbg)  
    },

    platform: function () { // h5,mp,app
        let sinfo = {type:'(...)', val:'(...)'}
        if(typeof(window)!='undefined'){
            sinfo['type'] = 'h5'
            sinfo['val'] = window.navigator.userAgent 
        }else if(typeof(plus)!='undefined'){
            sinfo['type'] = 'app'
            sysApp(sinfo)
        }else{
            //sinfo['type'] = 'mp'
            sysMp(sinfo)
        }
        return sinfo 
    },
   
   // ===============================
   
   // $tool.vpic([row.mpic,'demo_120x90.jpg'])
   // $tool.vpic(['favor','adv_250x060a.jpg'])
   vpic:(opt) => {
       if(opt[0].indexOf('/')>=0){
           return opt[0];
       }else{
           let path = opt[0] ? sroot[opt[0]] : sroot.basic
           return path + opt[1]
       } 
   },
   
   // ===============================
   
   // 路由与页面跳转方法, @tap="$tool.nav('news/view?id='+row.id)"
    nav:(path, dir) => {
        let opt = {url:'/pages/' + path}
        dir ? uni.redirectTo(opt) : uni.navigateTo(opt)
    },
    back:(opt={}) => {
        uni.navigateBack(opt);
    },
    tab:(path) => {
        if(!path){ path = 'index/home' }
        let opt = {url:'/pages/' + path}
        uni.switchTab(opt) // ，路径后不能带参数
    },
    // 打开外部地址:小程序平台需要在后台配置域名白名单
    go:(params='') => {
        // row.url, link, href
        // mod.did, our-link
        let opt = {url:'/pages/index/webv?'+params}
        uni.navigateTo(opt);
    }

}

/*

*/
