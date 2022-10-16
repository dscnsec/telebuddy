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
bot.command('/hacktoberfest', (ctx: { reply: (arg0: string) => any; }) =>
    ctx.reply(`
    <a href="https://user-images.githubusercontent.com/38348296/194700380-35dbaaf9-7610-4b61-8806-bdb6e22dea6a.jpg"></a>
    Hello Guys,
    Hacktoberfest has Started
    
    Wanna get amazing swags right!🌚
    We are hosting New repos these time from GDSC-NSEC, For more info, go thorugh the readme section of the repo🤞🏻
    All these are begineer friendly repo's. From freshman to final year, anyone can contruibute🫂💓
    
    List of Repositories-
    - TeleBuddy- https://github.com/dscnsec/telebuddy
    - Android-Compose-Camp-Trivia-Solutions- https://github.com/dscnsec/Android-Compose-Camp-Trivia-Solutions
    - We will be adding new repositories soon😉.
    
    How to contruibute?
    - Create an issue if you want to add any feature or you get any bug! (You can ask here also, if you are stucked up)
    - We will mark the hacktoberfest label!
    - Start working
    - Make the Pull Request.
    - We will merge it in our repo, after reviewing the code!
    
    Create 4 Pull request, and it should not be duplicate (Be careful). 
    Congratulation's, You are eligible for swags claimation!`)
)


exports.echoBot = functions.https.onRequest(async (request: { body: any; }, response: { sendStatus: (arg0: number) => any; }) => {
    functions.logger.log('Incoming message', request.body)
    return await bot.handleUpdate(request.body, response).then((rv: any) => {
        // if it's not a request from the telegram, rv will be undefined, but we should respond with 200
        return !rv && response.sendStatus(200)
    })
})  
