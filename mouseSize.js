let maxChild;
function mouseSize() {
    let container = document.querySelector(".container");
    let mouse = document.querySelector(".mouse");
    if(container) {
        let containerChildren = container.children;
        let childHeight = [];
        for (child of containerChildren) {
            childHeight.push(child.getBoundingClientRect().height);
        }
        maxChild = Math.max(...childHeight);
        console.log(maxChild)
    } else {
        maxChild = document.getElementById('keyboard-container').getBoundingClientRect().height;
    }
    let mouseRatio = 0.65; //Mouse svg width to height ratio
    let scaleValue = maxChild * mouseRatio;
    mouse.style.width = `${scaleValue}px`;

    //Position Arrow
    let mouseArrow = document.getElementById('mouse-arrow');
    let mouseProps = document.querySelector('.mouse-svg').getBoundingClientRect();
    let mouseAnchor = document.getElementById('mouse-tracker-anchor').getBoundingClientRect();
    let arrowX = mouseProps.width/2;
    let arrowY = (mouseAnchor.y - mouseProps.y) - (mouseAnchor.height/4);
    mouseArrow.style.left = arrowX;
    mouseArrow.style.top = arrowY;
}