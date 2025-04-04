import {Canvas, Group, Line} from "fabric";
import {BACKGROUND_COLOR} from "../consts.ts";

export const initializeCanvas = (canvasElement: HTMLCanvasElement) => {
    const canvas = new Canvas(canvasElement, {
        width: window.innerWidth,
        height: window.innerHeight
    })

    canvas.backgroundColor = BACKGROUND_COLOR;
    const gridSize = 50;
    const lines: Line[] = []

    for (let x = 0; x <= canvas.getWidth(); x += gridSize) {
        const line = new Line([x, 0, x, canvas.getHeight()], {
            stroke: '#ccc',
            strokeWidth: 1,
            selectable: false,
            evented: false,
        });
        lines.push(line);
    }

    for (let y = 0; y <= canvas.getHeight(); y += gridSize) {
        const line = new Line([0, y, canvas.getWidth(), y], {
            stroke: '#ccc',
            strokeWidth: 1,
            selectable: false,
            evented: false,
        });
        lines.push(line);
    }

    const gridGroup = new Group(lines, {
        selectable: false,
        evented: false,
        excludeFromExport: true,
    });

    canvas.add(gridGroup);
    canvas.sendObjectToBack(gridGroup);

    canvas.renderAll();
    return canvas;
}