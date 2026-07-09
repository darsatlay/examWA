import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createGame } from "../api/games";

export default function NewGamePage() {

    const navigate = useNavigate();

    const [difficulty, setDifficulty] = useState("easy");

    async function startGame() {

        try {

            const game = await createGame(
                difficulty
            );

            navigate(
                `/game/${game.id}`
            );

        }

        catch (err) {

            alert(err.message);

        }

    }

    return (

        <div className="row justify-content-center">

            <div className="col-md-5">

                <div className="card">

                    <div className="card-header">

                        New Game

                    </div>

                    <div className="card-body">

                        <div className="mb-3">

                            <label>

                                Difficulty

                            </label>

                            <select

                                className="form-select"

                                value={difficulty}

                                onChange={(e)=>

                                    setDifficulty(
                                        e.target.value
                                    )

                                }

                            >

                                <option value="easy">

                                    Easy

                                </option>

                                <option value="intermediate">

                                    Intermediate

                                </option>

                                <option value="hard">

                                    Hard

                                </option>

                            </select>

                        </div>

                        <button

                            className="btn btn-primary w-100"

                            onClick={startGame}

                        >

                            Start Game

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}