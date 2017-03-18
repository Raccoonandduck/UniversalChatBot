const messageHandler = require('../handlers/messageHandler');
const async = require('async');

const HTML_ENTITIES = [['&lt;', '<'], ['&gt;', '>'], ['&amp;', '&'], ['&quot;', '"'], ['<br>', '. ']];

function messageAssembler (item) {
  let attachments = item[7] || {};
  let message     = item[6] || '';
  let messageId   = item[1];
  let fwdMessage  = null;

  let mchatSenderId = parseInt(attachments.from);
  let isMultichat   = mchatSenderId && true || false;

  let conversationId = isMultichat ? (item[3] - 2000000000) : item[3];
  let senderId       = isMultichat ? mchatSenderId : conversationId;

  // Decode some HTML entities.
  for (let i = 0, len = HTML_ENTITIES.length; i < len; i++) 
    message = message.replace(new RegExp(HTML_ENTITIES[i][0], 'g'), HTML_ENTITIES[i][1]);

  // Parse forwarded message for personal chats.
  if (isMultichat && attachments.fwd) {
    if (attachments.fwd.includes(':')) {
      // Пересланных сообщений несколько, возвращаем последнее (т.е. самое новое).
      fwdMessage = attachments[`fwd${attachments.fwd.split(':')[0]}`];
    } else {
      // Пересланное сообщение только одно, возвращаем его.
      fwdMessage = attachments[`fwd${attachments.fwd}`];
    }
  }

  return {
    attachments, 
    message, 
    fwd_message: fwdMessage, 
    message_id: messageId, 
    conversation_id: conversationId, 
    sender_id: senderId, 
    is_multichat: isMultichat
  };
}

async function processor (api, botId, data) {
    for (let item of data) {
        if (item[0] === 4) {
            let message = messageAssembler(item);
            console.log(message);
            await messageHandler.handle(api, message);
            continue;
        }
    }
}

module.exports = processor;