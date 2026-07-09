import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/auth";

export default function LoginPage({ setUser }) {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const user = await login({

                username,

                password

            });

            setUser(user);

            navigate("/");

        }

        catch (err) {

            setError(err.message);

        }

    }

    return (

        <div className="row justify-content-center">

            <div className="col-md-5">

                <div className="card">

                    <div className="card-header">

                        Login

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>

                                    Username

                                </label>

                                <input

                                    className="form-control"

                                    value={username}

                                    onChange={(e)=>

                                        setUsername(
                                            e.target.value
                                        )

                                    }

                                />

                            </div>

                            <div className="mb-3">

                                <label>

                                    Password

                                </label>

                                <input

                                    type="password"

                                    className="form-control"

                                    value={password}

                                    onChange={(e)=>

                                        setPassword(
                                            e.target.value
                                        )

                                    }

                                />

                            </div>

                            {

                                error &&

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            }

                            <button
                                className="btn btn-primary w-100"
                            >

                                Login

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}