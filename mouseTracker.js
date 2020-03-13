const mouseTrack = setInterval(mouseTrackFunc(), 10);

function mouseTrackFunc() {
    let mousePos = electron.screen.getCursorScreenPoint();
    console.log(mousePos);
}