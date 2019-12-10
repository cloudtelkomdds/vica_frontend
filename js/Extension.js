import {GLOBAL} from "./Global.js";
import * as Storage from "./Storage.js"

class Extension {
	constructor(id_pbx) {
		this.storage = new Storage.Storage();
		this.ID_PBX = id_pbx;
		this.ID_UPDATED_EXTENSION = -1;
	}

	maskPassword(password){
		let maskedPassword = "";
		for (let i = 0; i < password.length; i++) {
			maskedPassword = maskedPassword + "*";
		}
		return maskedPassword
	}

	displayAllExtensions(data) {
		let number = 0;
		for (let extension of data) {
			number = number + 1;
			let formattedExtension = "<tr>\n" +
				"<td>" + number + "</td>\n" +
				"<td>" + extension["username"] + "</td>\n" +
				"<td>" + this.maskPassword(extension["secret"]) + "</td>\n" +
				"<td>" +
				"<div id=\"id-spinner-action-extension-" + extension["id_extension"] + "\" class=\"spinner-border text-primary\" role=\"status\" style=\"display: none;\"></div>" +
				"<img id=\"id-delete-extension-" + extension["id_extension"] + "\" alt=\"Icon for deleting\" src=\"res/ic_trash.png\" style=\"width: 20px;\">" +
				"<img id=\"id-click-update-extension-" + extension["id_extension"] + "\" alt=\"Icon for updating\" src=\"res/ic_edit.png\" style=\"width: 20px;\">" +
				"</td>\n" +
				"</tr>";
			$("#id-tbody-extensions").append(formattedExtension);
		}

		let self = this;
		$("[id^=\"id-delete-extension\"]").click(function (event) {
			let idExtension = event.target.id.split("-")[3];
			self.deleteExtension(idExtension);
		});

		$("[id^=\"id-click-update-extension\"]").click(function (event) {
			self.ID_UPDATED_EXTENSION = event.target.id.split("-")[4];
			let selected_extension = data[0];
			for (let extension of data) {
				if (extension["id_extension"] === self.ID_UPDATED_EXTENSION) {
					selected_extension = extension;
				}
			}
			$("#id-update-extension-username").val(selected_extension["username"]);
			$("#id-update-extension-secret").val(selected_extension["secret"]);
			$("#modal-update-pbx-extension").modal("show");
		});
	}

	displayExtensionDeletion(response) {
		if (response["status"]) {
			$("#id-tbody-extensions").empty();
			let self = this;
			GLOBAL.connection.getAllExtensions(this.ID_PBX, function (data) {
				self.displayAllExtensions(data);
			});
		}
		alert(response["message"]);
	}

	deleteExtension(idExtension) {
		let message = "Are you sure want to delete the extension?";
		let result = confirm(message);
		if (result) {
			$("#id-delete-extension-" + idExtension).hide();
			$("#id-click-update-extension-" + idExtension).hide();
			$("#id-spinner-action-extension-" + idExtension).show();
			let self = this;
			GLOBAL.connection.deleteExtension(idExtension, function (data) {
				self.displayExtensionDeletion(data);
			});
		}
	}

	displayExtensionUpdate(response) {
		$("#modal-update-pbx-extension").modal("hide");
		$("#id-update-extension-cancel").show();
		$("#id-update-extension-submit").show();
		$("#id-update-extension-username").html("");
		$("#id-update-extension-secret").html("");
		$("#id-spinner-update-extension").hide();
		if (response["status"]) {
			$("#id-tbody-extensions").empty();
			let self = this;
			GLOBAL.connection.getAllExtensions(this.ID_PBX, function (data) {
				self.displayAllExtensions(data);
			});
		}
		alert(response["message"]);
	}

	updateExtension() {
		let username = $("#id-update-extension-username").val();
		let secret = $("#id-update-extension-secret").val();
		if (username === "" || secret === "") {
			let message = "Please complete all required fields";
			alert(message);
		} else {
			$("#id-update-extension-cancel").hide();
			$("#id-update-extension-submit").hide();
			$("#id-spinner-update-extension").show();
			let self = this;
			GLOBAL.connection.updateExtension(this.ID_UPDATED_EXTENSION, username, secret, function (data) {
				self.displayExtensionUpdate(data);
			});
		}
	}

	displayExtensionCreation(response) {
		$("#id-extension-username").val("");
		$("#id-extension-secret").val("");
		$("#modal-pbx-extension").modal("hide");
		$("#id-new-extension-cancel").show();
		$("#id-new-extension-submit").show();
		$("#id-extension-username").html("");
		$("#id-extension-secret").html("");
		$("#id-spinner-new-extension").hide();
		if (response["status"]) {
			$("#id-tbody-extensions").empty();
			let self = this;
			GLOBAL.connection.getAllExtensions(this.ID_PBX, function (data) {
				self.displayAllExtensions(data);
			});
		}
		alert(response["message"]);
	}

	createNewExtension() {
		let id_pbx = this.ID_PBX;
		let username = $("#id-extension-username").val();
		let secret = $("#id-extension-secret").val();
		if (username === "" || secret === "") {
			let message = "Please complete all required fields";
			alert(message);
		} else {
			$("#id-new-extension-cancel").hide();
			$("#id-new-extension-submit").hide();
			$("#id-spinner-new-extension").show();
			let self = this;
			GLOBAL.connection.createExtension(id_pbx, username, secret, function (data) {
				self.displayExtensionCreation(data);
			});
		}
	}
}

$(document).ready(function () {
	let id_pbx = window.location.search.substr(1).split("=")[1];
	let EXTENSION = new Extension(id_pbx);
    $("#id-new-extension-submit").click(function (){ EXTENSION.createNewExtension(); });
    $("#id-update-extension-submit").click(function (){ EXTENSION.updateExtension(); });
    $("#id-tbody-extensions").empty();
	GLOBAL.connection.getAllExtensions(EXTENSION.ID_PBX, function (data) {
		EXTENSION.displayAllExtensions(data);
	});
});
