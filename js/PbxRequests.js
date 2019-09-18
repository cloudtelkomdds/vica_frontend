import { getConnection } from "Global";
import { logout } from "Global";

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

    let greeting = "Hi, " + Storage.get(Storage.KEY_USER_NAME);
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
                "<td>" + pbxRequest["user_id"] + "</td>\n" +
                "<td>" + pbxRequest["user_name"] + "</td>\n";
        }
        formattedPbxRequest = formattedPbxRequest +
            "<td>" + pbxRequest["pbx_request_name"] + "</td>\n" +
            "<td>" + pbxRequest["location"] + "</td>\n" +
            "<td>" + pbxRequest["extension"] + "</td>\n" +
            "<td>" + pbxRequest["status"] + "</td>\n" +
            "<td>";
        if (role === Storage.USER_TYPE_ADMIN && pbxRequest["status"] === "Waiting For Approval") {
            formattedPbxRequest = formattedPbxRequest +
                "<button id=\"id-approve-pbx-request-" + pbxRequest["pbx_request_id"] + "\" type=\"button\" class=\"btn btn-success\">Approve</button>";
        }
        formattedPbxRequest = formattedPbxRequest +
            "<div id=\"id-spinner-action-pbx-request-" + pbxRequest["pbx_request_id"] + "\" class=\"spinner-border text-primary\" role=\"status\" style=\"display: none;\"></div>" +
            "<img id=\"id-delete-pbx-request-" + pbxRequest["pbx_request_id"] + "\" alt=\"Icon for deleting\" src=\"res/ic_trash.png\" style=\"width: 20px;\">" +
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

function logout() {
    Storage.deleteAll();

    window.location.href = "index.html";
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
        getConnection().getAllPbxRequests(displayAllPbxRequests);
    }
    alert(response["message"]);
}

function displayPbxRequestApproval(response) {
    console.log(response);
    if (response["status"]) {
        Storage.delete(Storage.KEY_ALL_PBX_REQUESTS);
        Storage.delete(Storage.KEY_ALL_PBXS);
        $("#id-tbody-pbx-requests").empty();
        showLoadingSpinner();
        getConnection().getAllPbxRequests(displayAllPbxRequests);
    }
    alert(response["message"]);
}

function displayPbxRequestDeletion(response) {
    if (response["status"]) {
        Storage.delete(Storage.KEY_ALL_PBX_REQUESTS);
        $("#id-tbody-pbx-requests").empty();
        showLoadingSpinner();
        getConnection().getAllPbxRequests(displayAllPbxRequests);
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
    let extension = $("#id-pbx-request-extension").val();
    if (name === "" || location === "" || extension === "") {
        let message = "Please complete all required fields";
        alert(message);
    } else {
        $("#id-pbx-request-cancel").hide();
        $("#id-pbx-request-submit").hide();
        $("#id-spinner-new-pbx-request").show();
        getConnection().createPbxRequest(name, location, extension, displayPbxRequestCreation);
    }
}

function approvePbxRequest(pbxRequestId) {
    let message = "Are you sure want to approve the request?";
    let result = confirm(message);
    if (result) {
        $("#id-delete-pbx-request-" + pbxRequestId).hide();
        $("#id-approve-pbx-request-" + pbxRequestId).hide();
        $("#id-spinner-action-pbx-request-" + pbxRequestId).show();
        getConnection().approvePbxRequest(pbxRequestId, displayPbxRequestApproval);
    }
}

function deletePbxRequest(pbxRequestId) {
    let message = "Are you sure want to delete the request?";
    let result = confirm(message);
    if (result) {
        $("#id-delete-pbx-request-" + pbxRequestId).hide();
        $("#id-approve-pbx-request-" + pbxRequestId).hide();
        $("#id-spinner-action-pbx-request-" + pbxRequestId).show();
        getConnection().deletePbxRequest(pbxRequestId, displayPbxRequestDeletion);
    }
}

$(document).ready(function () {
    displayBasedOnRole();
    $("#id-logout").click(function (){ logout(); });
    $("#id-pbx-request-submit").click(function (){ createPbxRequest(); });
    $("#id-tbody-pbx-requests").empty();
    showLoadingSpinner();
    getConnection().getLocations(displayLocations);
    getConnection().getAllPbxRequests(displayAllPbxRequests);
});
