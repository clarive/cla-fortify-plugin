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

    return [
        instance,
        token,
        Cla.ui.textField({
            name: "application_id",
            fieldLabel: _("Application ID"),
            allowBlank: false,
            value: params.data.application_id
        }),
        Cla.ui.textField({
            name: "release_name",
            fieldLabel: _("Release Name"),
            allowBlank: false,
            value: params.data.release_name
        })
    ];
});
