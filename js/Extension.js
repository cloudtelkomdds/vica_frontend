ID_PBX = -1
ID_UPDATED_EXTENSION = -1

function displayAllExtensions(data) {
	DATA_EXTENSIONS = data;
	number = 0
    for (let extension of data) {
    	number = number + 1
        let formattedExtension = "<tr>\n" + 
        	"<td>" + number + "</td>\n" +
            "<td>" + extension["username"] + "</td>\n" +
            "<td>" + extension["secret"] + "</td>\n" +
            "<td>" +
            "<div id=\"id-spinner-action-extension-" + extension["id_extension"] + "\" class=\"spinner-border text-primary\" role=\"status\" style=\"display: none;\"></div>" +
            "<img id=\"id-delete-extension-" + extension["id_extension"] + "\" alt=\"Icon for deleting\" src=\"res/ic_trash.png\" style=\"width: 20px;\">" +
            "<img id=\"id-click-update-extension-" + extension["id_extension"] + "\" alt=\"Icon for updating\" src=\"res/ic_edit.png\" style=\"width: 20px;\">" +
            "</td>\n" +
            "</tr>";
        $("#id-tbody-extensions").append(formattedExtension);
    }

    $("[id^=\"id-delete-extension\"]").click(function (event) {
        let idExtension = event.target.id.split("-")[3];
        deleteExtension(idExtension);
    });

    $("[id^=\"id-click-update-extension\"]").click(function (event) {
        ID_UPDATED_EXTENSION = event.target.id.split("-")[4];
        selected_extension = data[0];
        for (let extension of data) {
        	if (extension["id_extension"] == ID_UPDATED_EXTENSION) {
        		selected_extension = extension;
        	}
        }
        $("#id-update-extension-username").val(selected_extension["username"]);
        $("#id-update-extension-secret").val(selected_extension["secret"]);
        $("#modal-update-pbx-extension").modal("show");
    });
}

function displayExtensionDeletion(response) {
    if (response["status"]) {
        $("#id-tbody-extensions").empty();
		Global.getConnection().getAllExtensions(ID_PBX, displayAllExtensions);
    }
    alert(response["message"]);
}

function deleteExtension(idExtension) {
    let message = "Are you sure want to delete the extension?";
    let result = confirm(message);
    if (result) {
        $("#id-delete-extension-" + idExtension).hide();
        $("#id-click-update-extension-" + idExtension).hide();
        $("#id-spinner-action-extension-" + idExtension).show();
        Global.getConnection().deleteExtension(idExtension, displayExtensionDeletion);
    }
}

function displayExtensionUpdate(response) {
    $("#modal-update-pbx-extension").modal("hide");
    $("#id-update-extension-cancel").show();
    $("#id-update-extension-submit").show();
    $("#id-update-extension-username").html("");
    $("#id-update-extension-secret").html("");
    $("#id-spinner-update-extension").hide();
    if (response["status"]) {
        $("#id-tbody-extensions").empty();
        Global.getConnection().getAllExtensions(ID_PBX, displayAllExtensions);
    }
    alert(response["message"]);
}

function updateExtension() {
	let username = $("#id-update-extension-username").val();
	let secret = $("#id-update-extension-secret").val();
    if (username === "" || secret === "") {
        let message = "Please complete all required fields";
        alert(message);
    } else {
        $("#id-update-extension-cancel").hide();
        $("#id-update-extension-submit").hide();
        $("#id-spinner-update-extension").show();
        Global.getConnection().updateExtension(ID_UPDATED_EXTENSION, username, secret, displayExtensionUpdate);
    }
}

function displayExtensionCreation(response) {
    $("#modal-pbx-extension").modal("hide");
    $("#id-new-extension-cancel").show();
    $("#id-new-extension-submit").show();
    $("#id-extension-username").html("");
    $("#id-extension-secret").html("");
    $("#id-spinner-new-extension").hide();
    if (response["status"]) {
        $("#id-tbody-extensions").empty();
        Global.getConnection().getAllExtensions(ID_PBX, displayAllExtensions);
    }
    alert(response["message"]);
}

function createNewExtension() {
	let id_pbx = ID_PBX;
	let username = $("#id-extension-username").val();
	let secret = $("#id-extension-secret").val();
    if (username === "" || secret === "") {
        let message = "Please complete all required fields";
        alert(message);
    } else {
        $("#id-new-extension-cancel").hide();
        $("#id-new-extension-submit").hide();
        $("#id-spinner-new-extension").show();
        Global.getConnection().createExtension(id_pbx, username, secret, displayExtensionCreation);
    }
}

$(document).ready(function () {
    $("#id-new-extension-submit").click(function (){ createNewExtension(); });
    $("#id-update-extension-submit").click(function (){ updateExtension(); });
    $("#id-tbody-extensions").empty();
	ID_PBX = window.location.search.substr(1).split("=")[1];
	Global.getConnection().getAllExtensions(ID_PBX, displayAllExtensions);

    // displayBasedOnRole();
    // $("#id-logout").click(function (){ Global.logout(); });
    // $("#id-pbx-request-submit").click(function (){ createPbxRequest(); });
    // $("#id-tbody-pbx-requests").empty();
    // showLoadingSpinner();
    // Global.getConnection().getLocations(displayLocations);
    // Global.getConnection().getAllPbxRequests(displayAllPbxRequests);
});