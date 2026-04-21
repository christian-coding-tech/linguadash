const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    client.subscribe('game/score/update');
});

module.exports = client;