export function canvas_read_touch(canvasRef, {nativeEvent}) {
  let canvasRect = canvasRef.current.getBoundingClientRect();
  let touch = nativeEvent.touches[0];

  canvasRef.x1 = canvasRef.x2;
  canvasRef.y1 = canvasRef.y2;
  canvasRef.x2 =
    touch.pageX - document.documentElement.scrollLeft - canvasRect.left;
  canvasRef.y2 =
    touch.pageY - document.documentElement.scrollTop - canvasRect.top;
}

export function startTouchDraw(
  canvasRef,
  ctxRef,
  setDrawing,
  setIsDrawn,
  {nativeEvent}
) {
  const body = document.querySelector("body");
  body.style.touchAction = "none";
  canvas_read_touch(canvasRef, {nativeEvent});
  setDrawing(true);
  setIsDrawn(true);
  ctxRef.current.beginPath();
  ctxRef.current.moveTo(canvasRef.x2, canvasRef.y2);
}

export function touchDraw(canvasRef, ctxRef, drawing, {nativeEvent}) {
  canvas_read_touch(canvasRef, {nativeEvent});
  if (
    drawing &&
    (canvasRef.x1 !== canvasRef.x2 || canvasRef.y1 !== canvasRef.y2)
  ) {
    ctxRef.current.lineTo(canvasRef.x2, canvasRef.y2);
    ctxRef.current.stroke();
  }
}

export function stopTouchDraw(ctxRef, setDrawing) {
  ctxRef.current.closePath();
  setDrawing(false);
}

// console.log(canvasRef.x1);
// console.log(canvasRef.y1);
// console.log(
//   `${canvasRef.x2} = ${touch.pageX} - ${document.documentElement.scrollLeft} - ${canvasRect.left}`
// );
// console.log(
//   `${canvasRef.y2} = ${touch.pageY} - ${document.documentElement.scrollTop} - ${canvasRect.top}`
// );
