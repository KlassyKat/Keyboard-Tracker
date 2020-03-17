function mouseSize() {
    let container = document.querySelector(".container");
    let mouse = document.querySelector(".mouse");
    let containerDimensions = container.children[0].getBoundingClientRect();
    let mouseDimensions = mouse.getBoundingClientRect();
    let containerHeight = containerDimensions.height;
    let mouseRatio = mouseDimensions.width / mouseDimensions.height;
    let scaleValue = containerHeight * mouseRatio;
    console.log(scaleValue);
    console.log(mouse)
    mouse.style.width = `${scaleValue}px`;
}