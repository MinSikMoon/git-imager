[![NPM version](https://badge.fury.io/js/git-imager.svg)](http://badge.fury.io/js/git-imager) 
[![npm](https://img.shields.io/npm/dm/git-imager.svg)]()

# 1. git-imager 
* HTML img 태그안의 base64 데이터를 깃헙 레포지토리에 이미지로 올리고 생성된 url로 src 속성을 대체시켜주는 모듈.
* summernote 써보다가 만듦.
1. detect image tags in HTML with base64-data 
2. then upload all that images to github repository, and replace image src with generated github-url
3. finally you can get HTML that contains img tags with github-url.  
*. ex) you can use git-imager with summenote html editor.

# 2. example 
- source HTML will be..
````HTML
<p>
<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2..........something long base64 data" 
     data-filename="testfornodejs.jpg" style="width: 100px;">
<br>
</p>
````
- converted to HTML like this 
````HTML
<p>
  <img src="https://raw.githubusercontent.com/MinSikMoon/database_test/master/15346903140862939134887091734.jpg" 
       data-filename="testfornodejs.jpg" style="width: 100px;">
<br>
</p>
````

# 3. How to use
__1. npm install__
````cmd
npm install --save git-imager
````

__2. import git-imager and make git-imager object__
````javascript
var gitImager = require('git-imager');
var imager = new gitImager('[your github username]', '[your-github-token]', '[repository where to save images]');
````

````javascript
 -- example
var imager = new gitImager('MinSikMoon', 'abcd577dsaadffa/aeifnvic', 'database_test');
 
````

__3. makeImgUrlHtml(SourceHtml)__
* function
````javascript
void makeImgUrlHtml(sourceHtml)
````

* example 1
````javascript
imager.makeImgUrlHtml(sourceHtml);
````

* example 2 (in situation when you get source-html from summernote editor)
````javascript
app.post("/summernoteSubmit", function(req, res){
     var sourceHtml = req.body.editordata;
     imager.makeImgUrlHtml(sourceHtml);
})     
````

````html
//sourceHtml looks like this
<p>
<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2..........something long base64 data" 
  data-filename="testfornodejs.jpg" style="width: 100px;">
<br>
</p>
````

__4. setEventHandler('eventName', function(convertedHtml){}) </br> 
* git-imager emits event named 'makeImgUrlHtmlDone' when makeImgUrlHtml function finished.
* set event handler for event named 'makeImgUrlHtmlDone' on git-imager object,</br>
  so you can get converted-HTML__
  
* function 
````javascript
void setEventHandler('eventName', funtion(convertedHtml){
     //do whatever you want with convertedHtml in this callback-function.
})
````
* example
````javascript
imager.setEventHandler('makeImgUrlHtmlDone', function(convertedHtml){
    console.log(convertedHtml);
    //do whatever you want with convertedHtml
});
````

# 4. Usage Example Summary
````javascript
var gitImager = require('git-imager');
var imager = new gitImager('[user-name]', '[token]', '[repository for image]');

imager.setEventHandler('makeImgUrlHtmlDone', function(convertedHtml){
    console.log(convertedHtml);
});

imager.makeImgUrlHtml(sourceHtml);

````

# in 1.0.3
* remove singleton eventemitter and make gitImager object have its own eventemitter.
