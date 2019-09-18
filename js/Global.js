let connection = new Connection();

export function getConnection() {
    return connection;
}

export function moveWindowTo(address) {
    window.location.href = address;
}

export function logout() {
    Storage.deleteAll();
    moveWindowTo("index.html");
}
