exports.getProjects = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    config.path = "/applications";
    config.method = "GET";

    var response = utils.genericCall(config);

    var projects = response.content.items;

    return projects;
};

exports.getScans = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    if (config.application_id) {
        config.path = "/applications/" + config.application_id + "/scans";
    } else if (config.release_name) {
        var release_id = utils.getReleaseId(config);

        config.path = "/releases/" + releaseId + "/scans/" + scanId;
    } else {
        config.path = "/scans";
    }
    config.method = "GET";

    var response = utils.genericCall(config);

    var scans = response.content.items
        ? response.content.items
        : [response.content];

    return scans;
};

exports.getScanData = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    config.path = "/scans";
    config.method = "GET";

    var scans = utils.getScans(config);
    var scanData;

    for (var i = scans.length - 1; i >= 0; i--) {
        if (scans[i].scanId == config.scan_id) {
            scanData = scans[i];
            break;
        }
    }

    if (!scanData) {
        log.fatal("Scan " + config.scan_id + " not found");
    }

    return scanData;
};

exports.getInstance = function(mid) {
    var ci = require("cla/ci");
    var log = require("cla/log");

    var fortifyInstance = ci.findOne({
        mid: mid + ""
    });

    if (!fortifyInstance) {
        log.fatal("Fortify instance " + mid + "doesn't exist");
    }

    return fortifyInstance;
};

exports.getAuthToken = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    var fortifyInstance = utils.getInstance(config.instance);
    var authType = config.auth_type || "client";

    var BASE_URL = fortifyInstance.url;

    var authUrl = BASE_URL + "/oauth/token";

    var agent = web.agent();
    var form;

    if (authType == "client") {
        form = {
            scope: "api-tenant",
            grant_type: "client_credentials",
            client_id: fortifyInstance.key,
            client_secret: fortifyInstance.secret
        };
    } else {
        form = {
            scope: "api-tenant",
            grant_type: "password",
            username: config.user,
            password: config.password
        };
    }

    var executeAuth = agent.postForm(authUrl, form);

    if (executeAuth.status != "200") {
        message = "Error (" + executeAuth.status + "): " + executeAuth.reason;
        log.fatal(message);
    }

    var authToken = executeAuth.content.access_token;

    return authToken;
};

exports.genericCall = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    var fortifyInstance =
        utils.getInstance(config.instance) || config.fortifyInstance;

    var BASE_URL = fortifyInstance.api_url;

    var url = BASE_URL + config.path;

    var token = config.token || utils.getAuthToken(config);

    var headers = {
        Authorization: "Bearer " + token
    };

    var agent = web.agent( {verify_SSL: 0, log_request_cb: function(request) {
            console.log(request);
        }
    });
    var options = "{}";


    var requestOptions = {};

    if (config.params) {
        if (config.method == "GET") {
            var params = agent.urlEncode(config.params);
            url = url + "?" + params;
        } else {
            if (config.octet_stream) {

                var params = agent.urlEncode(config.params);
                url = url + "?" + params;

                headers["Content-Type"] = "application/octet-stream";

                options = config.body;
                requestOptions.encoding = "raw";
            } else {
                headers["Content-Type"] = "application/json";
                headers["Accept"] = "application/json";

                options = JSON.stringify(config.params);
            }
        }
    }

    requestOptions.headers= headers;
    requestOptions.content =  options;

    var response = agent.request(config.method, url, requestOptions );

    if (
        response.status != "200" &&
        response.status != "201" &&
        response.status != "202"
    ) {
        console.log(response);
        message = "Error (" + response.status + "): " + response.reason;
        log.fatal(message);
    }

    return response;
};

exports.checkVariables = function(variables) {
    var utils = require("fortifyUtils");

    variables.forEach(function(variable) {
        utils.findOrCreateVariable(variable);
    });
};

exports.findOrCreateVariable = function(variable) {
    const ci = require("cla/ci");

    var myCI = ci.findOneCi("variable", { name: variable.name });

    if (myCI) {
        console.log(
            "Variable " + variable.name + " already exists.  Skipped creation"
        );
    } else {
        try {
            var varCI = ci.build("variable", variable );
            varCI.save();
            console.log("Variable " + variable.name + " created");
        } catch (err) {
            console.error(
                "Error creating CI variable " + variable.name + ": " + err
            );
        }
    }
};

exports.checkTimezones = function() {
    var utils = require("fortifyUtils");
    const ci = require("cla/ci");

    var config = {};

    config.instance = ci.findOne("FortifyInstance", { active: 1 });

    if (config.instance) {
        config.instance = config.instance.mid;

        var timeZones = utils.getTimeZones(config);

        timeZones.forEach(function(timezone) {
            utils.findOrCreateTimezone(timezone);
        });
    } else {
        console.log(_("No active Fortify instance found"));
    }
};

