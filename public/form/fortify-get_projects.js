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

    return [instance, token];
});
