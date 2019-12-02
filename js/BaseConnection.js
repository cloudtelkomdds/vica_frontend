class BaseConnection {
    // URL_BASE = "https://vica-api.telkomku.com/";
    URL_BASE = "http://localhost:5000/";
    URL_SIGN_IN_WITH_GOOGLE = "sign_in_with_google";
    URL_GET_LOCATIONS = "get_locations";
    URL_CREATE_PBX_REQUEST = "create_pbx_request";
    URL_GET_ALL_PBX_REQUESTS = "get_all_pbx_requests";
    URL_DELETE_PBX_REQUEST = "delete_pbx_request";
    URL_APPROVE_PBX_REQUEST = "approve_pbx_request";
    URL_GET_ALL_PBXS = "get_all_pbxs";
    URL_DELETE_PBX = "delete_pbx";
    URL_GET_ALL_EXTENSIONS = "get_all_extensions"
    URL_CREATE_EXTENSION = "create_extension"
    URL_UPDATE_EXTENSION = "update_extension"
    URL_DELETE_EXTENSION = "delete_extension"

    requestPost(url, data, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            beforeSend: function (request) {
                let token = Storage.get(Storage.KEY_USER_TOKEN);
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
        $.ajax({
            url: url,
            type: "GET",
            beforeSend: function (request) {
                let token = Storage.get(Storage.KEY_USER_TOKEN);
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
        let url = this.URL_BASE + this.URL_SIGN_IN_WITH_GOOGLE;
        this.requestPost(url, data, callback);
    }

    getLocations(callback) {
        let url = this.URL_BASE + this.URL_GET_LOCATIONS;
        this.requestGet(url, callback)
    }

    createPbxRequest(data, callback) {
        let url = this.URL_BASE + this.URL_CREATE_PBX_REQUEST;
        this.requestPost(url, data, callback);
    }

    getAllPbxRequests(callback) {
        let url = this.URL_BASE + this.URL_GET_ALL_PBX_REQUESTS;
        this.requestGet(url, callback);
    }

    deletePbxRequest(data, callback) {
        let url = this.URL_BASE + this.URL_DELETE_PBX_REQUEST;
        this.requestPost(url, data, callback);
    }

    approvePbxRequest(data, callback) {
        let url = this.URL_BASE + this.URL_APPROVE_PBX_REQUEST;
        this.requestPost(url, data, callback);
    }

    getAllPbxs(callback) {
        let url = this.URL_BASE + this.URL_GET_ALL_PBXS;
        this.requestGet(url, callback);
    }

    deletePbx(data, callback) {
        let url = this.URL_BASE + this.URL_DELETE_PBX;
        this.requestPost(url, data, callback);
    }

    getAllExtensions(data, callback) {
        let url = this.URL_BASE + this.URL_GET_ALL_EXTENSIONS;
        this.requestPost(url, data, callback);
    }

    createExtension(data, callback) {
        let url = this.URL_BASE + this.URL_CREATE_EXTENSION;
        this.requestPost(url, data, callback);
    }

    updateExtension(data, callback) {
        let url = this.URL_BASE + this.URL_UPDATE_EXTENSION;
        this.requestPost(url, data, callback);
    }

    deleteExtension(data, callback) {
        let url = this.URL_BASE + this.URL_DELETE_EXTENSION;
        this.requestPost(url, data, callback);
    }
}