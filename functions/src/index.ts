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

bot.on('message', (ctx: {
    telegram: { sendCopy: (arg0: any, arg1: any) => any; };
    chat: { id: any; }; message: any;
}) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message))


exports.echoBot = functions.https.onRequest(async (request: { body: any; }, response: { sendStatus: (arg0: number) => any; }) => {
    functions.logger.log('Incoming message', request.body)
    return await bot.handleUpdate(request.body, response).then((rv: any) => {
        // if it's not a request from the telegram, rv will be undefined, but we should respond with 200
        return !rv && response.sendStatus(200)
    })
})  
