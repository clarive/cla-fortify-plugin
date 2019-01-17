(function(params) {
    return [
        Cla.ui.textField({
            name: "entitlement_name",
            fieldLabel: _("Entitlement Name"),
            allowBlank: false
        }),
        Cla.ui.comboBox({
            name: "scan_type",
            fieldLabel: _("Scan Type"),
            data: [["Static", "Static"], ["Dynamic", "Dynamic"],["Mobile","Mobile"]],
            allowBlank: false,
            singleMode: true
        })
    ];
});
