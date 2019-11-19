function displayLoginResult(response) {
    console.log(response);
    let status = response["status"];
    let message = response["message"];
    let data = response["data"];
    if (!status)
        alert(message);
    else {
        let isAdmin = data["is_admin"];
        let name = data["name"];
        let token = data["token"];
        Storage.save(Storage.KEY_USER_NAME, name);
        Storage.save(Storage.KEY_USER_TOKEN, token);
        if (isAdmin) {
            Storage.save(Storage.KEY_USER_TYPE, Storage.USER_TYPE_ADMIN);
            Global.moveWindowTo("admin_pbx.html");
        }
        else {
            Storage.save(Storage.KEY_USER_TYPE, Storage.USER_TYPE_NONADMIN);
            Global.moveWindowTo("user_pbx.html");
        }

    }

    $("#id-sign-in").show();
    $("#id-spinner-sign-in").hide();
}

function signInWithGoogle(googleUser) {
    $("#id-sign-in").hide();
    $("#id-spinner-sign-in").show();

    let loginToken = googleUser.getAuthResponse().id_token;
    Global.getConnection().signInWithGoogle(loginToken, displayLoginResult);
    gapi.auth2.getAuthInstance().signOut();
}
