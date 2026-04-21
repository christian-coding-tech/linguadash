const express = require('express');
const db = require('./config/mqtt');

const app = express();
app.use(express.json());

// MQTT Listener
mqttClient.on('message', (topic, message) => {
    const data = JSON.parse(message.toString());

    if (topic === 'game/score/update') {
        const { user, points } = data;
        
        db.query(
            "UPDATE users SET xp = xp + ? WHERE username = ?",
            [points, user]
        );
    }
});

// API: Register User
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password],
        (err) => {
            if (err) return res.send(err);
            res.send("User Registered");
        }
    );
});

//API: get word
app.get('/words', (req, res) => {
    db.query("SELECT * FROM words", (err, result) => {
        res.json(result);
    });
});

app .listen(3000, () => {
    console.log("Server running on port 3000");
});