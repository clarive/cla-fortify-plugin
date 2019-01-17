(function(params) {
    var instance = Cla.ui.ciCombo({
        name: "instance",
        class: "FortifyInstance",
        fieldLabel: _("Instance"),
        value: params.data.instance,
        allowBlank: false,
        with_vars: 1
    });

    var applicationId = Cla.ui.textField({
        name: "application_id",
        fieldLabel: _("Application ID"),
        value: params.data.application_id,
        allowBlank: false
    });

    var releaseName = Cla.ui.textField({
        name: "release_name",
        fieldLabel: _("Release Name"),
        value: params.data.release_name,
        allowBlank: false
    });

    var entitlement = Cla.ui.ciCombo({
        name: "entitlement",
        class: "FortifyEntitlement",
        fieldLabel: _("Entitlement Preference"),
        value: params.data.entitlement || "",
        allowBlank: false,
        singleMode: true,
        with_vars: 1
    });

    var timeZone = Cla.ui.ciCombo({
        name: "time_zone",
        class: "FortifyTimezone",
        fieldLabel: _("Timezone"),
        value: params.data.time_zone,
        allowBlank: false,
        with_vars: 1
    });

    var frameworkType = Cla.ui.comboBox({
        name: "framework_type",
        fieldLabel: _("Framework Type"),
        data: [["iOS", "iOS"], ["Android", "Android"], ["Windows", "Windows"]],
        value: params.data.framework_type,
        allowBlank: false,
        singleMode: true
    });

    var platformType = Cla.ui.comboBox({
        name: "platform_type",
        fieldLabel: _("Platform Type"),
        data: [["Phone", "Phone"], ["Tablet", "Tablet"], ["Both", "Both"]],
        value: params.data.platform_type,
        allowBlank: false,
        singleMode: true
    });

    var path = Cla.ui.textField({
        name: "file_path",
        fieldLabel: _("Application file path"),
        value: params.data.file_path,
        allowBlank: false
    });

    var interval = Cla.ui.textField({
        name: "interval",
        fieldLabel: _("Polling Interval (0 if no polling)"),
        value: params.data.interval || 0,
        allowBlank: false
    });

    return [
        instance,
        applicationId,
        releaseName,
        frameworkType,
        platformType,
        path,
        timeZone,
        interval,
        entitlement
    ];
});
