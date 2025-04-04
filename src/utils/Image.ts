import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Canvas, Image} from "fabric";
import {SUPPORTED_TYPES} from "../consts.ts";
import {showToast, Toaststate} from "./Toast.ts";

export const handleImageUploads = (e: ChangeEvent<HTMLInputElement>, canvas: Canvas | null, setToast: Dispatch<SetStateAction<Toaststate>>) => {
    const file = e.target.files?.[0];

    if(!file || !canvas) {
        showToast(setToast, 'Failed to Initialize Image. Please Try again', 'error')
        e.target.value = "";
        return;
    }

    if(!validateImage(file)) {
        showToast(setToast, 'Invalid file type. Please upload a valid image', 'error')
        e.target.value = "";
        return;
    }

    renderImage(file, canvas, setToast);
}

const renderImage = (file: File ,canvas: Canvas, setToast: Dispatch<SetStateAction<Toaststate>>) => {
    const imageReader = new FileReader();
    imageReader.onerror = () => {
        showToast(setToast, 'failed to read Image', 'error')
        return;
    }

    imageReader.onload  = async(e) => {
        const imgSrc = e.target?.result as string;
        const img = await Image.fromURL(imgSrc)
        img.scaleToWidth(200)
        canvas.add(img)
        canvas.renderAll();

        showToast(setToast, 'Image uploaded successfully', 'success');
    }

    imageReader.readAsDataURL(file)
}

const validateImage = (file: File) => {
    if (!SUPPORTED_TYPES.includes(file.type.toLowerCase())) {
        console.log("Unsupported file type");
        return false;
    }
    return true;
}