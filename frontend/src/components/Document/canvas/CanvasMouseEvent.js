export const startDraw = (ctxRef, setDrawing, setIsDrawn, {nativeEvent}) => {
  const {offsetX, offsetY} = nativeEvent;
  ctxRef.current.beginPath();
  ctxRef.current.moveTo(offsetX, offsetY);
  setDrawing(true);
  setIsDrawn(true);
};

export const draw = (ctxRef, drawing, {nativeEvent}) => {
  if (!drawing) return;
  const {offsetX, offsetY} = nativeEvent;
  ctxRef.current.lineTo(offsetX, offsetY);
  ctxRef.current.stroke();
};

export const stopDraw = (ctxRef, setDrawing) => {
  ctxRef.current.closePath();
  setDrawing(false);
};
