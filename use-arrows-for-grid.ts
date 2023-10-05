import { createRef, useEffect, useState } from "react";

export const useArrowsForGrid = (
    width: number, 
    height: number, 
    onUpdateCoordinates: () => void
) => {
    const [grid, setGrid] = useState([]);
    const [x, setX] = useState<number | undefined>(undefined);
    const [y, setY] = useState<number | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            setX(0);
            setY(0);
        }, 500);
        onUpdateCoordinates();
    }, []);

    useEffect(() => {
        if (x === undefined || y === undefined) return;
        const onMove = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                if (x >= width - 1) return;
                setX(x + 1);
            }
            else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (x === 0) return;
                setX(x - 1);
            }
            else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (y === 0) return;
                setY(y - 1)
            }
            else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (y >= height - 1) return;
                setY(y + 1)
            }
        }

        window.addEventListener("keydown", onMove);
        onUpdateCoordinates();
        return () => {
            window.removeEventListener("keydown", onMove);
        }
    }, [x, y, width, height]);
    
    useEffect(() => {
        setGrid((grd) => Array
            .from(Array(width))
            .map((_, i) => grd[i] || Array
                .from(Array(height))
                .map((_, j) => grd[i] ? grd[i][j] : createRef())))
    }, [width, height]);
    
    return { grid, x, y, setX, setY };
}