import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getMatches } from "../api/games";

export default function HistoryPage() {

    const [games, setGames] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadGames() {

            try {

                const data = await getMatches();

                setGames(data);

            }
            catch (err) {

                console.error(err);

            }
            finally {

                setLoading(false);

            }

        }

        loadGames();

    }, []);

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border" />

            </div>

        );

    }

    return (

        <div>

            <h2 className="mb-4">

                My Games

            </h2>

            {

                games.length === 0 ?

                    <div className="alert alert-info">

                        No games played yet.

                    </div>

                    :

                    <table className="table table-hover table-striped">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Difficulty</th>

                                <th>Mode</th>

                                <th>Result</th>

                                <th>Started</th>

                                <th></th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                games.map(game => (

                                    <tr key={game.id}>

                                        <td>{game.id}</td>

                                        <td>{game.difficulty}</td>

                                        <td>{game.game_mode}</td>

                                        <td>{game.result ?? "In progress"}</td>

                                        <td>{game.started_at}</td>

                                        <td>

                                            <Link

                                                className="btn btn-sm btn-primary"

                                                to={`/game/${game.id}`}

                                            >

                                                Open

                                            </Link>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

            }

        </div>

    );

}