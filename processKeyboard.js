function processKeyboard(keyboard) {
    if(keyboard.includes('?xml')) {
        let keyboardArray = keyboard.split(">");
        for(item in keyboardArray) {
            if(keyboardArray[item].includes('?xml')) {
                keyboardArray.splice(item, 1);
            }
            if(keyboardArray[item].includes('DOCTYPE')) {
                keyboardArray.splice(item, 1);
            }
        }
        keyboard = keyboardArray.join(">");
        keyboard = new DOMParser().parseFromString(keyboard, "text/xml").childNodes[0];
        addKeycodes(keyboard);
    }
};

let newId;
function addKeycodes(data) {
    for(group of data.childNodes) {
        for(element of group.childNodes) {
            if(element.nodeName == 'text') {
                // if(detectEdgeCase(element.innerHTML)) {
                //     newId = handleEdgeCase(element.innerHTML);
                // } else {
                    newId = element.innerHTML.charCodeAt(0);
                    console.log(element.innerHTML);
                // }
                for(element of group.childNodes) {
                    if(element.nodeName != 'text') {

                        element.id = newId;
                        element.classList.add('active-el-class');
                    }
                }
            }
        }
    }
    saveKeyboard(data)
}

let edgeCaseValues = {
    '`': 192,
    '-': 189,
    '=': 187,
    //Backspace
    'Backspace': 8,
    'Tab': 9,
    '[': 219,
    ']': 221,
    '': 220
}
function detectEdgeCase(data) {
    let edgeCase = false;
    if(data.length>1) {
        edgeCase = true;
    } else if (data == '`') {
        edgeCase = true;
        newId = 192;
    }
    return edgeCase;
}

function saveKeyboard(data) {
    let divWrapper = document.createElement("div");
    divWrapper.appendChild(data);
    data = divWrapper.innerHTML;
    let fileName = localStorage.getItem('newKeyboard')
    console.log(`${__dirname}/custom-keyboards/${fileName}.svg`)
    fs.writeFile(`${__dirname}/default-keyboards/${fileName}.svg`, data, (e) => {
        if(e) {
            console.log(e)
        } else {
            loadCustomKeyboards();
        }
    });
    
}