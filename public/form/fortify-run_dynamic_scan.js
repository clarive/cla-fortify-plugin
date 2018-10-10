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
        data: [
            [
                "Dynamic+ Webservices Assessment - SingleScan",
                "Dynamic+ Webservices Assessment - SingleScan"
            ],
            [
                "Dynamic+ Website Assessment - Subscription",
                "Dynamic+ Website Assessment - Subscription"
            ],
            [
                "Dynamic+ Website Assessment - SingleScan",
                "Dynamic+ Website Assessment - SingleScan"
            ],
            [
                "Dynamic Website Assessment - Subscription",
                "Dynamic Website Assessment - Subscription"
            ],
            [
                "Dynamic Website Assessment - SingleScan",
                "Dynamic Website Assessment - SingleScan"
            ]
        ],
        value: params.data.entitlement,
        allowBlank: false,
        singleMode: true
    });

    var interval = Cla.ui.numberField({
        name: "interval",
        fieldLabel: _("Polling Interval (0 if no polling)"),
        value: params.data.interval || 0,
        allowBlank: false
    });

    return [instance, applicationId, releaseName, entitlement, interval];
});
