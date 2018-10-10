(function(params) {
    var instance = Cla.ui.ciCombo({
        name: "instance",
        class: "FortifyInstance",
        fieldLabel: _("Instance"),
        value: params.data.instance || "",
        allowBlank: false,
        with_vars: 1
    });

    var authType = Cla.ui.comboBox({
        name: "auth_type",
        fieldLabel: _("Authorization type"),
        data: [["client", "Client API"], ["password", "User/Password"]],
        value: params.data.auth_type || "client",
        allowBlank: false,
        singleMode: true
    });

    return [
        instance,
        authType,
        Cla.ui.textField({
            name: "user",
            fieldLabel: _("User"),
            allowBlank: true,
            value: params.data.user
        }),
        Cla.ui.textField({
            name: "password",
            fieldLabel: _("Password"),
            inputType: "password",
            allowBlank: true,
            value: params.data.password
        })
    ];
});
