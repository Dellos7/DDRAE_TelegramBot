"use strict";
const express_1 = require("express");
class DRAEBotAPIRouter {
    /**
     * Initialize the DRAEBotAPIRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * POST a new message
     */
    newMessage(req, res, next) {
        let response = {
            'res': 'ok'
        };
        res.send(JSON.stringify(response));
    }
    /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
    init() {
        this.router.post('/', this.newMessage);
    }
}
exports.DRAEBotAPIRouter = DRAEBotAPIRouter;
const draeBotAPIRoutes = new DRAEBotAPIRouter();
draeBotAPIRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = draeBotAPIRoutes.router;
