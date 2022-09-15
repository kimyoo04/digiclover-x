import styled from "styled-components";
import {useRef, useEffect} from "react";

const Canvas = styled.canvas`
  max-width: 400px;
  background-color: white;
  border-radius: 20px;
  box-shadow: $box-shadow-2;
  margin-bottom: 20px;
`;

const CanvasItem = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  return (
    <Canvas
      onMouseMove={onMove}
      onMouseDown={startPainting}
      onMouseUp={cancelPainting}
      onMouseLeave={cancelPainting}
      style={{width: "70vw"}}
      ref={canvasRef}
      {...props}
    />
  );
};

export default CanvasItem;
