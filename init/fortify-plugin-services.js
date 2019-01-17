var reg = require("cla/reg");

reg.beforeEvent("event.clarive.started", function() {
    console.log("Interceptando evento before online");
});

reg.beforeEvent("event.clarive.started", function() {
    var utils = require("fortifyUtils");

    console.log("Starting Fortify Plugin initialization");

    utils.checkVariables(
        [
            {name: "fortify_application_id"},
            {name: "fortify_scantypes_available", var_type: "array", variables: {'*':["Static","Dynamic","Mobile"]} }
        ]
    );
    utils.checkTimezones();
    utils.checkEntitlements();

    console.log("Finished Fortify Plugin initialization");
});

reg.register("event.fortify.paused_scan", {
    text: _("FoD analysis is paused"),
    name: _("FoD analysis is paused"),
    description: _("FoD analysis is paused and needs manual intervention"),
    vars: ["scan_id"]
});

reg.register("service.fortify.get_token", {
    name: _("Get fortify OAuth token"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-get_token.js",
    rulebook: {
        moniker: "fortify_get_token",
        description: _("Gets a OAuth token to access fortify API"),
        required: ["instance"],
        allow: ["instance"],
        examples: [
            {
                fortify_get_token: {
                    instance: "eu_fortify"
                }
            }
        ]
    },

    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        return utils.getAuthToken(config);
    }
});

reg.register("service.fortify.get_projects", {
    name: _("Get the list of projects created in Fortify"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-get_projects.js",
    rulebook: {
        moniker: "fortify_get_projects",
        description: _("Gets the list of projects available in Fortify"),
        required: ["instance"],
        allow: ["instance", "token"],
        examples: [
            {
                fortify_get_projects: {
                    instance: "eu_fortify",
                    token: "fasdafasdfasdfasdfreqet433twgafsdzxchgt345wqsdf"
                }
            }
        ]
    },

    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        var projects = utils.getProjects(config);

        return projects;
    }
});

reg.register("service.fortify.get_scans", {
    name: _("Get the list of scans"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-get_scans.js",
    rulebook: {
        moniker: "fortify_get_scans",
        description: _("Gets the list of scans available in Fortify"),
        required: ["instance"],
        allow: ["instance", "token"],
        examples: [
            {
                fortify_get_scans: {
                    instance: "eu_fortify",
                    token: "fasdafasdfasdfasdfreqet433twgafsdzxchgt345wqsdf"
                }
            }
        ]
    },
    // {
    //   "applicationId": 24978,
    //   "applicationName": "Eservices",
    //   "releaseId": 32278,
    //   "releaseName": "QA",
    //   "scanId": 53850,
    //   "scanTypeId": 1,
    //   "scanType": "Static",
    //   "assessmentTypeId": 118,
    //   "assessmentTypeName": "Static+ Assessment",
    //   "analysisStatusTypeId": 2,
    //   "analysisStatusType": "Completed",
    //   "startedDateTime": "2018-10-10T00:00:00",
    //   "completedDateTime": "2018-10-11T00:00:00",
    //   "totalIssues": 147,
    //   "issueCountCritical": 0,
    //   "issueCountHigh": 144,
    //   "issueCountMedium": 0,
    //   "issueCountLow": 3,
    //   "starRating": 2,
    //   "notes": "",
    //   "isFalsePositiveChallenge": false,
    //   "isRemediationScan": false,
    //   "entitlementId": 930,
    //   "entitlementUnitsConsumed": 2,
    //   "isSubscriptionEntitlement": false,
    //   "pauseDetails": [],
    //   "cancelReason": null
    // }
    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        var scans = utils.getScans(config);

        return scans;
    }
});

reg.register("service.fortify.get_scan_data", {
    name: _("Get data of a specific scan"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-get_scan_data.js",
    rulebook: {
        moniker: "fortify_get_scan_data",
        description: _("Gets data of a specific scan"),
        required: ["instance", "scan_id"],
        allow: ["instance", "scan_id", "token"],
        examples: [
            {
                fortify_get_scans: {
                    instance: "eu_fortify",
                    scan_id: "923487",
                    token: "fasdafasdfasdfasdfreqet433twgafsdzxchgt345wqsdf"
                }
            }
        ]
    },
    // {
    //   "applicationId": 24978,
    //   "applicationName": "Eservices",
    //   "releaseId": 32278,
    //   "releaseName": "QA",
    //   "scanId": 53850,
    //   "scanTypeId": 1,
    //   "scanType": "Static",
    //   "assessmentTypeId": 118,
    //   "assessmentTypeName": "Static+ Assessment",
    //   "analysisStatusTypeId": 2,
    //   "analysisStatusType": "Completed",
    //   "startedDateTime": "2018-10-10T00:00:00",
    //   "completedDateTime": "2018-10-11T00:00:00",
    //   "totalIssues": 147,
    //   "issueCountCritical": 0,
    //   "issueCountHigh": 144,
    //   "issueCountMedium": 0,
    //   "issueCountLow": 3,
    //   "starRating": 2,
    //   "notes": "",
    //   "isFalsePositiveChallenge": false,
    //   "isRemediationScan": false,
    //   "entitlementId": 930,
    //   "entitlementUnitsConsumed": 2,
    //   "isSubscriptionEntitlement": false,
    //   "pauseDetails": [],
    //   "cancelReason": null
    // }
    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        var scans = utils.getScanData(config);

        return scans;
    }
});

