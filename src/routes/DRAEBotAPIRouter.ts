import { Router, Request, Response, NextFunction } from 'express';
import * as _ from 'underscore';
//import axios from 'axios';
import { TelegramAPI } from '../utils/telegram/TelegramAPI';
import { TelegramMessage } from '../utils/telegram/model/TelegramMessage';
import { TelegramUtils } from '../utils/telegram/TelegramUtils';
import { DRAEApi } from '../utils/drae/DRAEApi';
import { DRAEUtils } from '../utils/drae/DRAEUtils';
import { MAX_RESPONSE_MESSAGE_LENGTH } from '../utils/telegram/variables';

export class DRAEBotAPIRouter {

    router: Router;

    /**
     * Initialize the DRAEBotAPIRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * POST a new message
     */
    public searchWordDefinition = ( req: Request, res: Response, next: NextFunction ) => {
        var self = this;
        const {message} = req.body;
        if( _.isEmpty(message) ) {
            res.end();
        }
        else {
            let responseMessage: TelegramMessage = new TelegramMessage();
            responseMessage.chatId = message.chat.id;
            responseMessage.parseMode = 'HTML';
            let word = message.text;
            DRAEApi.searchWord( word, 
                (searchRes) => {
                    let wordId = searchRes.data.res[0].id;
                    DRAEApi.fetchWord( wordId,
                        (fetchRes) => {
                            console.log(fetchRes.data);
                            let responseMessageText = DRAEUtils.parseHtmlResponse( fetchRes.data );
                            if( responseMessageText.length >= MAX_RESPONSE_MESSAGE_LENGTH ) {
                                let appendAnchor = '...\n<pre></pre><a href="http://dle.rae.es/?id=' + wordId +'">Ver definición completa</a>'
                                responseMessageText = TelegramUtils.truncateTextAndAppend( responseMessageText, appendAnchor );
                            }
                            console.log(responseMessageText);
                            responseMessage.text = responseMessageText;
                            self.sendResponseToTelegram( responseMessage, res );
                        },
                        (fetchError) => {
                            console.log('fetch error');
                            console.log(fetchError);
                            responseMessage.text = 'Error al buscar la definición de la palabra <strong>' + word + '</strong>.';
                            self.sendResponseToTelegram( responseMessage, res );
                            res.end('Error: ' + fetchError);
                        }
                    );
                    res.end();
                },
                (searchError) => {
                    console.log('search error');
                    responseMessage.text = 'No se ha encontrado la palabra <strong>' + word + '</strong> en el diccionario.';
                    self.sendResponseToTelegram( responseMessage, res );
                    res.end('Error: ' + searchError);
                }
            );

        }
    }

    public sendResponseToTelegram = ( responseMessage: TelegramMessage, res: Response ) => {
        TelegramAPI.sendMessage( responseMessage, 
            (response) => {
                console.log('ok');
                res.end('ok');
            },
            (error) => {
                console.log('bad');
                console.log(error);
                res.end('Error: ' + error);
            }
        );
    }

    /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
      this.router.post( '/', this.searchWordDefinition );
  }

}

const draeBotAPIRoutes = new DRAEBotAPIRouter();
draeBotAPIRoutes.init();

export default draeBotAPIRoutes.router;