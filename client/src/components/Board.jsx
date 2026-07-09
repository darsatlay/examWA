import React, { Fragment } from "react";
import "./Board.css";

import Cell from "./Cell";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Board({

    game,

    onFire,

    disabled = false

}) {

    const size = game.match.grid_size;

    return (

        <div className="board-wrapper">

            <div
                className="board"
                style={{
                    gridTemplateColumns: `40px repeat(${size}, 50px)`
                }}
            >

                {/* Big letters */}

                <div></div>

                {

                    [...Array(size)].map((_, col) => (

                        <div
                            key={`header-${col}`}
                            className="board-header"
                        >

                            {LETTERS[col]}

                        </div>

                    ))

                }

                {/* Field */}

                {

                    [...Array(size)].map((_, row) => (

                        <Fragment key={row}>

                            {/* Row Number */}

                            <div className="board-header">

                                {row + 1}

                            </div>

                            {

                                [...Array(size)].map((_, col) => {

                                    const shot = game.shots.find(

                                        s =>

                                            s.row === row &&

                                            s.col === col

                                    );

                                    let ship = null;

                                    if (game.ships && game.ships.length > 0) {

                                        ship = game.ships.find(s => {

                                            if (s.orientation === "H") {

                                                return (

                                                    row === s.start_row &&

                                                    col >= s.start_col &&

                                                    col < s.start_col + s.size

                                                );

                                            }

                                            return (

                                                col === s.start_col &&

                                                row >= s.start_row &&

                                                row < s.start_row + s.size

                                            );

                                        });

                                    }

                                    return (

                                        <Cell

                                            key={`${row}-${col}`}

                                            shot={shot}

                                            ship={ship}

                                            disabled={disabled}

                                            onClick={() =>
                                                onFire(row, col)
                                            }

                                        />

                                    );

                                })

                            }

                        </Fragment>

                    ))

                }

            </div>

        </div>

    );

}