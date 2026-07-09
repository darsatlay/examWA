import { Link, useNavigate } from "react-router-dom";

import { logout } from "../api/auth";

export default function Navbar({

    user,

    setUser

}) {

    const navigate = useNavigate();

    async function handleLogout() {

        try {

            await logout();

            setUser(null);

            navigate("/", { replace: true });

            window.location.reload();

        }
        catch (err) {

            console.error(err);

        }

    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >

                    ⚓ Battleship

                </Link>

                <button

                    className="navbar-toggler"

                    type="button"

                    data-bs-toggle="collapse"

                    data-bs-target="#navbar"

                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/"
                            >

                                Home

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/new-game"
                            >

                                New Game

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/tournament"
                            >

                                Tournament

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/statistics"
                            >

                                Statistics

                            </Link>

                        </li>

                        {

                            user &&

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/history"
                                >

                                    My Games

                                </Link>

                            </li>

                        }

                    </ul>

                    {

                        user ?

                            <div className="d-flex align-items-center">

                                <span className="navbar-text text-light me-3">

                                    👤 {user.username}

                                </span>

                                <button

                                    className="btn btn-outline-light"

                                    onClick={handleLogout}

                                >

                                    Logout

                                </button>

                            </div>

                            :

                            <div className="d-flex">

                                <Link

                                    className="btn btn-outline-light me-2"

                                    to="/login"

                                >

                                    Login

                                </Link>

                                <Link

                                    className="btn btn-primary"

                                    to="/register"

                                >

                                    Register

                                </Link>

                            </div>

                    }

                </div>

            </div>

        </nav>

    );

}