DDRAE Telegram Bot
=================
**D** ellos's **D** iccionario de la **R** eal **A** cademia **E** spañola **Telegram Bot**
[@ddrae_bot](https://telegram.me/ddrae_bot)

A Telegram Bot which allows you to search Spanish word definitions in the official Spanish dictionary ([Diccionario de la Real Academia Española (D.R.A.E)](http://dle.rae.es/?w=diccionario)).

----------

### Table of contents ###
- [Screenshots](#screenshots)
- [How it was built](#how-it-was-built)
    - [Used technologies](#used-technologies)
    - [Create your own DDRAE Telegram Bot](#create-your-own-ddrae-telegram-bot)
        - [Create your own Telegram Bot](#create-your-own-telegram-bot)
        - [Set up your DDRAE server](#set-up-your-ddrae-server)
- [License](#license)

## Screenshots ##

## How it was built ##

### Used technologies ###
 - JavaScript (ES6 -TypeScript).
 - Node.js + Express.js
 - Chai + Mocha - testing.
 - Heroku - production environment server.

### Create your own DDRAE Telegram Bot ###

#### Create your own Telegram Bot ####

Create a new bot through the [BotFather Bot](https://telegram.me/BotFather) ([@BotFather](https://telegram.me/BotFather)).  
More info about Telegram Bots [here](https://core.telegram.org/bots).


#### Set up your DDRAE server ####

1. Clone the repository. 

    In order for your server to be able to start, the following need to be installed in your system:
    - [Node.js](https://nodejs.org/es/)
    - [npm](https://www.npmjs.com/)
    - [gulp](http://gulpjs.com/)
    - [TypeScript](https://www.typescriptlang.org/)
2. Run `npm install` in order to install all the necessary node modules.
3. Set your own Telegram Bot API Token. 

    This token is the one obtained when [creating the Telegram Bot](#create-your-own-telegram-bot).
You must change the variable **TELEGRAM_API_BOT_TOKEN** in `src/utils/telegram/variables.ts`.
4. Run the server.

    Run the server with the command the command `sudo gulp nodemon`. The `sudo` is necessary as we are running the server in the SSL port (443).  
    The Node/Express server uses [gulp](http://gulpjs.com/) in order to watch for **TypeScript (.ts)** file changes and automatically compiling them into **JavaScript (.js) files** which are the ones the server runs. The `src/**` TypeScript files are compiled inside the `dist/` folder.  
    The gulp tasks also restart the server whenever a .ts file is compiled into a .js one. This is done with [gulp-nodemon](https://www.npmjs.com/package/gulp-nodemon).

    See the `gulpfile.js` in order check how gulp tasks work.
    
5. Enable **SSL** in your **local server**.

    In order for Telegram to communicate with your server you need to **enable SSL**. You can do this creating your self-signed SSL certificate using the following command:  
    `openssl req -newkey rsa:2048 -sha256 -nodes -keyout ssl_certs/YOURPRIVATE.key -x509 -days 365 -out ssl_certs/YOURPUBLIC.pem -subj "/C=<country>/ST=<state>/L=<city>/O=<organization>/CN=<server_public_address>"`.\
    Note that you must change the following with your own info:
    - **\<country>**
    - **\<state>**
    - **\<city>**
    - **\<organization>**
    - **\<server_public_address>**: the most important here is this. You must put your public IP address that points to your node server running in your computer. In my case as I didn't have a private domain I put here my public IP address (81.xxx.xx.xxx).

    Your certificates will be stored in the folder `ssl_certs`.

    You should test that your server is publicly accessible via **https**, in a browser like the following: `https://81.xxx.xx.xxx`. Note that it may be necessary to open/redirect ports in your router. 

6. Connect your Telegram Bot with your server.

    The [Telegram Bot API](https://core.telegram.org/bots/api) allows you to connect your server with yout bot with an easy API call. What we are doing is set up a [webhook](https://core.telegram.org/bots/api#setwebhook) that, when someone sends a message to our bot in Telegram, will call our server API. We will make the call using **curl** through the command line:    
    `curl -F "certificate=@ssl_certs/YOURPUBLIC.pem" -F "url=https://<your_server_ip_address>/new-message" "https://api.telegram.org/bot<your_bot_token>/setWebhook"`

    In the above command you need to put your own parameters (`<your_server_ip_address>` and `<your_bot_token>`). Note that we are sending to the API our self-signed certificate in order for Telegram to trust it.  
    If you want to retrieve the info about your webhook, you can perform the following call:  
    `curl https://api.telegram.org/bot<your_bot_token>/getWebhookInfo`  
    If you want to delete your webhook you can perform the following one:  
    `curl https://api.telegram.org/bot<your_bot_token>/deleteWebhook`  

    Each time someone sends a message to our bot, the Telegram API will call our `https://<your_server_ip_address>/new-message` API end-point.

## License ##

[MIT License](https://opensource.org/licenses/MIT)

This was built for learning purposes only. Anyone can clone the repository, learn how it was built and extend it's features.