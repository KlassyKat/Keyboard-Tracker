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

function shortcutDisplay(e) {
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
        keyStateStyling(keyState);
        document.getElementById(29).parentElement.style.display = 'block';
    } else if (e.keycode == 56) { //Alt key
        console.log('?')
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
        keyStateStyling(keyState);
        document.getElementById(e.keycode).parentElement.style.display = 'block';
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
        keyStateStyling(keyState);
        document.getElementById(e.keycode).parentElement.style.display = 'block';
    } else if(keyState !== 0){
        document.getElementById(e.keycode).parentElement.style.display = 'block';
        if(keysPressed.indexOf(e.keycode) == -1) {
            keysPressed.push(e.keycode);
            changePos();
        }
    }
}


function shortcutHide(e) {
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
        keyStateStyling(keyState);
        document.getElementById(29).parentElement.style.display = 'none';
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
        keyStateStyling(keyState);
        document.getElementById(e.keycode).parentElement.style.display = 'none';
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
            for(key of keysPressed) {
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
            altKey.style.left = '17%';
            shiftKey.style.left = '0';
            shortcutKeysCounter = 2;
            break;
        case 3:
            ctrlKey.style.left = '0';
            altKey.style.left = '0';
            shiftKey.style.left = '17%';
            shortcutKeysCounter = 2;
            break;
        case 4:
            ctrlKey.style.left = '0';
            altKey.style.left = '17%';
            shiftKey.style.left = '34%';
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
            shiftKey.style.left = '17%';
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
    console.log(keysPressed);
    let ctrlKeyPos = document.getElementById(29).parentElement.getBoundingClientRect().right;
    let altKeyPos = document.getElementById(56).parentElement.getBoundingClientRect().right;
    let shiftKeyPos = document.getElementById(42).parentElement.getBoundingClientRect().right;
    let shortcutKeysRightPos = Math.max(ctrlKeyPos, altKeyPos, shiftKeyPos);
    let totalWidth = 0;
    for(key in keysPressed) {
        document.getElementById(keysPressed[key]).parentElement.style.left =  shortcutKeysRightPos + totalWidth + 'px';
        totalWidth += document.getElementById(keysPressed[key]).parentElement.getBoundingClientRect().width;
    }
}