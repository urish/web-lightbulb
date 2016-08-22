'use strict';

let ledCharacteristic = null;

function onConnected() {
    document.querySelector('.connect-button').classList.add('hidden');
    document.querySelector('.color-buttons').classList.remove('hidden');
    document.querySelector('.mic-button').classList.remove('hidden');
}

function connect() {
    console.log('Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice(
        {
            filters: [{ services: [0xffe5] }]
        })
        .then(device => {
            console.log('> Found ' + device.name);
            console.log('Connecting to GATT Server...');
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Getting Service 0xffe5 - Light control...');
            return server.getPrimaryService(0xffe5);
        })
        .then(service => {
            console.log('Getting Characteristic 0xffe9 - Light control...');
            return service.getCharacteristic(0xffe9);
        })
        .then(characteristic => {
            console.log('All ready!');
            ledCharacteristic = characteristic;
            onConnected();
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}

function setColor(red, green, blue) {
    let data = new Uint8Array([0x56, red, green, blue, 0x00, 0xf0, 0xaa]);
    return ledCharacteristic.writeValue(data)
        .catch(err => console.log('Error when writing value! ', err));
}

function red() {
    return setColor(255, 0, 0)
        .then(() => console.log('Color set to Red'));
}

function green() {
    return setColor(0, 255, 0)
        .then(() => console.log('Color set to Green'));
}

function blue() {
    return setColor(0, 0, 255)
        .then(() => console.log('Color set to Blue'));
}

function listen() {
    annyang.start({ continuous: true });
}

// Voice commands
annyang.addCommands({
    'red': red,
    'green': green,
    'blue': blue
});

// Install service worker - for offline support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js');
}
