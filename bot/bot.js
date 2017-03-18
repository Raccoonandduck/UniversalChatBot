const VkApi = require('node-vkapi');
const config = require('../config/config');
const fs = require('fs');
const async = require('async');

class Bot {
    async getApi() {
        const authObj = await this.auth();
        this.userId = authObj.userId;
        return new VkApi({ token: authObj.token });
    }

    async auth() {
        if (fs.existsSync(config.path.token))
        {
            return JSON.parse(fs.readFileSync(config.path.token));
        }

        const VK = new VkApi({ auth: config.auth });
        let authObj;
        await VK.auth.user({ 
            scope: config.bot.scope,
            type: 'android' 
        }).then(token => {
            authObj = { 
                userId: token.user_id,
                token: token.access_token 
            };
            fs.writeFileSync(config.path.token, JSON.stringify(authObj));
        });

        return authObj;
    }
}

module.exports = Bot;
