const { Client, LocalAuth } = require('whatsapp-web.js')

const qrcode = require('qrcode-terminal')

const client = new Client()

client.on('qr', (qr)=>{
    qrcode.generate(qr, { small : true })
})

client.on('ready', ()=>{
    console.log('Client is ready !')
})

client.on('authenticated', ()=>{
    console.log('Client is authenticated !')
})

client.on('disconnected', ()=>{
    console.log('Client is disconnected !')
    client.initialize()
})

client.on('message', async (message)=>{
    const { 
        body,
         _data : {
              id : {
                    remote
                }
            } 
        } = message
    console.log(message)
    switch(body.toLowerCase()) {
        case '.ping' : 
            if (!message.author) {
                await client.sendMessage(remote, 'pong')
            }
        break
        case '.help' : 
            if (!message.author) {
                const mssg = `Whatsapp bot help list :
                .ping => pong
                .help => show u list of commands`
                await client.sendMessage(remote, mssg)
            }
        break
    }
})

client.initialize()