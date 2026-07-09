import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../api/auth";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {

            setError("Passwords do not match");

            return;

        }

        try {

            await register({

                username,

                password

            });

            navigate("/login");

        }
        catch (err) {

            setError(err.message);

        }

    }

    return (

        <div className="row justify-content-center">

            <div className="col-md-5">

                <div className="card shadow">

                    <div className="card-header">

                        Register

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label">

                                    Username

                                </label>

                                <input

                                    className="form-control"

                                    value={username}

                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }

                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Password

                                </label>

                                <input

                                    type="password"

                                    className="form-control"

                                    value={password}

                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }

                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Confirm password

                                </label>

                                <input

                                    type="password"

                                    className="form-control"

                                    value={confirmPassword}

                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
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

                                className="btn btn-success w-100"

                            >

                                Register

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}