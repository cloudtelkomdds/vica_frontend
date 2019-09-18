function displayBasedOnRole() {
    let role = Storage.get(Storage.KEY_USER_TYPE);
    if (role === Storage.USER_TYPE_ADMIN) {
        $("#id-menu-pbx").html("All PBXs");
        $("#id-menu-pbx-requests").html("All PBX Requests");
        $("#id-title-pbxs").html("All PBXs");
        $("#id-pbx-row-user-id").show();
        $("#id-pbx-row-user-name").show();
    } else {
        $("#id-menu-pbx").html("My PBXs");
        $("#id-menu-pbx-requests").html("My PBX Requests");
        $("#id-title-pbxs").html("My PBXs");
        $("#id-pbx-row-user-id").hide();
        $("#id-pbx-row-user-name").hide();
    }

    let greeting = "Hi, " + Storage.get(Storage.KEY_USER_NAME);
    $("#id-username").html(greeting);
}

function displayAllPbxs(data) {
    hideLoadingSpinner();
    $("#id-total-pbxs").html("Total PBX Containers: " + data.length);

    let role = Storage.get(Storage.KEY_USER_TYPE);
    for (let pbx of data) {
        let formattedPbx = "<tr>\n";
        if (role === Storage.USER_TYPE_ADMIN) {
            formattedPbx = formattedPbx +
                "<td>" + pbx["user_id"] + "</td>\n" +
                "<td>" + pbx["user_name"] + "</td>\n";
        }
        formattedPbx = formattedPbx +
            "<td>" + pbx["pbx_name"] + "</td>\n" +
            "<td>" + pbx["container"] + "</td>\n" +
            "<td>" + pbx["location"] + "</td>\n" +
            "<td>" + pbx["extension"] + "</td>\n" +
            "<td>" + pbx["host_address"] + ":" + pbx["host_port"] + "</td>\n" +
            "<td>" +
            "<div id=\"id-spinner-action-pbx-" + pbx["pbx_id"] + "\" class=\"spinner-border text-primary\" role=\"status\" style=\"display: none;\"></div>" +
            "<img id=\"id-delete-pbx-" + pbx["pbx_id"] + "\" alt=\"Icon for deleting\" src=\"res/ic_trash.png\" style=\"width: 20px;\">" +
            "</td>\n" +
            "</tr>";
        $("#id-tbody-pbxs").append(formattedPbx);
    }

    $("[id^=\"id-delete-pbx-\"]").click(function (event) {
        let pbxId = event.target.id.split("-")[3];
        deletePbx(pbxId);
    });
}

function displayPbxDeletion(response) {
    if (response["status"]) {
        Storage.delete(Storage.KEY_ALL_PBXS);
        $("#id-tbody-pbxs").empty();
        showLoadingSpinner();
        Global.getConnection().getAllPbxs(displayAllPbxs);
    }
    alert(response["message"]);
}

function showLoadingSpinner() {
    $("#id-spinner-pbxs").show();
}

function hideLoadingSpinner() {
    $("#id-spinner-pbxs").hide();
}

function deletePbx(pbxId) {
    let message = "Are you sure want to delete the container?";
    let result = confirm(message);
    if (result) {
        $("#id-delete-pbx-" + pbxId).hide();
        $("#id-spinner-action-pbx-" + pbxId).show();
        Global.getConnection().deletePbx(pbxId, displayPbxDeletion);
    }
}

$(document).ready(function () {
    displayBasedOnRole();
    $("#id-logout").click(function (){ logout(); });
    $("#id-tbody-pbxs").empty();
    showLoadingSpinner();
    Global.getConnection().getAllPbxs(displayAllPbxs);
});
