import {
  Client,
  MessengerProfile,
  GreetingText,
  PersistentMenu,
  PostbackMenuItem,
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
  .setGetStartedButton('START')
  .addGreetingText(new GreetingText('Hi {{user_first_name}}, I\'m here to help foster your well-being & a sense of belonging at work'))
  .addPersistentMenu(new PersistentMenu([new PostbackMenuItem('Dashboard', 'DASHBOARD')], 'default', true))
);

const handlePayload = (payload, username) => {
  switch (payload) {
    case 'START':
      return new TextMessage('Hi! To best serve you, I need you to take a quiz which I \'ll use to recommend some communities')
        .addQuickReply(new TextQuickReply('Take the quiz!', 'AGE_QUESTION'))
        .addQuickReply(new TextQuickReply('What is this about?', 'ABOUT_WELLINK'));
    case 'AGE_QUESTION':
      return new TextMessage('What age range do you belong to?')
        .addQuickReply(new TextQuickReply('18 - 24 years old', 'GENDER_QUESTION'))
        .addQuickReply(new TextQuickReply('25 - 29 years old', 'GENDER_QUESTION'))
        .addQuickReply(new TextQuickReply('30 - 34 years old', 'GENDER_QUESTION'))
        .addQuickReply(new TextQuickReply('35 years and older', 'GENDER_QUESTION'))
        .addQuickReply(new TextQuickReply('Prefer not to say', 'GENDER_QUESTION'));
    case 'GENDER_QUESTION':
      return new TextMessage('What is your gender?')
        .addQuickReply(new TextQuickReply('Woman', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('Man', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('Transwoman', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('Transman', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('Other', 'FIELD_QUESTION'))
        .addQuickReply(new TextQuickReply('Prefer not to say', 'FIELD_QUESTION'));
    case 'FIELD_QUESTION':
      return new TextMessage('What is your field of work?')
        .addQuickReply(new TextQuickReply('Arts and entertainment', 'EDUCATION_QUESTION'))
        .addQuickReply(new TextQuickReply('Business and accounting', 'EDUCATION_QUESTION'))
        .addQuickReply(new TextQuickReply('Education', 'EDUCATION_QUESTION'))
        .addQuickReply(new TextQuickReply('Health', 'EDUCATION_QUESTION'))
        .addQuickReply(new TextQuickReply('STEM', 'EDUCATION_QUESTION'))
        .addQuickReply(new TextQuickReply('Hospitality', 'EDUCATION_QUESTION'))
        .addQuickReply(new TextQuickReply('Law and Public Policy', 'EDUCATION_QUESTION'))
        .addQuickReply(new TextQuickReply('Other', 'EDUCATION_QUESTION'))
        .addQuickReply(new TextQuickReply('Prefer not to say', 'EDUCATION_QUESTION'));
    case 'EDUCATION_QUESTION':
      return new TextMessage('What is your highest level of education?')
        .addQuickReply(new TextQuickReply('High school diploma', 'CHALLENGE_PRIMARY'))
        .addQuickReply(new TextQuickReply('College diploma', 'CHALLENGE_PRIMARY'))
        .addQuickReply(new TextQuickReply('Bachelor degree', 'CHALLENGE_PRIMARY'))
        .addQuickReply(new TextQuickReply('Master\'s degree', 'CHALLENGE_PRIMARY'))
        .addQuickReply(new TextQuickReply('Doctoral degree', 'CHALLENGE_PRIMARY'));
    case 'CHALLENGE_PRIMARY':
    return new TextMessage('What is the primary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'CHALLENGE_SECONDARY_1'))
      .addQuickReply(new TextQuickReply('Relationships', 'CHALLENGE_SECONDARY_2'))
      .addQuickReply(new TextQuickReply('Support systems', 'CHALLENGE_SECONDARY_3'))
      .addQuickReply(new TextQuickReply('Healthcare', 'CHALLENGE_SECONDARY_4'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'CHALLENGE_SECONDARY_5'))
      .addQuickReply(new TextQuickReply('Career planning', 'CHALLENGE_SECONDARY_6'))
      .addQuickReply(new TextQuickReply('Life at work', 'CHALLENGE_SECONDARY_7'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'CHALLENGE_SECONDARY_8'))
      .addQuickReply(new TextQuickReply('Gender issues', 'CHALLENGE_SECONDARY_9'))
      .addQuickReply(new TextQuickReply('Inequality', 'CHALLENGE_SECONDARY_10'));
    case 'CHALLENGE_SECONDARY_1':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_2':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_3':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_4':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_5':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_6':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_7':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_8':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_9':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Inequality', 'DASHBOARD'));
    case 'CHALLENGE_SECONDARY_10':
    return new TextMessage('What is the secondary challenge that you are faced with right now?')
      .addQuickReply(new TextQuickReply('Finances', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Relationships', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Support systems', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Healthcare', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Overall well-being', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Career planning', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life at work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Life outside of work', 'DASHBOARD'))
      .addQuickReply(new TextQuickReply('Gender issues', 'DASHBOARD'));
    case 'DASHBOARD':
      return [
          new TextMessage('Here are your personalized links:'),
          new GenericTemplate([
              new GenericElement('Away from home')
              .setImageUrl('https://images.unsplash.com/photo-1478809846154-d4ca173df3e0')
              .setButtons([new UrlButton('Open', 'https://yangchoonsuh.wixsite.com/wellink/forum/away-from-home')]),
              new GenericElement('STEM Women')
              .setImageUrl('https://www.usnews.com/cmsmedia/81/0e/009d6c024cfa8c2e8df00d37e226/151021-stem-stock.jpg')
              .setButtons([new UrlButton('Open', 'https://yangchoonsuh.wixsite.com/wellink/forum/women-in-stem')]),
              new GenericElement('Finance')
              .setImageUrl('http://blog.oxforddictionaries.com/wp-content/uploads/money-coins.jpg')
              .setButtons([new UrlButton('Open', 'https://yangchoonsuh.wixsite.com/wellink/forum/finances')]),
            ])
            .addQuickReply(new TextQuickReply('Retake the quiz', 'START'))
      ];
    case 'ABOUT_WELLINK':
    default:
      return new TextMessage(`Sorry ${username} I can\'t do that yet`)
        .addQuickReply(new TextQuickReply('Take the quiz!', 'AGE_QUESTION'));
  }
}

const handleMessage = (message, username) => {
  let replies;
  switch (message.type) {
    case 'message':
      replies = message.quick_reply ? handlePayload(message.quick_reply) : new TextMessage(`Sorry ${username} I can\'t do free text`)
        .addQuickReply(new TextQuickReply('Take the quiz!', 'AGE_QUESTION'))
          .addQuickReply(new TextQuickReply('View Dashboard', 'DASHBOARD'));
      break;
    case 'postback':
      replies = handlePayload(message.payload, username);
      break;
    default:
      handlePayload('', username);
  }
  replies = Array.isArray(replies) ? replies : [replies];
  for (let r = 0; r < replies.length; r++) {
    setTimeout(() => facebook.sendMessage(replies[r], message.sender), r * 60);
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

    const messages = ProcessIncoming(req.body);

    for (const message of messages[config.facebook.pageId]) {
      facebook.getUserProfile(message.sender)
        .then((profile) => {
          handleMessage(message, profile.first_name);
        });
    }
  }
}
