const functions = require('firebase-functions')
const { Telegraf } = require('telegraf')
// console.log(functions.config())
const bot = new Telegraf(functions.config().telegram.token, {
    telegram: { webhookReply: true },
})

bot.catch((err: any, ctx: { reply: (arg0: string, arg1: any) => any; updateType: any }) => {
    functions.logger.error('[Bot] Error', err)
    return ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.command('/start', (ctx: { reply: (arg0: string) => any; }) => ctx.reply('Hello! Send a message and I will copy it.'))
bot.command('/hacktoberfest', (ctx: { replyWithHTML: (arg0: string) => any; }) =>

    ctx.replyWithHTML(`
    <a href="https://user-images.githubusercontent.com/38348296/196018782-09b45064-1197-4ab2-9333-d5b517b6118f.gif"></a>
    🚨🚨Attention Freshies🚨🚨

    Due to huge number of requests by 1st year students, GDSC NSEC has decided to take a session on Git and Github where we will be teaching you from the basics 🥳
    Wait! That's not all!!!
    
    .
    .
    .
    
    We will also be showing how to contribute and participate in one of the largest ongoing Global events of  'Hacktoberfest 2022' ✨. You can grab a cool T-shirt for your contribution in Hacktoberfest 💥.
    That's not it we have got more for you 🌚 everyone will be getting certificate of participation by which you can grab on MAR points.
    
    Share this announcement with all the First year students 💫
    
    When and Where 
    Sunday, 16 October · 6:00 - 8:00pm
    Google Meet joining info
    Video call link: https://meet.google.com/ufc-eypd-ypk
    
    For Queries contact:
    Yash: 7439558508
    Brishti: 98309 39389`)
)


exports.echoBot = functions.https.onRequest(async (request: { body: any; }, response: { sendStatus: (arg0: number) => any; }) => {
    functions.logger.log('Incoming message', request.body)
    return await bot.handleUpdate(request.body, response).then((rv: any) => {
        // if it's not a request from the telegram, rv will be undefined, but we should respond with 200
        return !rv && response.sendStatus(200)
    })
})  
