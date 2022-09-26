# FakeCursor
This is a JavaScript libary which allows you to have comple control over a user's cursor. The cursor is however, virtual, so you cannot use it to switch tabs. 

## About
FakeCursor (fkcs) is not for every project, but you can use it however you need. Very useful for things like preventing a cursor from going over specific areas, and maybe in the future, will be able to show a cursor on mobile. It is a bit finnicy, becasue it cannot use onclick, mouseover, etc. It uses a virtuual event, these events are prefixed by a v- (eg. v-click). Keyboard events are not modified, just mouse events. If you need to focus on a input/textarea, listen for the v-click and then call document.querySelector("[selector]").focus(). 
> Example
```js
document.querySelector("#textbox").addEventListener("v-click",()=>{
  document.querySelector("#textbox").focus()
})
```
This is a bit wierd, and will probably need improvement. This is not intended to be the docs, find that [here](https://github.com/TheTrueLuckyCoder/FakeCursor/blob/main/README.md#docs).
This is just something I made and is not intended for quick use, and was not developed around this idea. It is very boilerplate heavy. 


## Docs
### Geting Started
Quickstart Guide
#### Easy Way (CDN)
Include this code in your projects main HTML file's head tag
```html
<script src="https://cdn.jsdelivr.com/"></script>
```
Once you've included the resource, call the below functioons. 
```js
fakeCursor.init(true);
fakeCursor.fkcs(document.querySelector("canvas.cursor-screen"), document.querySelector("img.cursor"));
```
The init function creates the canvas with the class cursor-screen and the cursor image with the class of cursor. The argument which we passe true in the init function tells the function that auto is set to true, the default is false. This ignores any of the other three arguments which are the canvas class, cursor image url, and the cursor image class. The fkcs function starts the code with the first argument as the canvas element and the second as the image element. 

### Usage
#### Moving the Cursor
Simple, use the moveTo function
##### Moving to static locations
```js
fakeCursor.moveTo(0,0)
```
This will move it to the top left of the screen. 
##### Moving to relative locaions 
```js
fakeCursor.moveTo(100,100,true)
```
This moves the cursor 100 pixels to the left and 100 pixels down from where it currently is.
