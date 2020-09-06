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

function addKeycodes(data) {
    for(group of data.childNodes) {
        for(element of group.childNodes) {
            if(element.nodeName == 'text') {
                let newId = element.innerHTML.charCodeAt(0);
                for(element of group.childNodes) {
                    if(element.nodeName != 'text') {
                        element.id = newId;
                    }
                }
            }
        }
    }
    saveKeyboard(data)
}

function saveKeyboard(data) {
    let divWrapper = document.createElement("div");
    divWrapper.appendChild(data);
    data = divWrapper.innerHTML;
    let fileName = localStorage.getItem('newKeyboard')
    console.log(`${__dirname}/custom-keyboards/${fileName}.svg`)
    fs.writeFile(`${__dirname}/custom-keyboards/${fileName}.svg`, data, (e) => {
        if(e) {
            console.log(e)
        } else {
            loadCustomKeyboards();
        }
    });
    
}