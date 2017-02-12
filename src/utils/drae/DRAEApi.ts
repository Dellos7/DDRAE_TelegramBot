import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { DRAEUtils } from './DRAEUtils';
import { AUTHORIZATION_HEADER } from './variables';

export class DRAEApi {

    public static searchWord( word: string, callbackSuccess: any, callbackError: any ) {
        let searchUrl = DRAEUtils.searchUrl();
        let urlParams: string = '?w=' + word;
        this.callApi( searchUrl, urlParams, callbackSuccess, callbackError );
    }

    public static fetchWord( id: string, callbackSuccess: any, callbackError: any ) {
        let searchUrl = DRAEUtils.fetchUrl();
        let urlParams: string = '?id=' + id;
        this.callApi( searchUrl, urlParams, callbackSuccess, callbackError );
    }

    private static callApi( url: string, urlParams: string, callbackSuccess: any, callbackError: any ) {
        let config: AxiosRequestConfig = {
            url: url + urlParams,
            method: 'get',
            headers: {
                'Authorization': AUTHORIZATION_HEADER
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