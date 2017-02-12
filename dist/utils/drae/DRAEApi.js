"use strict";
const axios_1 = require("axios");
const DRAEUtils_1 = require("./DRAEUtils");
const variables_1 = require("./variables");
class DRAEApi {
    static searchWord(word, callbackSuccess, callbackError) {
        let searchUrl = DRAEUtils_1.DRAEUtils.searchUrl();
        let urlParams = '?w=' + word;
        this.callApi(searchUrl, urlParams, callbackSuccess, callbackError);
    }
    static fetchWord(id, callbackSuccess, callbackError) {
        let searchUrl = DRAEUtils_1.DRAEUtils.fetchUrl();
        let urlParams = '?id=' + id;
        this.callApi(searchUrl, urlParams, callbackSuccess, callbackError);
    }
    static callApi(url, urlParams, callbackSuccess, callbackError) {
        let config = {
            url: url + urlParams,
            method: 'get',
            headers: {
                'Authorization': variables_1.AUTHORIZATION_HEADER
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
exports.DRAEApi = DRAEApi;
