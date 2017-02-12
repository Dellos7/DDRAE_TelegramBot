"use strict";
class TelegramMessage {
    constructor(chatId, text, parseMode) {
        this.chatId = chatId;
        this.text = text;
        this.parseMode = parseMode;
    }
}
exports.TelegramMessage = TelegramMessage;
