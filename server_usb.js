'use strict';

var edge = require('edge-js');
var express = require('express');
var bodyParser = require('body-parser');
const util = require('util');

var app = express();


var about;
var openport;
var sendcommand;
var clearbuffer;
var printerfont;
var barcode;
var printlabel;
var closeport;
var sendcommand_utf8;
var sendcommand_binary;
var windowsfont;
var nobackfeed;


var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./'));


app.listen(8888, function () {
    console.log("Server Start!!");
})


app.get('/test_get', function (req, res) {
    console.log('GET Function Test!!');

});


app.post('/', urlencodedParser, function (req, res) {
    printfile();
    res.redirect(req.get('referer'));
});


app.post('/128B', urlencodedParser, function (req, res) {
    printfile128B();
    res.redirect(req.get('referer'));
});

app.post('/128C', urlencodedParser, function (req, res) {
    printfile128C();
    res.redirect(req.get('referer'));
});


try {
    openport = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'openport'
    });
} catch (error) {
    console.log(error);
}


try {
    about = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'about'
    });
} catch (error) {
    console.log(error);
}

try {
    sendcommand = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand'
    });
} catch (error) {
    console.log(error);
}


try {
    clearbuffer = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'clearbuffer'
    });
} catch (error) {
    console.log(error);
}


try {
    printerfont = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'printerfont'
    });
} catch (error) {
    console.log(error);
}


try {
    barcode = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'barcode'
    });
} catch (error) {
    console.log(error);
}


try {
    printlabel = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'printlabel'
    });
} catch (error) {
    console.log(error);
}


try {
    closeport = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'closeport'
    });
} catch (error) {
    console.log(error);
}

try {
    nobackfeed = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'nobackfeed'
    });
} catch (error) {
    console.log(error);
}

try {
    sendcommand_utf8 = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand_utf8'
    });
} catch (error) {
    console.log(error);
}

try {
    sendcommand_binary = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand_binary'
    });
} catch (error) {
    console.log(error);
}

try {
    windowsfont = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'windowsfont'
    });
} catch (error) {
    console.log(error);
}
//string to utf8
function strToUtf8Bytes(text) {
    const code = encodeURIComponent(text)
    const bytes = []
    for (let i = 0;i < code.length;i++) {
        const c = code.charAt(i)
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2)
            const hexval = parseInt(hex, 16)
            bytes.push(hexval)
            i += 2
        } else {
            bytes.push(c.charCodeAt(0))
        }
    }
    return bytes
}


function printfile() {
    // let bytes = strToUtf8Bytes('达摩克利斯之剑');
    // console.log("%c printfile🚀", "color: red;font-size: 18px", bytes);
    var windowsfont_variable = {
        x: 20,
        y: 0,
        fontheight: 63,
        rotation: 0,
        fontstyle: 5,
        fontunderline: 0,
        szFaceName: 'Arial',
        content: '11111111'
        // content: bytes
    }
    //  测试一代码
    /*for (let i = 0; i < 2; i++) {
        openport('TSC TE244', true);
        sendcommand(`SIZE 4.00 3.00`, true);
        // sendcommand(`SIZE 2.33 1.56`, true);
        sendcommand(`DIRECTION 1`, true);  // 待确定
        // sendcommand(`CLS`, true);  //  此条指令用来清除打印机中的图像缓存
        clearbuffer('', true);    //  此条指令用来清除打印机中的图像缓存
        sendcommand(`BARCODE 5,10,"128",50,1,0,2,2,"23030700011${i+1}"`, true);
        sendcommand('PRINT 1,1', true);

        // sendcommand('CLS', true);    // test code 此条指令用来清除打印机中的图像缓存
        // sendcommand('EOJ', true)     // test code
        closeport('', true);*/

    //  1. printlabel/PRINT 1,1
    //  2. size 精确度问题
    //  3. CLS， clearbuffer问题
    //  测试二代码， size 问题导致
    for (let i = 0; i < 1; i++) {
        openport('TSC TE244', true);
        clearbuffer('', true);    //  此条指令用来清除打印机中的图像缓存
        // sendcommand(`CLS`, true);  //  此条指令用来清除打印机中的图像缓存
        // sendcommand(`SIZE 4.00 3.00`, true);
        sendcommand(`DIRECTION 1`, true);  // 待确定
        // sendcommand(`BARCODE 5,10,"128",50,1,0,2,2,"23030700011${i+1}"`, true);
        windowsfont_variable.y = 0
        let height = 0
        for (let j = 0; j < 1000; j++) {
            // windowsfont_variable.y = windowsfont_variable.y + 2
            // windowsfont(`20,${windowsfont_variable.y},63,0,5,"Arial","达摩克利斯之剑"`, true);
            // windowsfont(`10,100, 80,0,0,0, "Arial", "达摩克利斯之剑"`, true);
            windowsfont(windowsfont_variable, true)


            // sendcommand(`TEXT 0,${windowsfont_variable.y},"0",0,12,12,"123123123123123132123123123132"`, true);
                // height = height + 2
            // sendcommand(`BARCODE 5,${height},"128",50,1,0,3,3,"AUDAUFADADCRQERHADADSF${i+1}"`, true);
        }
        sendcommand('PRINT 1,1', true);  //  printlabel(label_variable, true); 问题
        // sendcommand('CLS', true);    // test code 此条指令用来清除打印机中的图像缓存
        // sendcommand('EOJ', true)     // test code
        // clearbuffer('', true);    //  此条指令用来清除打印机中的图像缓存
        closeport('', true);
    }
}

function printfile128B() {
    var label_variable = {quantity: '1', copy: '1'};

    openport('TSC TE244', true);
    clearbuffer('', true);
    sendcommand('CODEPAGE UTF-8', true);
    sendcommand('TEXT 250,50,"0",0,10,10,\"Text Test!!\"', true);
    sendcommand('TEXT 250,100,"FONT2.TTF",0,10,10,"中文Text Test!!"', true);
    // sendcommand(`SIZE 1.07, 1.07`, true);
    // sendcommand(`SIZE 2.33, 1.54`, true);
    // sendcommand(`BOX 0, 0, 480, 320, 10`, true);
    // sendcommand(`BOX 0, 0, 480, 320, 20`, true);
    // sendcommand(`TEXT 80,80,"0",0,12,12,""`, true);
    // sendcommand(`TEXT 80,450,"0",0,12,12,"test edit"`, true);
    printlabel(label_variable, true);
    closeport('', true);
}

function printfile128C() {
    var windowsfont_variable = {
        x: 20,
        y: 100,
        fontheight: 64,
        rotation: 0,
        fontstyle: 3,
        fontunderline: 0,
        szFaceName: 'Arial',
        content: '达摩克利斯之剑'
    }
    var label_variable = {quantity: '1', copy: '1'};
    openport('TSC TE244', true);
    clearbuffer('', true);
    // windowsfont(0, 50, 64, 0, 0, 0, "Arial", "Windows Arial Font Test")
    windowsfont(windowsfont_variable);

    // sendcommand(`SIZE 1.07, 1.07`, true);
    // sendcommand(`SIZE 2.33, 1.54`, true);
    // sendcommand(`BOX 0, 0, 480, 320, 10`, true);
    // sendcommand(`BOX 0, 0, 480, 320, 20`, true);
    // sendcommand(`TEXT 80,80,"0",0,12,12,""`, true);
    // sendcommand(`TEXT 80,450,"0",0,12,12,"test edit"`, true);
    printlabel(label_variable, true);
    closeport('', true);
}
