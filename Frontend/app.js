const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');

client.on('connect', () => {
    console.log("Connectedto MQTT");
});

function answerCorrect() {
    client.publish('game/score/update', JSON.stringify({
        user: "Student123",
        points: 10
    }));
}