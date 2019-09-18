import { getConnection } from "Global";
import { moveWindowTo } from "Global";

function displayLoginResult(response) {
    let status = response["status"];
    let message = response["message"];
    let data = response["data"];
    if (!status)
        alert(message);
    else {
        let isAdmin = data["is_admin"];
        let name = data["name"];
        let token = data["token"];
        if (isAdmin)
            Storage.save(Storage.KEY_USER_TYPE, Storage.USER_TYPE_ADMIN);
        else
            Storage.save(Storage.KEY_USER_TYPE, Storage.USER_TYPE_NONADMIN);
        Storage.save(Storage.KEY_USER_NAME, name);
        Storage.save(Storage.KEY_USER_TOKEN, token);
        moveWindowTo("pbxs.html");
    }

    $("#id-sign-in").show();
    $("#id-spinner-sign-in").hide();
}

function signInWithGoogle(googleUser) {
    $("#id-sign-in").hide();
    $("#id-spinner-sign-in").show();

    let loginToken = googleUser.getAuthResponse().id_token;
    getConnection().signInWithGoogle(loginToken, displayLoginResult);
    gapi.auth2.getAuthInstance().signOut();
}
