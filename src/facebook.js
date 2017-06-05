import { Client, ProcessIncoming, TextMessage } from 'fb-messenger-es6';
import config from './config';

const facebook = new Client(config.facebook.accessToken);

const handleMessage = message => {
    facebook.sendMessage(new TextMessage('Hi'), message.sender);
}

export default (req, res) => {
    if (req.method === 'GET') {
        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] === config.facebook.verifyToken) {
            return res.status(200).send(req.query['hub.challenge']);
        }
        return res.sendStatus(403);
    }
    else if (req.method === 'POST') {
        // Facebook requires a 200 OK HTTP res as fast as possible
        res.sendStatus(200);

        // NOTE: ProcessIncoming returns messages grouped by PAGE_ID
        const messages = ProcessIncoming(req.body);

        for (const message of messages[config.facebook.pageId]){
            handleMessage(message);
        }
    }
}
