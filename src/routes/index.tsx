import { createFileRoute } from '@tanstack/react-router'
import {useEffect, useRef, useState} from "react";
import {Canvas, Rect} from "fabric";
import {CircleChevronUp, ImagePlus, Type} from "lucide-react";
import {handleImageUploads} from "../utils/Image.ts";
import {Toaststate} from "../utils/Toast.ts";
import {initializeCanvas} from "../utils/Canvas.ts";

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<Toaststate>({message: '', type: null})

  useEffect(() => {
    if(toast.message) {
      const timer = setTimeout(() => {
        setToast({message: '', type: null})
      })
      return () => clearTimeout(timer)
    }
  }, [toast.message]);

  useEffect(() => {
    if(canvasRef.current) {
      const initCanvas = initializeCanvas(canvasRef.current)
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

  const OpenTextMenu = () => {
    console.log("Open Text Menu")
  }

  const OpenShapesMenu = () => {
    console.log("Open shapes")
    addRectangle();
  }

  return (
      <div className="text-center font-serif flex items-center justify-start flex-col px-[100px] py-[16px] bg-gray-200 min-h-[100vh] h-full">
        {toast.message && (
            <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {toast.message}
            </div>
        )}
        <div className="fixed bottom-1 left-[50%] z-1 ">
          <div className="flex gap-3 border-[1px] border-black p-1 rounded-lg">
            <button onClick={() => fileInputRef.current?.click()}>
              <ImagePlus size={20} />
            </button>
            <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => handleImageUploads(e, canvas, setToast)}
                className="hidden"
            />
            <button onClick={OpenTextMenu}><Type size={20} /></button>
            <button onClick={OpenShapesMenu}><CircleChevronUp size={20}/></button>
          </div>
        </div>
        <canvas id="canvas" ref={canvasRef} />
      </div>
  );
}
