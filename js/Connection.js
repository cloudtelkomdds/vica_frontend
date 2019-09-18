class Connection {
    baseConnection = new BaseConnection();

    signInWithGoogle(email, callback) {
        let data = {
            "email": email
        };
        this.baseConnection.signInWithGoogle(data, callback);
    }

    getLocations(callback) {
        if (Storage.isExist(Storage.KEY_LOCATIONS)) {
            callback(Storage.get(Storage.KEY_LOCATIONS));
        } else {
            this.baseConnection.getLocations(cacheToStorage);
        }

        function cacheToStorage(response) {
            let data = response["data"];
            Storage.save(Storage.KEY_LOCATIONS, data);
            callback(data);
        }
    }

    getAllPbxRequests(callback) {
        if (Storage.isExist(Storage.KEY_ALL_PBX_REQUESTS)) {
            callback(Storage.get(Storage.KEY_ALL_PBX_REQUESTS));
        } else {
            this.baseConnection.getAllPbxRequests(cacheToStorage);
        }

        function cacheToStorage(response) {
            let data = response["data"];
            Storage.save(Storage.KEY_ALL_PBX_REQUESTS, data);
            callback(data);
        }
    }

    createPbxRequest(name, location, extension, callback) {
        let data = {
            "name": name,
            "location": location,
            "extension": extension
        };
        this.baseConnection.createPbxRequest(data, callback);
    }

    deletePbxRequest(pbxRequestId, callback) {
        let data = {
            "pbx_request_id": pbxRequestId
        };
        this.baseConnection.deletePbxRequest(data, callback);
    }

    approvePbxRequest(pbxRequestId, callback) {
        let data = {
            "pbx_request_id": pbxRequestId
        };
        this.baseConnection.approvePbxRequest(data, callback);
    }

    getAllPbxs(callback) {
        if (Storage.isExist(Storage.KEY_ALL_PBXS)) {
            callback(Storage.get(Storage.KEY_ALL_PBXS));
        } else {
            this.baseConnection.getAllPbxs(cacheToStorage);
        }

        function cacheToStorage(response) {
            let data = response["data"];
            Storage.save(Storage.KEY_ALL_PBXS, data);
            callback(data);
        }
    }

    deletePbx(pbxId, callback) {
        let data = {
            "pbx_id": pbxId
        };
        this.baseConnection.deletePbx(data, callback);
    }
}