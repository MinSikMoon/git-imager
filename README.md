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

# 3. Usage Example Summary
````javascript
var gitImager = require('git-imager');
var imager = new gitImager('[username]', '[token]', '[repository]');
 
imager.setEventHandler('makeImgUrlHtmlDone', function(convertedHtml){
    console.log(convertedHtml);
});

var sourceHtml = '<p>'  
 + '<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABkAGQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoqvqErQWE8iHDKhKn0NcrLqF8/ym6lwewbH8q8/F4+GFajJNtm9KhKoro7HNLXBXjS+RuWRhIrqytkkgg8V1+lanHqdsJFG2RcB09D/hUYLMYYpuNrP8y62GlTjzbovUUUV6ZyhRRRQAUUUUAFFFFABRRRQBn65IselS7iAGIXn61yn2iItkSRk/7wrtbm1t7yMR3MKTIGDbXUEZHTisiTwdpEspkaOU5JO0SYXn2HpXjZhl88TUU4vpY7cPXhTjaRzlzcRlQu5Dlh/F0pNK1GaLUY/saNLJ90oB94V0MfgnRUdGMMjleu6Q/N9cf0rZtrK2so9ltBHEvoi4zXNh8oqQmpOVrdjepi6fLypNk1LRRX0R5YUUUUAFFFFABRRRQAUUUUAFJS0UAJRS0UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k=" data-filename="testfornodejs.jpg" style="width: 100px;">'
 + '<br>'
 + '</p>';

imager.makeImgUrlHtml(sourceHtml);
````

# 4. How to use
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

__4. setEventHandler('eventName', function(convertedHtml){})__ 
* git-imager emits event named 'makeImgUrlHtmlDone' when makeImgUrlHtml function finished.
* set event handler for event named 'makeImgUrlHtmlDone' on git-imager object,</br>
  so you can get converted-HTML
  
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

# in 1.0.3
* remove singleton eventemitter and make gitImager object have its own eventemitter.
