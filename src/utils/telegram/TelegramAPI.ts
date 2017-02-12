import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { TelegramUtils } from './TelegramUtils';
import { TelegramMessage } from './model/TelegramMessage';

export class TelegramAPI {

    public static sendMessage( message: TelegramMessage, callbackSuccess: any, callbackError: any ) {
        let config: AxiosRequestConfig = {
            url: TelegramUtils.sendMessageUrl(),
            method: 'post',
            data: {
                chat_id: message.chatId,
                text: message.text,
                parse_mode: message.parseMode
            }
        };

        let axiosInstance: AxiosInstance = axios.create();
        axiosInstance.request( config )
        .then( (response: AxiosResponse) => {
            callbackSuccess(response);
        })
        .catch( (error: AxiosError) => {
            callbackError(error);
        });

    }

}