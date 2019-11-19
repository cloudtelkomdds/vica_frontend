function displayBasedOnRole() {
    let role = Storage.get(Storage.KEY_USER_TYPE);
    if (role === Storage.USER_TYPE_ADMIN) {
        $("#id-menu-pbx").html("All PBXs");
        $("#id-menu-pbx-requests").html("All PBX Requests");
        $("#id-title-pbx-requests").html("All PBX Requests");
        $("#id-pbx-request-row-user-id").show();
        $("#id-pbx-request-row-user-name").show();
        $("#id-create-new-pbx-request").hide();
    } else {
        $("#id-menu-pbx").html("My PBXs");
        $("#id-menu-pbx-requests").html("My PBX Requests");
        $("#id-title-pbx-requests").html("My PBX Requests");
        $("#id-pbx-requests-row-user-id").hide();
        $("#id-pbx-requests-row-user-name").hide();
        $("#id-create-new-pbx-request").show();
    }

    let greeting = "Selamat datang, " + Storage.get(Storage.KEY_USER_NAME);
    $("#id-username").html(greeting);
}

function displayLocations(data) {
    for (let location of data) {
        let formattedLocation = "<option>" + location["name"] + "</option>";
        $("#id-pbx-request-location").append(formattedLocation);
    }
}

function displayAllPbxRequests(data) {
    hideLoadingSpinner();
    $("#id-total-pbx-requests").html("Total PBX Requests: " + data.length);
    let role = Storage.get(Storage.KEY_USER_TYPE);

    for (let pbxRequest of data) {
        let formattedPbxRequest = "<tr>\n";
        if (role === Storage.USER_TYPE_ADMIN) {
            formattedPbxRequest = formattedPbxRequest +
                "<td>" + pbxRequest["id_user"] + "</td>\n" +
                "<td>" + pbxRequest["user_name"] + "</td>\n";
        }
        formattedPbxRequest = formattedPbxRequest +
            "<td>" + pbxRequest["pbx_request_name"] + "</td>\n" +
            "<td>" + pbxRequest["location"] + "</td>\n" +
            "<td>" + pbxRequest["number_of_extension"] + "</td>\n" +
            "<td>" + pbxRequest["status"] + "</td>\n" +
            "<td>";
        if (role === Storage.USER_TYPE_ADMIN && pbxRequest["status"] === "Waiting For Approval") {
            formattedPbxRequest = formattedPbxRequest +
                "<button id=\"id-approve-pbx-request-" + pbxRequest["id_pbx_request"] + "\" type=\"button\" class=\"btn btn-success\">Approve</button>";
        }
        formattedPbxRequest = formattedPbxRequest +
            "<div id=\"id-spinner-action-pbx-request-" + pbxRequest["id_pbx_request"] + "\" class=\"spinner-border text-primary\" role=\"status\" style=\"display: none;\"></div>" +
            "<img id=\"id-delete-pbx-request-" + pbxRequest["id_pbx_request"] + "\" alt=\"Icon for deleting\" src=\"res/ic_trash.png\" style=\"width: 20px;\">" +
            "</td>\n" +
            "</tr>";
        $("#id-tbody-pbx-requests").append(formattedPbxRequest);
    }

    $("[id^=\"id-approve-pbx-request\"]").click(function (event) {
        let pbxRequestId = event.target.id.split("-")[4];
        approvePbxRequest(pbxRequestId);
    });

    $("[id^=\"id-delete-pbx-request\"]").click(function (event) {
        let pbxRequestId = event.target.id.split("-")[4];
        deletePbxRequest(pbxRequestId);
    });
}

function displayPbxRequestCreation(response) {
    $("#modal-pbx-request").modal("hide");
    $("#id-pbx-request-cancel").show();
    $("#id-pbx-request-submit").show();
    $("#id-pbx-request-name").html("");
    $("#id-spinner-new-pbx-request").hide();
    if (response["status"]) {
        Storage.delete(Storage.KEY_ALL_PBX_REQUESTS);
        $("#id-tbody-pbx-requests").empty();
        showLoadingSpinner();
        Global.getConnection().getAllPbxRequests(displayAllPbxRequests);
    }
    alert(response["message"]);
}

function displayPbxRequestApproval(response) {
    if (response["status"]) {
        Storage.delete(Storage.KEY_ALL_PBX_REQUESTS);
        Storage.delete(Storage.KEY_ALL_PBXS);
        $("#id-tbody-pbx-requests").empty();
        showLoadingSpinner();
        Global.getConnection().getAllPbxRequests(displayAllPbxRequests);
    }
    alert(response["message"]);
}

function displayPbxRequestDeletion(response) {
    if (response["status"]) {
        Storage.delete(Storage.KEY_ALL_PBX_REQUESTS);
        $("#id-tbody-pbx-requests").empty();
        showLoadingSpinner();
        Global.getConnection().getAllPbxRequests(displayAllPbxRequests);
    }
    alert(response["message"]);
}

function showLoadingSpinner() {
    $("#id-spinner-pbx-requests").show();
}

function hideLoadingSpinner() {
    $("#id-spinner-pbx-requests").hide();
}

function createPbxRequest() {
    let name = $("#id-pbx-request-name").val();
    let location = $("#id-pbx-request-location").val();
    let number_of_extension = $("#id-pbx-request-extension").val();
    if (name === "" || location === "" || number_of_extension === "") {
        let message = "Please complete all required fields";
        alert(message);
    } else {
        $("#id-pbx-request-cancel").hide();
        $("#id-pbx-request-submit").hide();
        $("#id-spinner-new-pbx-request").show();
        Global.getConnection().createPbxRequest(name, location, number_of_extension, displayPbxRequestCreation);
    }
}

function approvePbxRequest(pbxRequestId) {
    let message = "Are you sure want to approve the request?";
    let result = confirm(message);
    if (result) {
        $("#id-delete-pbx-request-" + pbxRequestId).hide();
        $("#id-approve-pbx-request-" + pbxRequestId).hide();
        $("#id-spinner-action-pbx-request-" + pbxRequestId).show();
        Global.getConnection().approvePbxRequest(pbxRequestId, displayPbxRequestApproval);
    }
}

function deletePbxRequest(pbxRequestId) {
    let message = "Are you sure want to delete the request?";
    let result = confirm(message);
    if (result) {
        $("#id-delete-pbx-request-" + pbxRequestId).hide();
        $("#id-approve-pbx-request-" + pbxRequestId).hide();
        $("#id-spinner-action-pbx-request-" + pbxRequestId).show();
        Global.getConnection().deletePbxRequest(pbxRequestId, displayPbxRequestDeletion);
    }
}

$(document).ready(function () {
    displayBasedOnRole();
    $("#id-logout").click(function (){ Global.logout(); });
    $("#id-pbx-request-submit").click(function (){ createPbxRequest(); });
    $("#id-tbody-pbx-requests").empty();
    showLoadingSpinner();
    Global.getConnection().getLocations(displayLocations);
    Global.getConnection().getAllPbxRequests(displayAllPbxRequests);
});
