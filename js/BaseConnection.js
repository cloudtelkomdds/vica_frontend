import * as Constant from "./Constant.js"
import * as Storage from "./Storage.js"

export class BaseConnection {
	constructor() {
		this.storage = new Storage.Storage();
	}

    requestPost(url, data, callback) {
        let self = this;
		$.ajax({
            url: url,
            type: "POST",
            data: data,
            beforeSend: function (request) {
                let token = self.storage.get(Constant.STORAGE_KEY_USER_TOKEN);
                request.setRequestHeader("Authorization", "Bearer " + token);
            }})
            .done(function (response) {
                callback(response);
            })
            .fail(function (error) {
                callback(error);
            })
    }

    requestGet(url, callback) {
		let self = this;
        $.ajax({
            url: url,
            type: "GET",
            beforeSend: function (request) {
                let token = self.storage.get(Constant.STORAGE_KEY_USER_TOKEN);
                request.setRequestHeader("Authorization", "Bearer " + token);
            }})
            .done(function (response) {
                callback(response);
            })
            .fail(function (error) {
                callback(error)
            })
    }

    signInWithGoogle(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_SIGN_IN_WITH_GOOGLE;
        this.requestPost(url, data, callback);
    }

    getLocations(callback) {
        let url = Constant.URL_BASE + Constant.URL_GET_LOCATIONS;
        this.requestGet(url, callback)
    }

    createPbxRequest(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_CREATE_PBX_REQUEST;
        this.requestPost(url, data, callback);
    }

    getAllPbxRequests(callback) {
        let url = Constant.URL_BASE + Constant.URL_GET_ALL_PBX_REQUESTS;
        this.requestGet(url, callback);
    }

    deletePbxRequest(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_DELETE_PBX_REQUEST;
        this.requestPost(url, data, callback);
    }

    approvePbxRequest(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_APPROVE_PBX_REQUEST;
        this.requestPost(url, data, callback);
    }

    getAllPbxs(callback) {
        let url = Constant.URL_BASE + Constant.URL_GET_ALL_PBXS;
        this.requestGet(url, callback);
    }

    deletePbx(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_DELETE_PBX;
        this.requestPost(url, data, callback);
    }

    getAllExtensions(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_GET_ALL_EXTENSIONS;
        this.requestPost(url, data, callback);
    }

    createExtension(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_CREATE_EXTENSION;
        this.requestPost(url, data, callback);
    }

    updateExtension(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_UPDATE_EXTENSION;
        this.requestPost(url, data, callback);
    }

    deleteExtension(data, callback) {
        let url = Constant.URL_BASE + Constant.URL_DELETE_EXTENSION;
        this.requestPost(url, data, callback);
    }
}
