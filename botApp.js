const Bot = require('./bot/bot');
const async = require('async');
const listener = require('./bot/messageListener');

(async function main() {
    listener.start(new Bot());
})()