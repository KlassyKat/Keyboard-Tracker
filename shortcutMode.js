let keyState = 0;
//Key State Values
//0: Nothing
//1: Ctrl 
//2: Ctrl + Alt 
//3: Ctrl + Shift 
//4: Ctrl + Alt + Shift 
//5: Alt 
//6: Alt + Shift 
//7: Shift
let shortcutKeysCounter = 0;
let keysPressed = [];
let animationRun = false;

function shortcutDisplay(e) {
    if(keyState !== 0) {
        animationRun = true;
    }
    //Ctrl Key
    if (e.keycode == 29) {
        //State Set
        switch (keyState) {
            case 0:
                keyState = 1;
                break;
            case 5:
                keyState = 2;
                break;
            case 6:
                keyState = 4;
                break;
            case 7:
                keyState = 3;
                break;
        }
        document.getElementById(29).parentElement.style.display = 'block';
        keyStateStyling(keyState);
    } else if (e.keycode == 56) {
        switch (keyState) {
            case 0:
                keyState = 5;
                break;
            case 1:
                keyState = 2;
                break;
            case 3:
                keyState = 4;
                break;
            case 7:
                keyState = 6;
                break;
        }
        document.getElementById(e.keycode).parentElement.style.display = 'block';
        keyStateStyling(keyState);
    } else if (e.keycode == 42) { //Shift Key
        switch (keyState) {
            case 0:
                keyState = 7;
                break;
            case 1:
                keyState = 3;
                break;
            case 2:
                keyState = 4;
                break;
            case 5:
                keyState = 6;
                break;
        }
        document.getElementById(e.keycode).parentElement.style.display = 'block';
        keyStateStyling(keyState);
    } else if (keyState !== 0) {
        document.getElementById(e.keycode).parentElement.style.display = 'block';
        if (keysPressed.indexOf(e.keycode) == -1) {
            keysPressed.push(e.keycode);
            changePos();
        }
    }
}


function shortcutHide(e) {
    shortcutAnimation();
    //Ctrl Key
    if (e.keycode == 29) {
        switch (keyState) {
            case 1:
                keyState = 0;
                break;
            case 2:
                keyState = 5;
                break;
            case 3:
                keyState = 7;
                break;
            case 4:
                keyState = 6;
                break;
        }
        document.getElementById(29).parentElement.style.display = 'none';
        keyStateStyling(keyState);
    } else if (e.keycode == 56) { //Alt
        switch (keyState) {
            case 2:
                keyState = 1;
                break;
            case 4:
                keyState = 3;
                break;
            case 5:
                keyState = 0;
                break;
            case 6:
                keyState = 7;
                break;
        }
        keyStateStyling(keyState);
        document.getElementById(e.keycode).parentElement.style.display = 'none';
    } else if (e.keycode == 42) { //Shift
        switch (keyState) {
            case 3:
                keyState = 1;
                break;
            case 4:
                keyState = 2;
                break;
            case 6:
                keyState = 5;
                break;
            case 7:
                keyState = 0;
                break;
        }
        document.getElementById(e.keycode).parentElement.style.display = 'none';
        keyStateStyling(keyState);
    } else {
        document.getElementById(e.keycode).parentElement.style.display = 'none';
        keysPressed.splice(keysPressed.indexOf(e.keycode), 1);
        changePos();
    }

}


