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
let keyPressedCounter = 0;
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
    }
    //Alt Key
    if (e.keycode == 56) {
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
    }

    //Shift Key
    if (e.keycode == 42) {
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
    }
    //All other keys
    let notCommandKey = true;
    notCommandKey = e.keycode == 29 ? false : e.keycode == 56 ? false : e.keycode == 42 ? false : true;
    if (notCommandKey && keyState !== 0 && !keysPressed.find((key)=>{return key == e.keycode })) {
        document.getElementById(e.keycode).parentElement.style.display = 'block';
        document.getElementById(e.keycode).parentElement.style.left = `${(shortcutKeysCounter + keyPressedCounter) * 17}%`;
        keysPressed.push(e.keycode);
        keyPressedCounter += 1;
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
        changeLeft();
    }

    //Alt
    if (e.keycode == 56) {
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
        changeLeft();
    }
    //Shift
    if (e.keycode == 42) {
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
        changeLeft();
    }

    //All other keys
    let notCommandKey = true;
    notCommandKey = e.keycode == 29 ? false : e.keycode == 56 ? false : e.keycode == 42 ? false : true;
    if (notCommandKey) {
        document.getElementById(e.keycode).parentElement.style.display = 'none';
        document.getElementById(e.keycode).parentElement.style.left = 0;
        keysPressed.splice(keysPressed.indexOf(e.keycode), 1);
        keyPressedCounter -= 1;
    }
}

function changeLeft() {
    for(key in keysPressed) {
        console.log(key);
        // let currentLeft = parseInt(document.getElementById(keysPressed[key]).parentElement.style.left, 10);
        document.getElementById(keysPressed[key]).parentElement.style.left = `${(shortcutKeysCounter + key) * 17}%`;
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
}