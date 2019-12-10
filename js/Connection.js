// Temporarily, cache is disabled. Please take a look for improvement.
import * as BaseConnection from "./BaseConnection.js"
import * as Constant from "./Constant.js"
import * as Storage from "./Storage.js"

export class Connection {
	constructor() {
		this.baseConnection = new BaseConnection.BaseConnection();
		this.storage = new Storage.Storage();
	}

    signInWithGoogle(token, callback) {
        let data = {
            "token": token
        };
        this.baseConnection.signInWithGoogle(data, callback);
    }

    getLocations(callback) {
        if (this.storage.isExist(Constant.STORAGE_KEY_LOCATIONS))
            callback(this.storage.get(Constant.STORAGE_KEY_LOCATIONS));
        else
            this.baseConnection.getLocations(cacheToStorage);

        function cacheToStorage(response) {
            let data = response["data"];
            // this.storage.save(Constant.STORAGE_KEY_LOCATIONS, data);
            callback(data);
        }
    }

    getAllPbxRequests(callback) {
        if (this.storage.isExist(Constant.STORAGE_KEY_ALL_PBX_REQUESTS))
            callback(this.storage.get(Constant.STORAGE_KEY_ALL_PBX_REQUESTS));
        else
            this.baseConnection.getAllPbxRequests(cacheToStorage);

        function cacheToStorage(response) {
            let data = response["data"];
            // this.storage.save(Constant.STORAGE_KEY_ALL_PBX_REQUESTS, data);
            callback(data);
        }
    }

    createPbxRequest(name, location, number_of_extension, callback) {
        let data = {
            "name": name,
            "location": location,
            "number_of_extension": number_of_extension
        };
        this.baseConnection.createPbxRequest(data, callback);
    }

    deletePbxRequest(pbxRequestId, callback) {
        let data = {
            "id_pbx_request": pbxRequestId
        };
        this.baseConnection.deletePbxRequest(data, callback);
    }

    approvePbxRequest(pbxRequestId, callback) {
        let data = {
            "id_pbx_request": pbxRequestId
        };
        this.baseConnection.approvePbxRequest(data, callback);
    }

    getAllPbxs(callback) {
        if (this.storage.isExist(Constant.STORAGE_KEY_ALL_PBXS))
            callback(this.storage.get(Constant.STORAGE_KEY_ALL_PBXS));
        else
            this.baseConnection.getAllPbxs(cacheToStorage);

        function cacheToStorage(response) {
            let data = response["data"];
            callback(data);
        }
    }

    deletePbx(pbxId, callback) {
        let data = {
            "id_pbx": pbxId
        };
        this.baseConnection.deletePbx(data, callback);
    }

    getAllExtensions(idPbx, callback) {
        let data = {
            "id_pbx": idPbx
        };
        this.baseConnection.getAllExtensions(data, noCacheToStorage);

        function noCacheToStorage(response) {
            let data = response["data"];
            callback(data);
        }
    }

    createExtension(idPbx, username, secret, name_assignee, email_assignee, callback) {
        let data = {
            "id_pbx": idPbx,
            "username": username,
            "secret": secret,
			"name_assignee": name_assignee,
			"email_assignee": email_assignee
        };
        this.baseConnection.createExtension(data, callback);
    }

    updateExtension(idExtension, username, secret, callback) {
        let data = {
            "id_extension": idExtension,
            "username": username,
            "secret": secret
        };
        this.baseConnection.updateExtension(data, callback);
    }

    deleteExtension(idExtension, callback) {
        let data = {
            "id_extension": idExtension
        };
        this.baseConnection.deleteExtension(data, callback);
    }
}