function keyStateStyling(state) {
    let ctrlKey = document.getElementById(29).parentElement;
    let altKey = document.getElementById(56).parentElement;
    let shiftKey = document.getElementById(42).parentElement;
    switch (state) {
        case 0:
            ctrlKey.style.left = '0';
            altKey.style.left = '0';
            shiftKey.style.left = '0';
            shortcutKeysCounter = 0;
            //Hide all keys if no shortcut key pressed
            for (key of keysPressed) {
                document.getElementById(key).parentElement.style.display = 'none';
            }
            break;
        case 1:
            ctrlKey.style.left = '0';
            altKey.style.left = '0';
            shiftKey.style.left = '0';
            shortcutKeysCounter = 1;
            break;
        case 2:
            ctrlKey.style.left = '0';
            altKey.style.left = ctrlKey.getBoundingClientRect().right + 'px';
            shiftKey.style.left = '0';
            shortcutKeysCounter = 2;
            break;
        case 3:
            ctrlKey.style.left = '0';
            altKey.style.left = '0';
            shiftKey.style.left = ctrlKey.getBoundingClientRect().right + 'px';
            shortcutKeysCounter = 2;
            break;
        case 4:
            ctrlKey.style.left = '0';
            altKey.style.left = ctrlKey.getBoundingClientRect().right + 'px';
            shiftKey.style.left = altKey.getBoundingClientRect().right + 'px';
            shortcutKeysCounter = 3;
            break;
        case 5:
            ctrlKey.style.left = '0';
            altKey.style.left = '0';
            shiftKey.style.left = '0';
            shortcutKeysCounter = 1;
            break;
        case 6:
            ctrlKey.style.left = '0';
            altKey.style.left = '0';
            shiftKey.style.left = altKey.getBoundingClientRect().right + 'px';
            shortcutKeysCounter = 2;
            break;
        case 7:
            ctrlKey.style.left = '0';
            altKey.style.left = '0';
            shiftKey.style.left = '0';
            shortcutKeysCounter = 1;
            break;
    }
    changePos();
}

function changePos() {
    let ctrlKeyPos = document.getElementById(29).parentElement.getBoundingClientRect().right;
    let altKeyPos = document.getElementById(56).parentElement.getBoundingClientRect().right;
    let shiftKeyPos = document.getElementById(42).parentElement.getBoundingClientRect().right;
    let shortcutKeysRightPos = Math.max(ctrlKeyPos, altKeyPos, shiftKeyPos);
    let totalWidth = 0;
    for (key in keysPressed) {
        document.getElementById(keysPressed[key]).parentElement.style.left = shortcutKeysRightPos + totalWidth + 'px';
        totalWidth += document.getElementById(keysPressed[key]).parentElement.getBoundingClientRect().width;
    }
}

function shortcutAnimation() {
    let animationKeysPressed = [];
    if (animationRun) {
        animationRun = false;
        switch (keyState) {
            case 0:
                break;
            case 1:
                animationKeysPressed.push(document.getElementById(29).parentElement);
                break;
            case 2:
                animationKeysPressed.push(document.getElementById(29).parentElement);
                animationKeysPressed.push(document.getElementById(56).parentElement);
                break;
            case 3:
                animationKeysPressed.push(document.getElementById(29).parentElement);
                animationKeysPressed.push(document.getElementById(42).parentElement);
                break;
            case 4:
                animationKeysPressed.push(document.getElementById(29).parentElement);
                animationKeysPressed.push(document.getElementById(56).parentElement);
                animationKeysPressed.push(document.getElementById(42).parentElement);
                break;
            case 5:
                animationKeysPressed.push(document.getElementById(56).parentElement);
                break;
            case 6:
                animationKeysPressed.push(document.getElementById(56).parentElement);
                animationKeysPressed.push(document.getElementById(42).parentElement);
                break;
            case 7:
                animationKeysPressed.push(document.getElementById(42).parentElement);
                break;
        }
        for (key of keysPressed) {
            animationKeysPressed.push(document.getElementById(key).parentElement);
        }
        appendNode(animationKeysPressed);
    }
}

function appendNode(elements) {
    for (element of elements) {
        let currentElement = element.cloneNode(true);
        currentElement.childNodes[1].removeAttribute('id');
        currentElement.classList.add('animation');
        currentElement.classList.add('animation-0');
        document.getElementById('shortcut-only').appendChild(currentElement); //*
    }
    let animationElements = document.querySelectorAll('.animation');
    console.log(animationElements)
    for (item of animationElements) {
        console.log(item)
        if (item.classList.contains('animation-4')) {
            item.remove();
        } else if (item.classList.contains('animation-3')) {
            item.classList.remove('animation-3');
            item.classList.add('animation-4');
        } else if (item.classList.contains('animation-2')) {
            item.classList.remove('animation-2');
            item.classList.add('animation-3');
        } else if (item.classList.contains('animation-1')) {
            item.classList.remove('animation-1');
            item.classList.add('animation-2');
            console.log('animate2')
        } else if (item.classList.contains('animation-0')) {
            item.classList.remove('animation-0');
            item.classList.add('animation-1');
            console.log('animate')
        }
    }
}

//No user input between animtaions
//Element created
//Animation class
