(function(params) {
    var instance = Cla.ui.ciCombo({
        name: "instance",
        class: "FortifyInstance",
        fieldLabel: _("Instance"),
        value: params.data.instance || "",
        allowBlank: false,
        with_vars: 1
    });

    var token = Cla.ui.textArea({
        name: "token",
        fieldLabel: _("Token"),
        value: params.data.token || "",
        allowBlank: true
    });

    var method = Cla.ui.comboBox({
        name: "method",
        fieldLabel: _("Method"),
        data: [
            ["GET", "GET"],
            ["PUT", "PUT"],
            ["DELETE", "DELETE"],
            ["POST", "POST"]
        ],
        value: params.data.method || "GET",
        allowBlank: false,
        singleMode: true
    });

    var path = Cla.ui.textField({
        name: "path",
        fieldLabel: _("Fortify API path"),
        value: params.data.path,
        allowBlank: false
    });

    var params = Cla.ui.dataEditor({
        name: "params",
        fieldLabel: _("Form params"),
        title: _("Form params"),
        hide_save: true,
        hide_cancel: true,
        height: 260,
        data: params.data.params || {}
    });

    return [instance, path, method, token, params];
});
