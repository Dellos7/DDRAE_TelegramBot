"use strict";
const variables_1 = require("./variables");
class TelegramUtils {
    static myBotUrl() {
        return "https://api.telegram.org/bot" + variables_1.TELEGRAM_API_BOT_TOKEN;
    }
    static sendMessageUrl() {
        return this.myBotUrl() + "/sendMessage";
    }
    static truncateTextAndAppend(text, append) {
        return text.substring(0, 4000).concat(append);
    }
}
exports.TelegramUtils = TelegramUtils;
