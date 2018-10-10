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

    var type = Cla.ui.comboBox({
        name: "type",
        fieldLabel: _("Type"),
        data: [
            ["static", "Static"],
            ["dynamic", "Dynamic"],
            ["mobile", "Mobile"]
        ],
        value: params.data.type,
        allowBlank: false,
        singleMode: true
    });

    type.on("addItem", function() {
        var v = type.getValue();

        if (v == "static") {
            staticEntitlement.show();
            dynamicEntitlement.hide();
            mobileEntitlement.hide();
        } else if (v == "dynamic") {
            staticEntitlement.hide();
            dynamicEntitlement.show();
            mobileEntitlement.hide();
        } else {
            staticEntitlement.hide();
            dynamicEntitlement.hide();
            mobileEntitlement.show();
        }
    });

    var staticEntitlement = Cla.ui.comboBox({
        name: "static_entitlement",
        fieldLabel: _("Entitlement Preference"),
        data: [["SingleScan", "Single Scan"], ["Subscription", "Subscription"]],
        value: params.data.static_entitlement || "SingleScan",
        allowBlank: false,
        singleMode: true
    });

    var dynamicEntitlement = Cla.ui.comboBox({
        name: "dynamic_entitlement",
        fieldLabel: _("Entitlement Preference"),
        data: [
            [
                "Dynamic+ Webservices Assessment - Single Scan",
                "Dynamic+ Webservices Assessment - Single Scan"
            ],
            [
                "Dynamic+ Website Assessment - Subscription",
                "Dynamic+ Website Assessment - Subscription"
            ],
            [
                "Dynamic+ Website Assessment - Single Scan",
                "Dynamic+ Website Assessment - Single Scan"
            ],
            [
                "Dynamic Website Assessment - Subscription",
                "Dynamic Website Assessment - Subscription"
            ],
            [
                "Dynamic Website Assessment - Single Scan",
                "Dynamic Website Assessment - Single Scan"
            ]
        ],
        value: params.data.dynamic_entitlement,
        allowBlank: false,
        singleMode: true,
        hidden: true
    });

    var mobileEntitlement = Cla.ui.comboBox({
        name: "mobile_entitlement",
        fieldLabel: _("Entitlement Preference"),
        data: [
            [
                "Mobile+ Assessment - Subscription",
                "Mobile+ Assessment - Subscription"
            ],
            [
                "Mobile+ Assessment - Single Scan",
                "Mobile+ Assessment - Single Scan"
            ],
            [
                "Mobile Assessment - Subscription",
                "Mobile Assessment - Subscription"
            ],
            [
                "Mobile Assessment - Single Scan",
                "Mobile Assessment - Single Scan"
            ]
        ],
        value: params.data.mobile_entitlement,
        allowBlank: false,
        singleMode: true,
        hidden: true
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
        type,
        interval,
        staticEntitlement,
        dynamicEntitlement,
        mobileEntitlement,
        preference,
        audit,
        notes,
        params
    ];
});
