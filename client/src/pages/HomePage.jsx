import { Link } from "react-router-dom";

export default function HomePage() {

    return (

        <div className="container">

            <div className="text-center mt-4 mb-5">

                <h1 className="display-3">

                    ⚓ Battleship

                </h1>

                <p className="lead">

                    Sink all enemy ships before you run out of torpedoes!

                </p>

            </div>

            <div className="row g-4">

                <div className="col-md-6">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h3>

                                🎮 New Game

                            </h3>

                            <p>

                                Start a new casual Battleship match.

                            </p>

                            <Link
                                className="btn btn-primary"
                                to="/new-game"
                            >
                                Start
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h3>

                                🏆 Tournament

                            </h3>

                            <p>

                                Create or join a multiplayer tournament.

                            </p>

                            <Link
                                className="btn btn-success"
                                to="/tournament"
                            >
                                Open
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h3>

                                📊 Statistics

                            </h3>

                            <p>

                                View global player statistics.

                            </p>

                            <Link
                                className="btn btn-secondary"
                                to="/statistics"
                            >
                                View
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow h-100">

                        <div className="card-body text-center">

                            <h3>

                                📜 My Games

                            </h3>

                            <p>

                                Browse your previous matches.

                            </p>

                            <Link
                                className="btn btn-warning"
                                to="/history"
                            >
                                Open
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card mt-5 shadow">

                <div className="card-body">

                    <h4>

                        Game Rules

                    </h4>

                    <ul className="mb-0">

                        <li>
                            Destroy all ships before you run out of torpedoes.
                        </li>

                        <li>
                            A miss costs one torpedo.
                        </li>

                        <li>
                            Hits do not consume torpedoes.
                        </li>

                        <li>
                            Ships are placed randomly and never touch each other.
                        </li>

                        <li>
                            Tournament mode allows multiple players to compete on the same board layout.
                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

}