var UI = require('ui');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');
var Vector2 = require('vector2');

var shakeCount = 0;
var FIRST_TIME = ' ** 1 ** ';
var SECOND_TIME = ' ** 2 ** ';

var cardContent = {
    title: 'Paper Rock Scissors',
    body: 'Shake your wrist to play!',
    scrollable: false
};

var card = new UI.Card(cardContent);
var window = new UI.Window({fullscreen: true});

var image_paper = new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: 'images/paperi.png'
});
var image_rock = new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: 'images/kivi.png'
});
var image_scissors = new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: 'images/sakset.png'
});
var prevImg = null;


var getImage = function img(img) {
    if (img === 'PAPER') {
        return image_paper;
    } else if (img === 'SCISSORS') {
        return image_scissors;
    } else if (img === 'ROCK') {
        return image_rock;
    } else {
        console.log('ERROR: Unkown result');
    }
};

var showResult = function show(result) {
    var circle = new UI.Circle({
        position: new Vector2(72, 80),
        radius: 62,
        backgroundColor: 'white'
    });
    var text = new UI.Text({
        position: new Vector2(0, 55),
        size: new Vector2(144, 30),
        text: result,
        font: 'bitham-42-bold',
        color: 'black',
        textAlign: 'center'
    });
    if(prevImg){
        window.remove(prevImg);
    }

    if (result === FIRST_TIME || result === SECOND_TIME) {
        window.add(circle);
        window.add(text);
        window.show();
        card.hide();
    } else {
        var img = getImage(result);
        window.add(img);
        window.show();
        prevImg = img;
    }
};

var randomResult = function result() {
    var result = ['PAPER', 'ROCK', 'SCISSORS'];
    var index = Math.floor(Math.random() * 3);

    return result[index];
};

var accelHandler = function handler(event) {

    showResult(randomResult());

    //shakeCount += 1;
    //
    //if (shakeCount === 1) {
    //    showResult(FIRST_TIME);
    //} else if (shakeCount === 2) {
    //    showResult(SECOND_TIME);
    //} else {
    //    shakeCount = 0;
    //    showResult(randomResult());
    //    Vibe.vibrate('short');
    //}
};

card.show();
Accel.init();
Accel.on('tap', accelHandler);