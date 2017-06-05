import {
  Client,
  MessengerProfile,
  GreetingText,
  PersistentMenu,
  UrlMenuItem,
  ProcessIncoming,
  TextMessage,
  TextQuickReply,
  GenericTemplate,
  GenericElement,
  UrlButton,
}
from 'fb-messenger-es6';
import config from './config';

const facebook = new Client(config.facebook.accessToken);
facebook.setMessengerProfile(new MessengerProfile()
  .setGetStartedButton('start')
  .addGreetingText(new GreetingText('Hi {{user_first_name}}, I\'m here to help foster your well-being & a sense of belonging at work'))
  .addPersistentMenu(new PersistentMenu([new UrlMenuItem('Dashboard', 'https://yangchoonsuh.wixsite.com/wellink/forum')], 'default', true))
);

const handlePayload = (payload, username) => {
  switch (payload) {
    case 'start':
      return new TextMessage('Hi! To best help you, I need to ask a couple of questions so I can help you out')
        .addQuickReply(new TextQuickReply('Ask away!', 'GENDER_QUESTION'));
    case 'GENDER_QUESTION':
      return new TextMessage('To which gender identity do you most identify?')
        .addQuickReply(new TextQuickReply('Female', 'AGE_QUESTION'))
        .addQuickReply(new TextQuickReply('Male', 'AGE_QUESTION'))
        .addQuickReply(new TextQuickReply('Transwoman', 'AGE_QUESTION'))
        .addQuickReply(new TextQuickReply('Transman', 'AGE_QUESTION'))
        .addQuickReply(new TextQuickReply('Gender Variant', 'AGE_QUESTION'))
        .addQuickReply(new TextQuickReply('Not Listed', 'AGE_QUESTION'))
        .addQuickReply(new TextQuickReply('Prefer Not to Answer', 'AGE_QUESTION'));
    case 'AGE_QUESTION':
      return new TextMessage('Next Question - What age range do you belong to?')
        .addQuickReply(new TextQuickReply('Under 18 years old', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('18 - 24 years old', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('25 - 34 years old', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('35 - 44 years old', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('45 - 54 years old', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('55 - 64 years old', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('65 - 74 years old', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('75 years and older', 'FIELD_QUESTION'));
    case 'FIELD_QUESTION':
        return new TextMessage('What field best categorizes your role at work?')
          .addQuickReply(new TextQuickReply('Natural sciences', 'INTEREST_QUESTION_START'))
          .addQuickReply(new TextQuickReply('Engineering', 'INTEREST_QUESTION_START'))
          .addQuickReply(new TextQuickReply('Arts', 'INTEREST_QUESTION_START'))
          .addQuickReply(new TextQuickReply('Business', 'INTEREST_QUESTION_START'))
          .addQuickReply(new TextQuickReply('Education', 'INTEREST_QUESTION_START'))
          .addQuickReply(new TextQuickReply('Communications', 'INTEREST_QUESTION_START'))
          .addQuickReply(new TextQuickReply('Social sciences', 'INTEREST_QUESTION_START'));
    case 'INTEREST_QUESTION_START':
        return new GenericTemplate([
            new GenericElement('Away from home').setImageUrl('https://images.unsplash.com/photo-1478809846154-d4ca173df3e0').setButtons([new UrlButton('Open', 'https://yangchoonsuh.wixsite.com/wellink/forum/away-from-home')]),
            new GenericElement('STEM Women').setImageUrl('https://www.usnews.com/cmsmedia/81/0e/009d6c024cfa8c2e8df00d37e226/151021-stem-stock.jpg').setButtons([new UrlButton('Open', 'https://yangchoonsuh.wixsite.com/wellink/forum/women-in-stem')]),
            new GenericElement('Finance').setImageUrl('http://blog.oxforddictionaries.com/wp-content/uploads/money-coins.jpg').setButtons([new UrlButton('Open', 'https://yangchoonsuh.wixsite.com/wellink/forum/finances')]),
        ]).addQuickReply(new TextQuickReply('Restart', 'start'));
    case 'LAST_QUESTION':
      return (handlePayload('start', username));
    default:
      return new TextMessage(`Sorry ${username} I can\'t do that yet`)
  }
}

const handleMessage = (message, username) => {
  let replies;
  switch (message.type) {
    case 'message':
      replies = message.quick_reply ? handlePayload(message.quick_reply) : new TextMessage(`Sorry ${username} I can\'t do free text`)
      break;
    case 'postback':
      replies = handlePayload(message.payload, username);
      break;
    default:
      handlePayload('', username);
  }
  replies = Array.isArray(replies) ? replies : [replies];
  for (const reply of replies) {
    facebook.sendMessage(reply, message.sender);
    setTimeout(60);
  }

}

export default (req, res) => {
  if (req.method === 'GET') {
    if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === config.facebook.verifyToken) {
      return res.status(200)
        .send(req.query['hub.challenge']);
    }
    return res.sendStatus(403);
  }
  else if (req.method === 'POST') {
    // Facebook requires a 200 OK HTTP res as fast as possible
    res.sendStatus(200);

    // NOTE: ProcessIncoming returns messages grouped by PAGE_ID
    const messages = ProcessIncoming(req.body);

    for (const message of messages[config.facebook.pageId]) {
      facebook.getUserProfile(message.sender)
        .then((profile) => {
          handleMessage(message, profile.first_name);
        });
    }
  }
}
