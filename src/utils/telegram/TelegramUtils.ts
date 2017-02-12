import { TELEGRAM_API_BOT_TOKEN } from './variables';

export class TelegramUtils {

    public static myBotUrl() {
        return "https://api.telegram.org/bot" + TELEGRAM_API_BOT_TOKEN;
    }

    public static sendMessageUrl() {
        return this.myBotUrl() + "/sendMessage";
    }

    public static truncateTextAndAppend( text: string, append: string ) {
        return text.substring( 0, 4000 ).concat( append );
    }

}