const timeReportHandler = require('./customHandlers/timeReportHandler');

const handlers = [timeReportHandler];

async function handleMessage(api, message) {
    for (let handler of this.handlers) {
        if (await handler(api, message)) {
            return;
        }
    }
}

module.exports = {
    handle: handleMessage,
    handlers: handlers
};