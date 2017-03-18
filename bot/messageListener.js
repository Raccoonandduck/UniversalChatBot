const async = require('async');
const prequest = require('request-promise');
const Bot = require('./bot');
const updateProcessor = require('./updateProcessor');

async function longpoll(bot) {
    const api = await bot.getApi();
    async.forever(sendRequest(api, bot.userId));
}

function sendRequest (api, botId) {
  let link = '';
  return next => {
    if (link === '') 
        return api.call('messages.getLongPollServer')
            .then(response => {
                link = `https://${response.server}?act=a_check&key=${response.key}&ts=${response.ts}&wait=25&mode=2&version=1`;
                return next();
            })
            .catch(error => {
                return next();
            });

    return prequest(link, { json: true })
        .then(response => {
            if (response.failed && response.failed !== 1) {
                link = '';
                return next();
            }

            link = link.replace(/ts=.*/, 'ts=' + response.ts);

            if (!response.updates || response.updates.length < 1) {
                return next();
            } 

            updateProcessor(api, botId, response.updates);

            return next();
        }).catch(error => {
            return next();
        });
  }
}

module.exports = {
  start: longpoll
};