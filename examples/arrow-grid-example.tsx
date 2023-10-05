import React from 'react';
import {useArrowsForGrid} from "../use-arrows-for-grid";

const ArrowGrid = () => {
    const onFocus = () => {
        if (grid.length && x !== undefined && y !== undefined) {
            (grid[x][y] as RefObject<any>)
                .current
                .querySelector("input")
                .focus()
        }
    };
    const width = 10, height = 10

    const {
        grid,
        x,
        y,
        setX,
        setY
    } = useArrowsForGrid(width, height, onFocus);
    
    return (
        <table>
            <tbody>
            {
                Array.from(Array(height)).map((_, i) => (
                    <tr>
                        {
                            Array.from(Array(width)).map((__, j) => (
                                <td
                                    ref={grid[i][j]}
                                    onClick={() => {
                                        setX(i);
                                        setY(j);
                                    }}
                                >
                                    <input/>
                                </td>
                            ))
                        }
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}
export default ArrowGrid;