# FakeCursor
This is a JavaScript libary which allows you to have comple control over a user's cursor. The cursor is however, virtual, so you cannot use it to, for example, switch tabs. 

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
Include this code in your project's main HTML file's head tag
```html
<script src="https://cdn.jsdelivr.net/gh/Fighter178/FakeCursor/fkcs.min.js"></script>
```
Once you've included the resource, call the below functioons. 
```js
fakeCursor.init(true);
fakeCursor.fkcs(document.querySelector("canvas.cursor-screen"), document.querySelector("img.cursor"));
```
The init function creates the canvas with the class cursor-screen and the cursor image with the class of cursor. The argument which we pass true in the init function tells the function that auto is set to true, the default is false. This ignores any of the other three arguments which are the canvas class, cursor image url, and the cursor image class. The fkcs function starts the code with the first argument as the canvas element and the second as the image element. 

> Note: The shorthand fkcs can be used instead of fakeCursor

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
This moves the cursor 100 pixels right and 100 pixels up from where it currently is. 
```js
fakeCursor.moveTo(-100,-100,true)
```
This moves the cursor 100 pixels left and 100 pixels down from where it currently is.
#### Capturing Events
##### Click Event
```js
document.querySelector("button").addEventListener("v-click", (e)=>{
// event code here
/*Ex:*/console.log(e)
})
```
Note: the isTrusted property will be false, as it is a custom event, but I'm sure you could capture the real click event and check if a v-click event was fired on it. The mousedown and mouseup events are not currently supported 
#### Switching the Cursor Image
To switch the cursor image, use fakeCursor.img = [image element]

JS:
```js
fakeCursor.img = document.querySelector("img.pointer-cursor")
```
HTML:
```html
<img class="pointer-cursor" width="12" height="16">
```
This could, for example, swtich the cursor to a pointer image instead of the default arrow. Note: The pointer image is not built-in, only the arrow is. 
#### Getting the Cursor's Position
To get the cursor's position, use fakeCursor.x and fakeCursor.y.
```js
// get the x cordinate
fakeCursor.x // this returns the X cordinate of the cursor.
// get the y cordinate
fakeCursor.y // this returns the Y cordiinate of the cursor.
```

