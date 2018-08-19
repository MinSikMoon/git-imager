# 1. git-imager
1. detect image tags in HTML with base64-data 
2. then upload all that images to github repository, and replace image src with generated github-url
3. finally you can get HTML that contains img tags with github-url.  

# 2. example 
- source HTML will..
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
1. npm install
````cmd
npm install --save git-imager
````

2. import git-imager and make git-imager object
````javascript
var gitImager = require('git-imager');
var imager = new gitImager('[your github username]', '[your-github-token]', '[repository where to save images]');
/*
 -- example
var imager = new gitImager('MinSikMoon', 'abcd577dsaadffa/aeifnvic', 'database_test');
*/ 
````

3. makeImgUrlHtml(SourceHtml)
````javascript
void makeImgUrlHtml(sourceHtml)
````
* example
````javascript
app.post("/summernoteSubmit", function(req, res){
     var sourceHtml = req.body.editordata;
     imager.makeImgUrlHtml(sourceHtml);
})     
````
````html
//in my case, i used sourceHtml that generated from summernote html editor
//and sourceHtml looks like this
/*
  <p>
  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2..........something long base64 data" 
       data-filename="testfornodejs.jpg" style="width: 100px;">
  <br>
  </p>
*/
````

4. set eventHandler for event named 'makeImgUrlHtmlDone' on git-imager object,</br>
   so you can get img-url-converted-HTML
````javascript
imager.setEventHandler('makeImgUrlHtmlDone', function(convertedHtml){
    console.log(convertedHtml);
    //do whatever you want with convertedHtml
});
````
````html
// convertedHtml will be like this
/*
<p>
<img src="https://raw.githubusercontent.com/MinSikMoon/database_test/master/15346903140862939134887091734.jpg" 
  data-filename="testfornodejs.jpg" style="width: 100px;">
<br>
</p>
*/
````

