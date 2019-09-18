class Global {
    static connection = new Connection();

    static getConnection() {
        return Global.connection;
    }

    static moveWindowTo(address) {
        window.location.href = address;
    }

    static logout() {
        Storage.deleteAll();
        Global.moveWindowTo("index.html");
    }
}
