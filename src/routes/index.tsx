import { createFileRoute } from '@tanstack/react-router'
import {useEffect, useRef, useState} from "react";
import {Canvas, Rect} from "fabric";
import {CircleChevronUp, ImagePlus, Type} from "lucide-react";

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
        initCanvas.dispose(); // Synchronous call, no Promise
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

  const ImportImages = () => {
    console.log("importImages");
  }

  const OpenTextMenu = () => {
    console.log("Open Text Menu")
  }

  const OpenShapesMenu = () => {
    console.log("Open shapes")
    addRectangle();
  }

  return (
      <div className="text-center font-serif flex items-center justify-start flex-col px-[100px] py-[16px] bg-gray-200 min-h-[100vh] h-full">
        <div className="fixed bottom-1 left-[50%] z-1 ">
          <div className="flex gap-3 border-[1px] border-black p-1 rounded-lg">
            <button onClick={ImportImages}><ImagePlus size={20} /></button>
            <button onClick={OpenTextMenu}><Type size={20} /></button>
            <button onClick={OpenShapesMenu}><CircleChevronUp size={20}/></button>
          </div>
        </div>
        <canvas id="canvas" ref={canvasRef} />
      </div>
  );
}
