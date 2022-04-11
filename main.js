const { Client, MessageMedia } = require('whatsapp-web.js')

const axios = require('axios')

const qrcode = require('qrcode-terminal')

const ORIGIN = 'https://breakingbadapi.com/api'

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

// .getImage cat

client.on('message', async (message)=>{
    const { 
        body,
         _data : {
            id : {
                remote
            }
        },
        author
        } = message
        
    const splitedMessage = body.split('#')

    switch(splitedMessage[0].toLowerCase()) {
        case '.char' : 

            const { data } = await axios({
                method : 'GET',
                url : `${ORIGIN}/characters`
            })

            const char = data[Math.floor(Math.random() * data.length)]

            const b64 = await MessageMedia.fromUrl(char.img, {
                unsafeMime : true
            })

            const media = new MessageMedia('image/jpg', b64.data, 'whatsappbot.jpg')
            
            if (!author) {
                await client.sendMessage(remote, media)
            }
            // group
            // else {
            //     await client.reply(media)
            // }

        break
        case '.sendto' : 
            const m = splitedMessage[1].split(',')
            await client.sendMessage(m[0]+'@c.us', m[1])
        break
    }
})

client.initialize()