reg.register("service.fortify.generic_call", {
    name: _("Calls any fortify API ws"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-generic_call.js",
    rulebook: {
        moniker: "fortify_generic_call",
        description: _("Calls any API ws of FoD"),
        required: ["instance", "path", "method"],
        allow: ["instance", "token", "path", "method", "params"],
        examples: [
            {
                fortify_generic_call: {
                    instance: "eu_fortify",
                    token: "fasdafasdfasdfasdfreqet433twgafsdzxchgt345wqsdf",
                    path: "/applications",
                    method: "GET",
                    params: { fiter: "xxxx" }
                }
            }
        ]
    },

    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        var request = utils.genericCall(config);

        return request;
    }
});

reg.register("service.fortify.get_bsi_token", {
    name: _("Get bsi token of a given FoD scan"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-get_bsi_token.js",
    rulebook: {
        moniker: "fortify_bet_bsi_token",
        description: _("Get bsi token of a given FoD scan"),
        required: ["instance", "application_id", "release_name"],
        allow: ["instance", "token", "application_id", "release_name"],
        examples: [
            {
                fortify_get_bsi_token: {
                    instance: "eu_fortify",
                    token: "fasdafasdfasdfasdfreqet433twgafsdzxchgt345wqsdf",
                    releaseid: "52453"
                }
            }
        ]
    },

    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        var bsiToken = utils.getBsiToken(config);

        return bsiToken;
    }
});

reg.register("service.fortify.run_static_scan", {
    name: _("Runs a static scan in FoD"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-run_static_scan.js",
    rulebook: {
        moniker: "fortify_run_static_scan",
        description: _("Runs a static scan in FoD"),
        required: [
            "instance",
            "token",
            "src_file",
            "bsi_token",
            "entitlePreference",
            "foduploader_path"
        ],
        allow: [
            "instance",
            "src_file",
            "bsi_token",
            "entitlement",
            "audit",
            "notes",
            "foduploader_path"
        ],
        examples: [
            {
                fortify_run_scan: {
                    instance: "eu_fortify",
                    token: "fasdafasdfasdfasdfreqet433twgafsdzxchgt345wqsdf",
                    src_file: "/opt/clarive/jobs/xxxx/sources.zip",
                    entitlement: "SingleScan",
                    audit: "Manual",
                    notes: "This is my testing scan",
                    bsi_token:
                        "fds13p4oi5y098ygdAFPHI78087r10987fsfGsfdoiutosf",
                    foduploader_path: "/opt/clarive/bin/FodUpload.jar"
                }
            }
        ]
    },

    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        config.type = "static";

        var scanId = utils.runScan(config);

        return scanId;
    }
});

reg.register("service.fortify.run_dynamic_scan", {
    name: _("Runs a dynamic scan in FoD"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-run_dynamic_scan.js",
    rulebook: {
        moniker: "fortify_run_dynamic_scan",
        description: _("Runs a dynamic scan in FoD"),
        required: ["instance", "entitlePreference"],
        allow: ["instance", "token", "entitlement", "audit"],
        examples: [
            {
                fortify_run_scan: {
                    instance: "eu_fortify",
                    token: "fasdafasdfasdfasdfreqet433twgafsdzxchgt345wqsdf",
                    entitlement:
                        "Dynamic+ Webservices Assessment - Single Scan",
                    notes: "This is my testing scan"
                }
            }
        ]
    },

    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        config.type = "dynamic";

        var scanId = utils.runScan(config);

        return scanId;
    }
});

reg.register("service.fortify.run_mobile_scan", {
    name: _("Runs a mobile scan in FoD"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-run_mobile_scan.js",
    rulebook: {
        moniker: "fortify_run_mobile_scan",
        description: _("Runs a mobile scan in FoD"),
        required: ["instance", "token", "path", "release_name"],
        allow: ["instance", "path", "entitlement"],
        examples: [
            {
                fortify_run_mobile_scan: {
                    instance: "eu_fortify",
                    token: "fasdafasdfasdfasdfreqet433twgafsdzxchgt345wqsdf",
                    path: "/opt/clarive/jobs/xxxx/sources.zip",
                    entitlement: "SingleScan"
                }
            }
        ]
    },

    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        config.type = "mobile";

        var scanId = utils.runScan(config);

        return scanId;
    }
});

reg.register("service.fortify.get_vulnerabilities", {
    name: _("Gets the vulnerabilities of a FoD release"),
    icon: "/plugin/cla-fortify-plugin/icon/fortify.svg",
    form: "/plugin/cla-fortify-plugin/form/fortify-get_vulnerabilies.js",
    rulebook: {
        moniker: "fortify_get_vulnerabilities",
        description: _("Gets the vulnerabilities of a FoD release"),
        required: ["instance", "release_name", "application_id"],
        allow: ["instance", "release_name", "application_id"],
        examples: [
            {
                fortify_get_vulnerabilities: {
                    instance: "eu_fortify",
                    release_name: "QA",
                    application_id: "8735"
                }
            }
        ]
    },

    handler: function(ctx, config) {
        var utils = require("fortifyUtils");

        var vulnerabilities = utils.getVulnerabilities(config);

        return vulnerabilities;
    }
});
