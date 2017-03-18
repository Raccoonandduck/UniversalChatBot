const async = require('async');

async function Handle(api, msg) {
    if (msg.message == '!time') {
        var now = new Date();
        var datetime = "Текущее время: " + now.getDate() + "/"
                + (now.getMonth()+1)  + "/" 
                + now.getFullYear() + " @ "  
                + now.getHours() + ":"  
                + now.getMinutes() + ":" 
                + now.getSeconds();

        await api.call('messages.send', {
            chat_id: 1,
            message: datetime
        }).catch(error => {
            console.log(error);
        });
        return true;
    }

    return false;
}

module.exports = Handle;