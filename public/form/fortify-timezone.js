(function(params) {
    return [
        Cla.ui.textField({
            name: "timezone_name",
            fieldLabel: _("Timezone Name"),
            allowBlank: false
        }),
        Cla.ui.textField({
            name: "timezone_code",
            fieldLabel: _("Timezone Code"),
            allowBlank: false
        })
    ];
});
