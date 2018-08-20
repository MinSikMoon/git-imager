module.exports=GitImager;
var request = require('request');
var events = require('events');

function GitImager(userName, token, imageRepository){
    //1. properties
    this.userName = userName;
    this.token = token;
    this.imageRepository = imageRepository;
    this.eventController = new events.EventEmitter();
    this.imgArr = [];
    this.imgTagNum = 0;

    //2. functions
    this.makeImgUrlHtml = function(sourceHtml){
        this.imgArr = [];
        this.imgArr = setImgArr(sourceHtml, this.imgArr);
        this.imgTagNum = this.imgArr.length;
        makeGitRequest(this.userName, this.token, this.imageRepository, 0, this.imgTagNum, this.imgArr, sourceHtml, this.eventController);
    }

    //3. setEventFunction
    this.setEventHandler = function(eventName, eventHandler){
        this.eventController.removeListener(eventName, eventHandler);
        this.eventController.on(eventName, eventHandler);
    }
}
// get json of image base64 data and imgExt 
var getBase64Img = function(imgTag){
    var splitted =  (imgTag).split(';');
    var contentType = splitted[0];
    var encContent = splitted[1];
    var imgBase64 = encContent.substr(6);
    var base64Data = encContent.replace(/^base64,/, "");
    base64Data = base64Data.replace(/\"/, "");
    var obj = new Object();
    switch(contentType.split(':')[1]) {
        case 'image/jpeg': obj.imgExt = 'jpg'; break;
        case 'image/gif': obj.imgExt = 'gif'; break;
        case 'image/png': obj.imgExt = 'png'; break;
        default: obj.imgExt = contentType.split(':')[1]; 
    }
    obj.base64Data = base64Data;
    return obj;
}
// set imgArr
var setImgArr = function(htmlText, imgTagArr){
    imgTagArr = htmlText.match(/src=\"data:([^\"]+)\"/g);
    var result = null;
    if(imgTagArr != null){
        imgTagArr.forEach(function(element, i){
           imgTagArr[i] = getBase64Img(element);
        });
        result = imgTagArr;
    }else{
        result = [];
    }
    return result;
}

var makeGitRequest = function(userName, token, repository, idx, maxCnt, imgTagArr, html, eventEmitter){
    if(idx < maxCnt && maxCnt != 0){
        var baseUrl = "https://api.github.com";
        var imgName = Date.now() + String(Math.random() * (900000000)).replace('.','') +'.'+ imgTagArr[idx].imgExt;
        var base64ImgData = imgTagArr[idx].base64Data;
        var apiUrl = baseUrl + "/repos/" + userName + "/" + repository + "/contents/" + imgName;
        var timeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        var options = {
            url:apiUrl,
            headers:{
                'User-Agent' : userName,
                'Authorization' : 'Token ' + token
            },
            json:{
                "message" : new Date().toLocaleDateString('ko-KR', timeOptions),
                "content" : base64ImgData
            }
        };

        request.put(options, function(err, res, body){
            var converted = "";
            if(err){
                converted = 'src=""';
            }else{
                converted = 'src="' + res.body.content.download_url + '"';
            }
            html = html.replace(/src=\"data:([^\"]+)\"/i, converted); 
            makeGitRequest(userName, token, repository, ++idx, maxCnt, imgTagArr, html, eventEmitter);
        });
    }else{
        eventEmitter.emit('makeImgUrlHtmlDone', html);
    }
}