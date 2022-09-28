//Apache Software License 2.0 
// Copyright (c) 2022 Fighter178 
let x = 0,
    y = 0;
let imgWidth = 12,
    imgHeight = 16;
let sensitivity = 0 // sensitivity works slightly weirdly, in that it is ADDED to the x & y values, not multiplied, but 0 is normal 1 is one extra pixel per frame, 2 is 2, etc.
let canvas, img
const fakeCursor = {
    x:0,
    y:0,
    imgWidth:12,
    imgHEight:16,
    sensitivity:0,
    canvas:"",
    img:"",
    setSensitivity: (s) => {
        sensitivity = s
    },
    fkcs: (cvs, image) => {
        canvas = cvs;
        img = image;
        document.addEventListener("click", (e) => {
            e.preventDefault();
            canvas.requestPointerLock();
        }, {once: false,bubbles: false});
        document.addEventListener("keyup", (e) => {
            if (e.key == "esc") {
                e.preventDefault();
                e.stopPropagation();
            }
        })

        const ctx = canvas.getContext("2d");
        canvas.setAttribute("width", screen.width)
        canvas.setAttribute("height", screen.height)
        document.addEventListener("click", (e) => {
            fakeCursor.HandleMouseEvent("click");
        });
        document.querySelectorAll("*").forEach((elem)=>{
            elem.addEventListener("mouseover", (e) => {
                fakeCursor.HandleMouseEvent("mouseover");
            });
        });
        document.addEventListener("mousemove", (e) => {
            const {
                movementX,
                movementY
            } = e;
            x += movementX;
            y += movementY;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.drawImage(img, x + sensitivity, y + sensitivity, imgWidth, imgHeight);
        });
    },
    init:(auto=false, cvsClass="", imgURL="", imgClass="") => {
        const img = document.createElement("img")
        if (!auto) {
            img.src = imgURL
        } else{
            img.src = "https://i.ibb.co/BL2MH2c/images-removebg-preview.png"
        }
        img.width = "12";
        img.height = "16";
        if (!auto) {
            img.className = imgClass;
        } else {
            img.className = "cursor"
        }
        img.style.display = "none";
        document.body.append(img)
        const cvs = document.createElement("canvas")
        cvs.width = screen.width;
        cvs.height = screen.height;
        cvs.style = "position:absolute;top:0;left:0;overflow:hidden;z-index:9999999"
        if (!auto) {
            cvs.className = cvsClass
        } else {
            cvs.className = "cursor-screen"
        }
        document.body.append(cvs)
    },
    HandleMouseEvent: (type) => {
        var evt = new CustomEvent("v-" + type, {
            bubbles: false,
            cancelable: true,
            view: window,
            detail: {
                isVirtual: true
            }
        })
        document.elementsFromPoint(x, y).forEach((elem) => {
            console.log("Dispatched "+evt.type+" to "+elem.nodeName.toLowerCase()+".")
            elem.dispatchEvent(evt);
        });
    },
    resize: (w = 16, h = 12, auto = true) => {
        imgHeight = h
        if (auto) {
            imgWidth = (h / 4) * 3 // makes the pointer image squre (the included one, not a custom one).
            return imgWidth
        } else {
            imgWidth = w
        }
        // this tricks the code to update the canvas.
        document.dispatchEvent(document.createEvent("MouseEvents").initEvent("mousemove", true, true))
    },
    moveTo: (tx, ty) => {
        fakeCursor.x = tx;
        fakeCursor.y = ty; // set X and Y
        const evt = document.createEvent("MouseEvents")
        evt.initEvent("mousemove", true, true)
        document.dispatchEvent(evt) // move the cursor by triggering a mousemove event
    }
}
const fkcs = fakeCursor;
// The fix for sweetAlert
const swalfClickHandler = () => {
    swal.close();
    document.querySelectorAll(".swal-button").forEach((elem) => {
        elem.removeEventListener("Vclick", swalfClickHandler)
    })
}
const swalf = (title, text = "", icon = "") => {
    if (typeof title === 'string' || title instanceof String) { // check if title is a string
        swal(title, text, icon)
    } else {
        swal(title)
    }
    document.querySelectorAll(".swal-button").forEach((elem) => {
        elem.addEventListener("v-click", swalfClickHandler)
    })
}
