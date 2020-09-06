const fontList = require('font-list');
//Create font select
var selectionElement = document.createElement('select');
selectionElement.classList.add('font-select');

var trigger = true;
if (trigger) {
    fontList.getFonts()
        .then(fonts => {
            selectionElement.options[0] = new Option(localStorage.getItem('selectedFont'), localStorage.getItem('selectedFont'));
            selectionElement.style.fontFamily = localStorage.getItem('selectedFont');
            for (font of fonts) {
                font = font.replace(/"/g, ''); //Remove quotations from array output
                font = font.replace(/( Medium| Nominal)$/g, '');
                currentFont = new Option(font, font); //Add option to select
                // currentFont.style.fontFamily = font; //Make option appear in its own font
                selectionElement.options[selectionElement.options.length] = currentFont;
            };
            trigger = false;
        })
        .catch(err => {
            console.log(err);
        })
}
loadFontFamily();