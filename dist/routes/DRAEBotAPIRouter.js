"use strict";
const express_1 = require("express");
const _ = require("underscore");
//import axios from 'axios';
const TelegramAPI_1 = require("../utils/telegram/TelegramAPI");
const TelegramMessage_1 = require("../utils/telegram/model/TelegramMessage");
const TelegramUtils_1 = require("../utils/telegram/TelegramUtils");
const DRAEApi_1 = require("../utils/drae/DRAEApi");
const DRAEUtils_1 = require("../utils/drae/DRAEUtils");
const variables_1 = require("../utils/telegram/variables");
class DRAEBotAPIRouter {
    /**
     * Initialize the DRAEBotAPIRouter
     */
    constructor() {
        /**
         * POST a new message
         */
        this.searchWordDefinition = (req, res, next) => {
            var self = this;
            const { message } = req.body;
            if (_.isEmpty(message)) {
                res.end();
            }
            else {
                let responseMessage = new TelegramMessage_1.TelegramMessage();
                responseMessage.chatId = message.chat.id;
                responseMessage.parseMode = 'HTML';
                let word = message.text;
                DRAEApi_1.DRAEApi.searchWord(word, (searchRes) => {
                    let wordId = searchRes.data.res[0].id;
                    DRAEApi_1.DRAEApi.fetchWord(wordId, (fetchRes) => {
                        console.log(fetchRes.data);
                        let responseMessageText = DRAEUtils_1.DRAEUtils.parseHtmlResponse(fetchRes.data);
                        if (responseMessageText.length >= variables_1.MAX_RESPONSE_MESSAGE_LENGTH) {
                            let appendAnchor = '...\n<pre></pre><a href="http://dle.rae.es/?id=' + wordId + '">Ver definición completa</a>';
                            responseMessageText = TelegramUtils_1.TelegramUtils.truncateTextAndAppend(responseMessageText, appendAnchor);
                        }
                        console.log(responseMessageText);
                        responseMessage.text = responseMessageText;
                        self.sendResponseToTelegram(responseMessage, res);
                    }, (fetchError) => {
                        console.log('fetch error');
                        console.log(fetchError);
                        responseMessage.text = 'Error al buscar la definición de la palabra <strong>' + word + '</strong>.';
                        self.sendResponseToTelegram(responseMessage, res);
                        res.end('Error: ' + fetchError);
                    });
                    res.end();
                }, (searchError) => {
                    console.log('search error');
                    responseMessage.text = 'No se ha encontrado la palabra <strong>' + word + '</strong> en el diccionario.';
                    self.sendResponseToTelegram(responseMessage, res);
                    res.end('Error: ' + searchError);
                });
            }
        };
        this.sendResponseToTelegram = (responseMessage, res) => {
            TelegramAPI_1.TelegramAPI.sendMessage(responseMessage, (response) => {
                console.log('ok');
                res.end('ok');
            }, (error) => {
                console.log('bad');
                console.log(error);
                res.end('Error: ' + error);
            });
        };
        this.router = express_1.Router();
        this.init();
    }
    /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
    init() {
        this.router.post('/', this.searchWordDefinition);
    }
}
exports.DRAEBotAPIRouter = DRAEBotAPIRouter;
const draeBotAPIRoutes = new DRAEBotAPIRouter();
draeBotAPIRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = draeBotAPIRoutes.router;
