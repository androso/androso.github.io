const Board = (() => {
    let canvasContext = '';
	const render = ($hangmanCanvas, livesLeftCounter) => {
        canvasContext = $hangmanCanvas.getContext("2d");
		renderGallow();
        switch(livesLeftCounter) {
            case 6:
                renderRope();
                break;
            case 5:
                renderHead();
                break;
            case 4:
                renderBody();
                break;
            case 3:
                renderLeftHand();
                break;
            case 2:
                renderRightHand();
                break;
            case 1:
                renderLeftLeg();
                break;
        }
	};
	const renderGallow = () => {
		canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = "white";
        drawLine(0, 5, 60, 5, canvasContext);
        drawLine(10, 0, 10, 150, canvasContext);
        drawLine(0, 144, 140, 144, canvasContext);
	};
    const renderRope = () => {
        drawLine(55, 5, 55, 14);
    }
    const renderHead = () => {
        drawCirc(55, 25, 10, 0, Math.PI * 2);
    }
    const renderBody = () => {
        drawLine(55, 35, 55, 70);
    }
    const renderLeftHand = () => {
        drawLine(55, 40, 30, 55);
    }
    const renderRightHand= () => {
        drawLine(55, 40, 80, 55);
    }
    const renderLeftLeg = () => {
        drawLine(55, 70, 25, 100);
    }
    
	const drawLine = (startX, startY, endX, endY) => {
		canvasContext.moveTo(startX, startY);
		canvasContext.lineTo(endX, endY);
		canvasContext.stroke();
	};
    const drawCirc = (centerX, centerY, radius, startAngle, endAngle) => {
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, startAngle, endAngle);
        canvasContext.stroke();
	};
	return {
		render,
	};
})();

export default Board;
