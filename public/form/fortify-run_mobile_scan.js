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
        with_vars: 1,
        singleMode: true
    });

    var frameworkType = Cla.ui.ciCombo({
        name: "framework_type",
        class: "FortifyMobileFramework",
        fieldLabel: _("Framework Type"),
        value: params.data.framework_type,
        allowBlank: false,
        with_vars: 1,
        singleMode: true
    });

    var platformType = Cla.ui.ciCombo({
        name: "platform_type",
        class: "FortifyMobilePlatform",
        fieldLabel: _("Platform Type"),
        value: params.data.platform_type,
        allowBlank: false,
        with_vars: 1,
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
