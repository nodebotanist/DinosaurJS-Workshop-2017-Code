const Raspi = require('raspi-io')
const five = require('johnny-five')
const request = require('request')
const board = new five.Board({
  io: new Raspi()
})

board.on('ready', () => {
  let led = new five.Led('P1-19')
  let button = five.Button('P1-11')
  let waiting = false

  button.on('press', () => {
    if(!waiting){
      console.log('calling!')
      waiting = true
      request('https://7bmmod4zbg.execute-api.us-east-1.amazonaws.com/prod/dinojs-lambda-dev-hello', (error, response, body)=>{
         console.log('Response body: ', body)
         body = JSON.parse(body)
         console.log('starting strobe for: ', body.numSeconds * 1000, ' milliseconds!')
         led.strobe()
         setTimeout(()=>{ console.log('stopping strobe!'); led.stop().off(); waiting = false }, body.numSeconds * 1000)
       })
    } else {
      console.log('still waiting!')
    }
  })
});
