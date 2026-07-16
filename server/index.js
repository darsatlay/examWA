// External libraries
import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import dotenv from "dotenv";


// Authentication
import passport from "./passport/passport.js";

// Routes
import sessionRoutes from "./routes/sessions.js";
import gamesRouter from "./routes/games.js";
import statisticsRouter from "./routes/statistics.js";
import tournamentsRouter from "./routes/tournaments.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware

app.use(morgan("dev"));

app.use(cors({
    origin: "https://examwa-4.onrender.com/",
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// API Routes


app.use("/api/sessions", sessionRoutes);
app.use("/api/games", gamesRouter);
app.use( "/api/statistics", statisticsRouter);
app.use("/api/tournaments", tournamentsRouter);

// Health check

app.get("/api", (req, res) => {

    res.json({
        message: "Battleship API is running"
    });

});

// 404
app.use((req, res) => {

    res.status(404).json({
        error: "Endpoint not found"
    });

});

// Error handler


app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({
        error: err.message || "Internal server error"
    });

});

// Start server
app.listen(PORT, () => {

    console.log(`Server listening on http://localhost:${PORT}`);

});
