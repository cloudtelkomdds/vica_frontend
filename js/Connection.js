class Connection {
    baseConnection = new BaseConnection();

    signInWithGoogle(token, callback) {
        let data = {
            "token": token
        };
        this.baseConnection.signInWithGoogle(data, callback);
    }

    getLocations(callback) {
        if (Storage.isExist(Storage.KEY_LOCATIONS))
            callback(Storage.get(Storage.KEY_LOCATIONS));
        else
            this.baseConnection.getLocations(cacheToStorage);

        function cacheToStorage(response) {
            let data = response["data"];
            Storage.save(Storage.KEY_LOCATIONS, data);
            callback(data);
        }
    }

    getAllPbxRequests(callback) {
        if (Storage.isExist(Storage.KEY_ALL_PBX_REQUESTS))
            callback(Storage.get(Storage.KEY_ALL_PBX_REQUESTS));
        else
            this.baseConnection.getAllPbxRequests(cacheToStorage);

        function cacheToStorage(response) {
            let data = response["data"];
            Storage.save(Storage.KEY_ALL_PBX_REQUESTS, data);
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
        if (Storage.isExist(Storage.KEY_ALL_PBXS))
            callback(Storage.get(Storage.KEY_ALL_PBXS));
        else
            this.baseConnection.getAllPbxs(cacheToStorage);

        function cacheToStorage(response) {
            let data = response["data"];
            var shouldBeCached = true;
            for (var item in data) {
                if (item["vm_address"] == "0.0.0.0")
                    shouldBeCached = false;
            }
            if (shouldBeCached)
                Storage.save(Storage.KEY_ALL_PBXS, data);
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
        }
        this.baseConnection.getAllExtensions(data, noCacheToStorage);

        function noCacheToStorage(response) {
            let data = response["data"];
            callback(data);
        }
    }

    createExtension(idPbx, username, secret, callback) {
        let data = {
            "id_pbx": idPbx,
            "username": username,
            "secret": secret
        }
        this.baseConnection.createExtension(data, callback);
    }

    updateExtension(idExtension, username, secret, callback) {
        let data = {
            "id_extension": idExtension,
            "username": username,
            "secret": secret
        }
        this.baseConnection.updateExtension(data, callback);
    }

    deleteExtension(idExtension, callback) {
        let data = {
            "id_extension": idExtension
        }
        this.baseConnection.deleteExtension(data, callback);
    }
}