const axios = require('axios')
const cheerio = require('cheerio')

const URL = "https://www.gazetaesportiva.com/placar-ao-vivo/"

// const fetchData = async(url) => {
//   const result = await axios.get(url)
//   return result.data
// }

const allMatchesToday = async () => {
  const matches = []
  const result = await axios.get(URL)
  const $ = cheerio.load(result.data)
  matchesTodayDiv = $('#jogos-hoje')
  matchesTodayClass = $('.jogosdia')
  matchesTodayClass.each(function(i, e) {
    match = {}
    match.league = $(e).find('.nome_campeonato').text()
    
    teams = $(e).find('.nome_equipe').toArray()
    match.home = $(teams).contents().first().text()
    match.away = $(teams).contents().last().text()
    
    match.date = $(e).find('.data').text()
    match.local = $(e).find('.estadio').text()
    
    score = $(e).find('.placar > .gol').toArray()
    match.homeScore = $(score).contents().first().text()
    match.awayScore = $(score).contents().last().text()

    match.homeFlagUrl = $(e).find('.col-xs-3').find('img').attr('src')
    match.awayFlagUrl = $(e).find('.col-xs-3.brasao.visitante').find('img').attr('src')
    
    matches.push(match)
  })
  return matches
}

module.exports = {
  allMatchesToday
}