exports.findOrCreateTimezone = function(Timezone) {
    const ci = require("cla/ci");

    var myCI = ci.findOne("FortifyTimezone", {timezone_name: Timezone.text});

    if (myCI) {
        console.log(
            "Timezone " + Timezone.text + " already exists.  Skipped creation"
        );
    } else {
        try {
            var tzCI = ci.build("FortifyTimezone", { name: Timezone.text, timezone_name: Timezone.text, timezone_code: Timezone.value });
            tzCI.save();
            console.log("Timezone " + Timezone.text + " created");
        } catch (err) {
            console.error(
                "Error creating CI Timezone " + Timezone.text + ": " + err
            );
        }
    }
};

exports.getTimeZones = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    config.path = "/lookup-items";
    config.method = "GET";
    config.params = { type: 'TimeZones' };

    var response = utils.genericCall(config);

    var timeZones = response.content.items;

    return timeZones;
};

exports.getReleases = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    config.path = "/applications/" + config.application_id + "/releases";
    config.method = "GET";

    var response = utils.genericCall(config);

    var releases = response.content.items;

    return releases;
};

exports.getAssesmentTypes = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    config.path = "/releases/" + config.release_id + "/assessment-types";
    config.method = "GET";
    config.params = { scanType: config.type };

    var response = utils.genericCall(config);

    var types = response.content.items;

    return types;
};

exports.runScan = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var reg = require("cla/reg");
    var util = require("cla/util");
    var utils = require("fortifyUtils");

    var scanId;

    config.fortifyInstance = utils.getInstance(config.instance);

    if (config.type == "static") {
        scanId = utils.runStaticScan(config);
    } else if (config.type == "dynamic") {
        scanId = utils.runDynamicScan(config);
    } else {
        scanId = utils.runMobileScan(config);
    }

    log.info(_("Scan %1 started", scanId));

    if (config.interval != "0") {
        config.scan_id = scanId;

        log.info(
            _("Waiting for the scanId %1 to be available (60 seconds)", scanId)
        );

        util.sleep(60);

        var scanData = utils.getScanData(config);

        while (
            scanData.analysisStatusType != "Completed" &&
            scanData.analysisStatusType != "Canceled"
        ) {
            if (scanData.analysisStatusType == "Waiting") {
                reg.fireEvent(
                    'event.fortify.paused_scan',
                    { scan_id: scanId }
                );
                log.warn(
                    _(
                        "Scan %1 is paused.  It needs review in FoD. Sleeping for %2 seconds",
                        scanId,
                        config.interval
                    )
                );
            } else {
                log.info(
                    _(
                        "Scan %1 not yet completed (Status) %2.  Sleeping for %3 seconds",
                        scanId,
                        scanData.analysisStatusType,
                        config.interval
                    )
                );
            }
            util.sleep(config.interval);
            scanData = utils.getScanData(config);
        }

        log.info(
            _(
                "Scan %1 completed with status %2",
                scanId,
                scanData.analysisStatusType
            )
        );

        return scanData;
    } else {
        return scanId;
    }
};

exports.runStaticScan = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    var fortifyInstance =
        utils.getInstance(config.instance) || config.fortifyInstance;

    var src_file = config.path;
    var bsiToken = utils.getBsiToken(config);

    config.fullCommand =
        "java -jar " +
        fortifyInstance.fod_uploader_path +
        " \
    -ac " +
        fortifyInstance.key +
        " '" +
        fortifyInstance.secret +
        "' \
    -bsi  " +
        bsiToken +
        "\
    -z " +
        src_file +
        " \
    -ep " +
        config.entitlement +
        " \
    -p " +
        config.preference +
        " \
    -a " +
        config.audit +
        " \
    -n '" +
        config.notes +
        "'";

    var output = utils.executeCommand(config);

    if (output.rc != "0") {
        log.fatal(_("Static scan execution failed: %1", output.output));
    }

    var successMsg = /Scan (.+?) uploaded successfully/;
    var match = successMsg.exec(output.output);
    var scanId = match[1];

    if (!scanId) {
        log.fatal(_("Cannot detect scanId from output"));
    }

    return scanId;
};

