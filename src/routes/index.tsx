import { createFileRoute } from '@tanstack/react-router'
import {useEffect, useRef, useState} from "react";
import {Canvas, Rect} from "fabric";

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if(canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width:window.innerWidth,
        height:window.innerHeight
      });

      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas)

      return () => {
        initCanvas.dispose();
        console.log('Canvas disposed');
      };
    }
  }, []);

  const addRectangle = () => {
    if(canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width:100,
        height: 60,
        fill: "#121212",
      })

      canvas.add(rect)
    }
  }
  return (
      <div className="text-center font-serif flex items-center justify-start flex-col px-[100px] py-[16px] bg-gray-200 min-h-[100vh] h-full">
        <div>
          <button onClick={addRectangle}>button</button>
        </div>
        <canvas id="canvas" ref={canvasRef} />
      </div>
  );
}
