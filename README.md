DDRAE Telegram Bot
=================
**D** avid's **D** iccionario de la **R** eal **A** cademia **E** spañola **Telegram Bot**
[@ddrae_bot](https://telegram.me/ddrae_bot)

A Telegram Bot which allows you to search Spanish word definitions in the official Spanish dictionary ([Diccionario de la Real Academia Española (D.R.A.E)](http://dle.rae.es/?w=diccionario)).

----------

## Screenshots ##

## How it was built ##

### Used technologies ###
 - JavaScript (ES6 -TypeScript) as the **programming languages**.
 - Node.js + Express.js as the **server-side technologies**.
 - Chai + Mocha for **unit testing**.
 - Heroku **for **

### Create your own DDRAE Telegram Bot ###

1. Create a new bot through the [BotFather Bot](https://telegram.me/BotFather) ([@BotFather](https://telegram.me/BotFather)).
2. **Clone the repository.** In order for your server to be able to start, the following need to be installed in your system:
	- Node.js
	- npm
	- gulp
	- tsc
3. Run `npm install` in order to install all the necessary node modules. 
4. Set your own Telegram Bot API Token in `src/utils/telegram/variables.ts` (**TELEGRAM_API_BOT_TOKEN**). 
5. Run the server with the command `gulp nodemon` .
6. 

## License ##

[MIT License](https://opensource.org/licenses/MIT)
This was built for learning purposes only. Anyone can clone the repository, learn how it was built and extend it's features.