exports.runDynamicScan = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    var fortifyInstance =
        utils.getInstance(config.instance) || config.fortifyInstance;

    config.release_id = utils.getReleaseId(config);

    var assessmentTypes = utils.getAssesmentTypes(config);
    var type;

    for (var i = assessmentTypes.length - 1; i >= 0; i--) {
        if (
            assessmentTypes[i].name +
                " - " +
                assessmentTypes[i].frequencyType ==
            config.entitlement
        ) {
            type = assessmentTypes[i];
            break;
        }
    }

    if (!type) {
        log.fatal(
            _(
                "AssessmentType %1 is not available for the release %2",
                config.assessment_type,
                config.release_name
            )
        );
    }

    config.path =
        "/releases/" + config.release_id + "/dynamic-scans/start-scan";
    config.method = "POST";

    config.params = {
        assessmentTypeId: type.assessmentTypeId,
        entitlementId: type.entitlementId,
        entitlementFrequencyType: type.frequencyType
    };

    var response = utils.genericCall(config);

    var scanId = response.content.scanId;

    return scanId;
};

exports.runMobileScan = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");
    var fs = require("cla/fs");
    const ci = require("cla/ci");

    var chunkSize = 1024 * 1024;
    var offset = 0;
    var fragmentNumber = 1;

    var fortifyInstance =
        utils.getInstance(config.instance) || config.fortifyInstance;

    config.release_id = utils.getReleaseId(config);

    var assessmentTypes = utils.getAssesmentTypes(config);

    var type;

    for (var i = assessmentTypes.length - 1; i >= 0; i--) {
        if (
            assessmentTypes[i].name +
                " - " +
                assessmentTypes[i].frequencyType ==
            config.entitlement
        ) {
            type = assessmentTypes[i];
            break;
        }
    }

    if (!type) {
        log.fatal(
            _(
                "AssessmentType %1 is not available for the release %2",
                config.assessment_type,
                config.release_name
            )
        );
    }

    config.path = "/releases/" + config.release_id + "/mobile-scans/start-scan";
    config.method = "POST";

    var today  = new Date();

    today = today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear();;

    var timeZone = ci.findOne("FortifyTimezone", { mid: config.time_zone[0] });
    var platformType = ci.findOne("FortifyMobilePlatform", { mid: config.platform_type[0] });
    var frameworkType = ci.findOne("FortifyMobileFramework", { mid: config.framework_type[0] });

    config.params = {
        assessmentTypeId: type.assessmentTypeId,
        entitlementId: type.entitlementId,
        entitlementFrequencyType: type.frequencyType,
        frameworkType: frameworkType.name,
        platformType: platformType.name,
        timeZone: timeZone.timezone_code,
        offset: '0',
        startDate: today
    };

    config.octet_stream = 1;

    var response;

    var file = config.file_path;
    var fh = fs.openFile(file, "r", "raw");

    while (!fh.eof()) {
        var chunk = fh.readChunk(chunkSize);

        if (fh.eof()) {
            config.params.fragNo = -1;
        } else {
            config.params.fragNo = fragmentNumber++;
        }

        config.body = chunk;
        config.params.offset = offset;

        offset += chunkSize;

        console.log(_('Uploading chunk %1 with offset %2.  Size %3', fragmentNumber, offset, chunkSize));
        response = utils.genericCall(config);
        console.log(_('Chunk upload finished'));
    }

    var scanId = response.content.scanId;

    return scanId;
};

exports.executeCommand = function(config) {
    var log = require("cla/log");
    var reg = require("cla/reg");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    var errors = config.errors || "fail";
    var fullCommand = config.fullCommand;

    var output = fullCommand;

    var output = reg.launch("service.scripting.local", {
        name: _("Fastlane upload task"),
        config: {
            errors: errors,
            path: fullCommand
        }
    });

    return output;
};

exports.getReleaseId = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    var releases = utils.getReleases(config);

    var releaseId;

    for (var i = releases.length - 1; i >= 0; i--) {
        if (releases[i].releaseName == config.release_name) {
            releaseId = releases[i].releaseId;
            break;
        }
    }

    if (!releaseId) {
        log.fatal("Release " + config.release_name + " not found");
    }

    return releaseId;
};

exports.getBsiToken = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    var releaseId = utils.getReleaseId(config);

    config.path = "/releases/" + releaseId + "/static-scan-bsi-token";
    config.method = "GET";

    response = utils.genericCall(config);

    var bsiToken = response.content.bsiToken;

    return bsiToken;
};

exports.getReleaseVulnerabilities = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    var releaseId = utils.getReleaseId(config);

    config.path = "/releases/" + releaseId + "/vulnerabilities";
    config.method = "GET";

    response = utils.genericCall(config);

    var vulnerabilities = response.content.items;

    return vulnerabilities;
};

exports.checkEntitlements = function() {
    var utils = require("fortifyUtils");
    var entitlements = utils.getEntitlements();

    entitlements.forEach(function(entitlement) {
        utils.findOrCreateEntitlement(entitlement);
    });
}

