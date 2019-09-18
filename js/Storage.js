class Storage {
    static KEY_ALL_PBXS = "all_pbxs";
    static KEY_LOCATIONS = "locations";
    static KEY_ALL_PBX_REQUESTS = "all_pbx_requests";
    static KEY_USER_TYPE = "user_type";
    static KEY_USER_TOKEN = "token";
    static KEY_USER_NAME = "username";

    static USER_TYPE_ADMIN = "admin";
    static USER_TYPE_NONADMIN = "nonadmin";

    static deleteAll() {
        sessionStorage.clear();
    }

    static save(key, value) {
        try {
            value = JSON.stringify(value);
        } finally {
            sessionStorage.setItem(key, value);
        }
    }

    static get(key) {
        let value = sessionStorage.getItem(key);
        try {
            value = JSON.parse(value);
        } finally {
            return value;
        }
    }

    static delete(key) {
        sessionStorage.removeItem(key);
    }

    static isExist(key) {
        return sessionStorage.getItem(key) != null;
    }
}
