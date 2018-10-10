(function(params) {
    return [
        Cla.ui.textField({
            name: "url",
            fieldLabel: _("Fortify URL"),
            allowBlank: false
        }),
        Cla.ui.textField({
            name: "api_url",
            fieldLabel: _("Fortify api URL"),
            allowBlank: false
        }),
        Cla.ui.textField({
            name: "key",
            fieldLabel: _("Key"),
            allowBlank: false
        }),
        Cla.ui.textField({
            name: "secret",
            fieldLabel: _("Secret"),
            inputType: "password",
            allowBlank: false
        }),
        Cla.ui.textField({
            name: "fod_uploader_path",
            fieldLabel: _("FoD Uploader Path"),
            allowBlank: false,
            value:
                params.fod_uploader_path ||
                "/opt/clarive/plugins/cla-fortify-plugin/etc/FodUpload.jar"
        })
    ];
});
