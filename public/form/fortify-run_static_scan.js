(function(params) {
    var instance = Cla.ui.ciCombo({
        name: "instance",
        class: "FortifyInstance",
        fieldLabel: _("Instance"),
        value: params.data.instance || "",
        allowBlank: false,
        with_vars: 1
    });

    var applicationId = Cla.ui.textField({
        name: "application_id",
        fieldLabel: _("Application ID"),
        value: params.data.application_id || "",
        allowBlank: false
    });

    var releaseName = Cla.ui.textField({
        name: "release_name",
        fieldLabel: _("Release Name"),
        value: params.data.release_name || "",
        allowBlank: false
    });

    var entitlement = Cla.ui.comboBox({
        name: "entitlement",
        fieldLabel: _("Entitlement Preference"),
        data: [["SingleScan", "Single Scan"], ["Subscription", "Subscription"]],
        value: params.data.entitlement || "SingleScan",
        allowBlank: false,
        singleMode: true
    });

    var audit = Cla.ui.comboBox({
        name: "audit",
        fieldLabel: _("Audit Preference"),
        data: [["Manual", "Manual"], ["Automated", "Automated"]],
        value: params.data.audit || "Automated",
        allowBlank: false,
        singleMode: true
    });

    var preference = Cla.ui.comboBox({
        name: "preference",
        fieldLabel: _("Preference"),
        data: [["Standard", "Standard"], ["Express", "Express"]],
        value: params.data.preference || "Express",
        allowBlank: false,
        singleMode: true
    });

    var notes = Cla.ui.textArea({
        name: "notes",
        fieldLabel: _("Notes"),
        value: params.data.notes || "",
        allowBlank: true
    });

    var path = Cla.ui.textField({
        name: "path",
        fieldLabel: _("Sources Zip File Path"),
        value: params.data.path,
        allowBlank: false
    });

    var interval = Cla.ui.textField({
        name: "interval",
        fieldLabel: _("Polling Interval (0 if no polling)"),
        value: params.data.interval || 0,
        allowBlank: false
    });

    var params = Cla.ui.dataEditor({
        name: "params",
        fieldLabel: _("Aditional Parameters (Static only)"),
        title: _("Form params"),
        hide_save: true,
        hide_cancel: true,
        height: 260,
        data: params.data.params || {}
    });

    return [
        instance,
        applicationId,
        releaseName,
        path,
        interval,
        entitlement,
        preference,
        audit,
        notes,
        params
    ];
});
