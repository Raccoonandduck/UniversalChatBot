const Bot = require('./bot/bot');
const async = require('async');
const listener = require('./bot/messageListener');

(async function main() {
    listener.start(new Bot());
    // await api.call('messages.send', {
    //     chat_id: 1,
    //     message: 'test message from API'
    // }).catch(error => {
    //     console.log(error);
    // });
})()