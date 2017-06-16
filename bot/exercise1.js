c
onst Raspi = require('raspi-io')
const five = require('johnny-five')
const board = new five.Board({
io: new Raspi()
})

board.on('ready', () => {
let led = new five.Led('P1-19')
led.strobe()
let strobing = true

let button = five.Button('P1-11')
button.on('press', () => {
strobing ? led.stop().off() : led.strobe()
strobing = !strobing
})
});
