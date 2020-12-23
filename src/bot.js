require('dotenv/config')
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN_DEV) // face Oculta Bot
const schedule = require('node-schedule')
const service = require('./services/matchesToday')

async function getMatchesToday() {
  const data = await service.allMatchesToday().then(basicInfo)
  bot.telegram.sendMessage(process.env.CHAT_ID_DEV, data.join('\n'), { parseMode: 'MARKDOWN' })
}

async function basicInfo(response) {
  return response.map((item, index) => `${item.date} - ${item.home} ${item.homeScore} X ${item.awayScore} ${item.away}`)
}

getMatchesToday()