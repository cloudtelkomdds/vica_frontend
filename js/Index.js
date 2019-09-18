let connection = new Connection();

function displayLoginResult(response) {
    console.log(response);
    if (!response["status"]) {
        alert(response["message"]);
    } else {
        let data = response["data"];
        if (data["is_admin"]) {
            Storage.save(Storage.KEY_USER_TYPE, Storage.USER_TYPE_ADMIN);
        } else {
            Storage.save(Storage.KEY_USER_TYPE, Storage.USER_TYPE_NONADMIN);
        }
        Storage.save(Storage.KEY_USER_NAME, data["name"]);
        Storage.save(Storage.KEY_USER_TOKEN, data["token"]);
        window.location.href = "file:///Users/ysyesa/Documents/telkom/cloudpbx-telkom-frontend/pbxs.html";
    }
}

$(document).ready(function () {
    $("#id-google-login").click(function (){
        let email = "23519019@std.stei.itb.ac.id";
        connection.signInWithGoogle(email, displayLoginResult)
    });

    $("#id-facebook-login").click(function (){
        let email = "13515088@std.stei.itb.ac.id";
        connection.signInWithGoogle(email, displayLoginResult)
    });
});