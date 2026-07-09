import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { getCurrentUser } from "./api/auth";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewGamePage from "./pages/NewGamePage";
import GamePage from "./pages/GamePage";
import TournamentPage from "./pages/TournamentPage";
import StatisticsPage from "./pages/StatisticsPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getCurrentUser()

            .then(user => {

                setUser(user);

            })

            .catch(() => {

                setUser(null);

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <div className="spinner-border text-primary"></div>

                <h4 className="mt-3">

                    Loading...

                </h4>

            </div>

        );

    }

    return (

        <>

            <Navbar
                user={user}
                setUser={setUser}
            />

            <div className="container mt-4">

                <Routes>

                    <Route

                        path="/"

                        element={<HomePage />}

                    />

                    <Route

                        path="/login"

                        element={

                            user ?

                                <Navigate to="/" replace />

                                :

                                <LoginPage
                                    setUser={setUser}
                                />

                        }

                    />

                    <Route

                        path="/register"

                        element={

                            user ?

                                <Navigate to="/" replace />

                                :

                                <RegisterPage />

                        }

                    />

                    <Route

                        path="/new-game"

                        element={<NewGamePage />}

                    />

                    <Route

                        path="/game/:id"

                        element={<GamePage />}

                    />

                    <Route

                        path="/tournament"

                        element={<TournamentPage />}

                    />

                    <Route

                        path="/statistics"

                        element={<StatisticsPage />}

                    />

                    <Route

                        path="/history"

                        element={<HistoryPage />}

                    />

                    <Route

                        path="*"

                        element={<Navigate to="/" replace />}

                    />

                </Routes>

            </div>

        </>

    );

}