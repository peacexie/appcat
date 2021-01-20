
// 当前版本,用于更新
let cver = {
    key: 201, 
    val: '2.0.1'
}

let sroot = {
    //jq: 'test'
    h5: 'http://txjia.com/h5/',
    favor: 'http://txjia.com/ximps/static/media/collect/',
    basic: 'http://txjia.com/ximps/static/icons/basic/'
}

// 聊天配置
let chat = {
    server: 'http://114.215.186.80:8888',
    svloc: 'http://192.168.1.228:8829',
    nowToid: '' // 当前哪个聊天会员
};

let apib = {
    url: 'http://txjia.com/imcat/root/run', // imblog,imcat
    //url: 'http://127.0.0.1/peace/imcat/catmain/root/run', // imblog,catmain
    ver: 'nver',
    psk: 'api-OwNVO-IywfA-givEQ-zXTLt-LQtpf'
};
let apim = {
    url: 'http://txjia.com/imcat/root/run',
    //url: 'http://127.0.0.1/peace/imcat/catmain/root/run',
    ver: 'nver',
    psk: 'api-OwNVO-IywfA-givEQ-zXTLt-LQtpf'
}; // /sapi.php

let ctab = {
  white: 'fff',
  gray: '6c757d',
  //gray-dark: '343a40',
  primary: '007bff',
  secondary: '6c757d',
  success: '28a745',
  info: '17a2b8',
  warning: 'ffc107',
  danger: 'dc3545',
  light: 'f8f9fa',
  dark: '343a40',
  muted: '6c757d'
}

export {
    cver, sroot, 
    chat, apib, apim,
    ctab
}
