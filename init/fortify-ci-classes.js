var ci = require("cla/ci");

ci.createRole("Fortify");

ci.createClass("FortifyInstance", {
    form: "/plugin/cla-fortify-plugin/form/fortify-instance.js",
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    roles: ["Fortify", "ClariveSE"],
    has: {
        url: {
            is: "rw",
            isa: "Str",
            required: true
        },
        api_url: {
            is: "rw",
            isa: "Str",
            required: true
        },
        key: {
            is: "rw",
            isa: "Str",
            required: true
        },
        secret: {
            is: "rw",
            isa: "Str",
            required: true
        },
        fod_uploader_path: {
            is: "rw",
            isa: "Str",
            required: true
        }
    }
});

ci.createClass("FortifyMobileFramework", {
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    roles: ["Fortify", "ClariveSE"]
});

ci.createClass("FortifyMobilePlatform", {
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    roles: ["Fortify", "ClariveSE"]
});

ci.createClass("FortifyEntitlement", {
    form: "/plugin/cla-fortify-plugin/form/fortify-entitlement.js",
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    roles: ["Fortify", "ClariveSE"],
    has: {
        scan_type: {
            is: "rw",
            isa: "Str",
            required: true
        },
        entitlement_name: {
            is: "rw",
            isa: "Str",
            required: true
        }
    }
});

ci.createClass("FortifyTimezone", {
    form: "/plugin/cla-fortify-plugin/form/fortify-timezone.js",
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    roles: ["Fortify", "ClariveSE"],
    has: {
        timezone_name: {
            is: "rw",
            isa: "Str",
            required: true
        },
        timezone_code: {
            is: "rw",
            isa: "Str",
            required: true
        }
    }
});
