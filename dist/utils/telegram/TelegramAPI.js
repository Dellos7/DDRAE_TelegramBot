"use strict";
const axios_1 = require("axios");
const TelegramUtils_1 = require("./TelegramUtils");
class TelegramAPI {
    static sendMessage(message, callbackSuccess, callbackError) {
        let config = {
            url: TelegramUtils_1.TelegramUtils.sendMessageUrl(),
            method: 'post',
            data: {
                chat_id: message.chatId,
                text: message.text,
                parse_mode: message.parseMode
            }
        };
        let axiosInstance = axios_1.default.create();
        axiosInstance.request(config)
            .then((response) => {
            callbackSuccess(response);
        })
            .catch((error) => {
            callbackError(error);
        });
    }
}
exports.TelegramAPI = TelegramAPI;
