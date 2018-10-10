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
