require('dotenv/config')
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN_DEV) // face Oculta Bot
const schedule = require('node-schedule')

message = ['vamos la']
bot.telegram.sendMessage(process.env.CHAT_ID_DEV, message, { parseMode: 'MARKDOWN' })