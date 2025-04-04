import {Dispatch, SetStateAction} from "react";

export type Toaststate = {message: string, type: 'success' | 'error' | null};

export const showToast = (setToast: Dispatch<SetStateAction<Toaststate>>, message: string, type: 'success' | 'error' | null) => {
    setToast({message, type})
}