exports.findOrCreateEntitlement = function(entitlement) {
    const ci = require("cla/ci");

    var myCI = ci.findOne("FortifyEntitlement", {entitlement_name: entitlement.entitlement_name});

    if (myCI) {
        console.log(
            "Entitlement " + entitlement.entitlement_name + " already exists.  Skipped creation"
        );
    } else {
        try {
            var entitlementCI = ci.build("FortifyEntitlement", { name: entitlement.entitlement_name, entitlement_name: entitlement.entitlement_name, scan_type: entitlement.scan_type });
            entitlementCI.save();
            console.log("Entitlement " + entitlement.entitlement_name + " created");
        } catch (err) {
            console.error(
                "Error creating CI Entitlement " + entitlement.entitlement_name + ": " + err
            );
        }
    }
};

exports.getEntitlements = function() {
    return [
        {
            entitlement_name: "Dynamic+ Webservices Assessment - SingleScan",
            scan_type: "Dynamic"
        },
        {
            entitlement_name: "Dynamic+ Website Assessment - Subscription",
            scan_type: "Dynamic"
        },
        {
            entitlement_name: "Dynamic+ Website Assessment - SingleScan",
            scan_type: "Dynamic"
        },
        {
            entitlement_name: "Dynamic Website Assessment - Subscription",
            scan_type: "Dynamic"
        },
        {
            entitlement_name: "Dynamic Website Assessment - SingleScan",
            scan_type: "Dynamic"
        },
        {
            entitlement_name: "Mobile+ Assessment - Subscription",
            scan_type: "Mobile"
        },
        {
            entitlement_name: "Mobile+ Assessment - SingleScan",
            scan_type: "Mobile"
        },
        {
            entitlement_name: "Mobile Assessment - Subscription",
            scan_type: "Mobile"
        },
        {
            entitlement_name: "Mobile Assessment - SingleScan",
            scan_type: "Mobile"
        },
        {
            entitlement_name: "SingleScan",
            scan_type: "Static"
        },
        {
            entitlement_name: "Subscription",
            scan_type: "Static"
        }
    ];
};

exports.checkMobilePlatforms = function() {
    var utils = require("fortifyUtils");
    var ci = require("cla/ci");

    var config = {};

    config.instance = ci.findOne("FortifyInstance", { active: 1 });

    if (config.instance) {
        config.instance = config.instance.mid;

        var platforms = utils.getMobilePlatforms(config);

        platforms.forEach(function(platform) {
            utils.findOrCreateMobilePlatform(platform);
        });
    }
};

exports.findOrCreateMobilePlatform = function(platform) {
    const ci = require("cla/ci");

    var myCI = ci.findOne("FortifyMobilePlatform", {name: platform.text});

    if (myCI) {
        console.log(
            "Platform " + platform.text + " already exists.  Skipped creation"
        );
    } else {
        try {
            var platformCI = ci.build("FortifyMobilePlatform", { name: platform.text });
            platformCI.save();
            console.log("Platform " + platform.text + " created");
        } catch (err) {
            console.error(
                "Error creating CI Platform " + platform.text + ": " + err
            );
        }
    }
};

exports.getMobilePlatforms = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    config.path = "/lookup-items";
    config.method = "GET";
    config.params = { type: 'MobileScanPlatformTypes' };

    var response = utils.genericCall(config);

    var platforms = response.content.items;

    return platforms;
};

exports.checkMobileFrameworks = function() {
    var utils = require("fortifyUtils");
    var ci = require("cla/ci");

    var config = {};

    config.instance = ci.findOne("FortifyInstance", { active: 1 });

    if (config.instance) {
        config.instance = config.instance.mid;

        var frameworks = utils.getMobileFrameworks(config);

        frameworks.forEach(function(framework) {
            utils.findOrCreateMobileFramework(framework);
        });
    }
};

exports.findOrCreateMobileFramework = function(framework) {
    const ci = require("cla/ci");

    var myCI = ci.findOne("FortifyMobileFramework", {name: framework.text});

    if (myCI) {
        console.log(
            "Framework " + framework.text + " already exists.  Skipped creation"
        );
    } else {
        try {
            var frameworkCI = ci.build("FortifyMobileFramework", { name: framework.text });
            frameworkCI.save();
            console.log("Framework " + framework.text + " created");
        } catch (err) {
            console.error(
                "Error creating CI framework " + framework.text + ": " + err
            );
        }
    }
};

exports.getMobileFrameworks = function(config) {
    var log = require("cla/log");
    var web = require("cla/web");
    var utils = require("fortifyUtils");

    config.path = "/lookup-items";
    config.method = "GET";
    config.params = { type: 'MobileScanFrameworkTypes' };

    var response = utils.genericCall(config);

    var frameworks = response.content.items;

    return frameworks;
}
