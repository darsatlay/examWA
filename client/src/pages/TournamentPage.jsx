import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createTournament,
    joinTournament
} from "../api/tournaments";

export default function TournamentPage() {

    const navigate = useNavigate();

    const [difficulty, setDifficulty] = useState("easy");

    const [code, setCode] = useState("");

    const [createdCode, setCreatedCode] = useState("");

    const [createdMatchId, setCreatedMatchId] = useState(null);

    const [error, setError] = useState("");

    async function handleCreate() {

        setError("");

        try {

            const tournament = await createTournament(difficulty);

            setCreatedCode(tournament.code);

            setCreatedMatchId(tournament.matchId);

        }
        catch (err) {

            setError(err.message);

        }

    }

    async function handleJoin() {

        setError("");

        try {

            const tournament = await joinTournament(code);

            navigate(`/game/${tournament.matchId}`);

        }
        catch (err) {

            setError(err.message);

        }

    }

    return (

        <div className="container">

            <h1 className="mb-4">

                Tournament

            </h1>

            <div className="row">

                {/* CREATE */}

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header">

                            Create Tournament

                        </div>

                        <div className="card-body">

                            <label className="form-label">

                                Difficulty

                            </label>

                            <select

                                className="form-select mb-3"

                                value={difficulty}

                                onChange={(e) =>
                                    setDifficulty(e.target.value)
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

                            <button

                                className="btn btn-success w-100"

                                onClick={handleCreate}

                            >

                                Create Tournament

                            </button>

                            {

                                createdCode &&

                                <div className="alert alert-success mt-4">

                                    <h5>

                                        Tournament Created!

                                    </h5>

                                    <p>

                                        Share this code with other players:

                                    </p>

                                    <h2 className="text-center">

                                        {createdCode}

                                    </h2>

                                    <button

                                        className="btn btn-primary w-100 mt-3"

                                        onClick={() =>
                                            navigator.clipboard.writeText(createdCode)
                                        }

                                    >

                                        Copy Code

                                    </button>

                                    <button

                                        className="btn btn-dark w-100 mt-2"

                                        onClick={() =>
                                            navigate(`/game/${createdMatchId}`)
                                        }

                                    >

                                        Start My Game

                                    </button>

                                </div>

                            }

                        </div>

                    </div>

                </div>

                {/* JOIN */}

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header">

                            Join Tournament

                        </div>

                        <div className="card-body">

                            <label className="form-label">

                                Tournament Code

                            </label>

                            <input

                                className="form-control mb-3"

                                placeholder="Enter code"

                                value={code}

                                onChange={(e) =>
                                    setCode(e.target.value.toUpperCase())
                                }

                            />

                            <button

                                className="btn btn-primary w-100"

                                onClick={handleJoin}

                            >

                                Join Tournament

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {

                error &&

                <div className="alert alert-danger mt-4">

                    {error}

                </div>

            }

        </div>

    );

}