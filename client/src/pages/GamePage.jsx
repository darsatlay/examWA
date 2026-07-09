import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Board from "../components/Board";

import { getGame, fire } from "../api/games";

export default function GamePage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [game, setGame] = useState(null);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    async function loadGameData() {

        try {

            const data = await getGame(id);

            setGame(data);

        }
        catch (err) {

            console.error(err);

            alert(err.message);

        }
        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadGameData();

    }, [id]);

    async function handleFire(row, col) {

        try {

            const result = await fire(id, row, col);

            switch (result.result) {

                case "water":
                    setMessage("Miss!");
                    break;

                case "hit":
                    setMessage("Hit!");
                    break;

                case "hit and sunk":
                    setMessage("Ship destroyed!");
                    break;

                default:
                    setMessage(result.result);

            }

            await loadGameData();

        }
        catch (err) {

            alert(err.message);

        }

    }

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary" />

            </div>

        );

    }

    if (!game) {

        return (

            <div className="alert alert-danger">

                Game not found.

            </div>

        );

    }

    return (

        <div className="container">

            <div className="row mb-4">

                <div className="col">

                    <div className="card shadow-sm text-center">

                        <div className="card-body">

                            <h6 className="text-muted">

                                Difficulty

                            </h6>

                            <h4>

                                {game.match.difficulty}

                            </h4>

                        </div>

                    </div>

                </div>

                <div className="col">

                    <div className="card shadow-sm text-center">

                        <div className="card-body">

                            <h6 className="text-muted">

                                Torpedoes

                            </h6>

                            <h4>

                                {game.match.torpedoes_left}

                            </h4>

                        </div>

                    </div>

                </div>

                <div className="col">

                    <div className="card shadow-sm text-center">

                        <div className="card-body">

                            <h6 className="text-muted">

                                Ships

                            </h6>

                            <h4>

                                {game.match.ships_total}

                            </h4>

                        </div>

                    </div>

                </div>

            </div>

            {

                message &&

                <div className="alert alert-info text-center">

                    {message}

                </div>

            }

            {

                game.match.result === "won" &&

                <div className="alert alert-success text-center">

                    <h4>

                        🎉 Congratulations! You won!

                    </h4>

                </div>

            }

            {

                game.match.result === "lost" &&

                <div className="alert alert-danger text-center">

                    <h4>

                        Game Over

                    </h4>

                </div>

            }

            <div className="d-flex justify-content-center mb-4">

                <Board

                    game={game}

                    onFire={handleFire}

                    disabled={

                        game.match.result === "won" ||

                        game.match.result === "lost"

                    }

                />

            </div>

            {

                game.match.finished_at &&

                <div className="text-center">

                    <button

                        className="btn btn-primary me-3"

                        onClick={() => navigate("/new-game")}

                    >

                        New Game

                    </button>

                    <button

                        className="btn btn-secondary"

                        onClick={() => navigate("/")}

                    >

                        Home

                    </button>

                </div>

            }

        </div>

    );

}