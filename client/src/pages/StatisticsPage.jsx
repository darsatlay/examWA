import { useEffect, useState } from "react";

import { getStatistics } from "../api/statistics";

export default function StatisticsPage() {

    const [statistics, setStatistics] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadStatistics() {

            try {

                const data = await getStatistics();

                setStatistics(data);

            }
            catch (err) {

                console.error(err);

            }
            finally {

                setLoading(false);

            }

        }

        loadStatistics();

    }, []);

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border"/>

            </div>

        );

    }

    return (

        <div>

            <h2 className="mb-4">

                Statistics

            </h2>

            <table className="table table-striped table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>User</th>

                        <th>Difficulty</th>

                        <th>Played</th>

                        <th>Won</th>

                        <th>Lost</th>

                        <th>Win rate</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        statistics.map((row, index) => (

                            <tr key={index}>

                                <td>{row.username}</td>

                                <td>{row.difficulty}</td>

                                <td>{row.played}</td>

                                <td>{row.won}</td>

                                <td>{row.lost}</td>

                                <td>{row.win_rate}%</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}