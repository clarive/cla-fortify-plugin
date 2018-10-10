
# Fortify Plugin

<img src="https://github.com/clarive/cla-fortify-plugin/blob/master/public/icon/fortify.svg" alt="Fortify Plugin" title="Fortify Plugin" width="120" height="120">

Fortify Plugin is designed to be able to communicate with FoD server to:

- retrieve information about the security analysis of the projects code, vulnerabilities, etc.
- initiate scans of new versions of the projects
- monitor scan status
- and much more ...

## What is Fortify?


## Installing

To install the plugin place the cla-fortify-plugin folder inside `$CLARIVE_BASE/plugins`
directory in Clarive's instance.

Once the plugin is placed in its folder, you can start using it going to your Clarive's instance.

## Fortify Instance

To configurate the Fortify Instance Resource:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> Fortify.

- **URL -** This is the Fortify url.
- **API URL -** This is the Fortify API url.
- **Key -** User for Fortify Server.
- **Secret -** Password for Fortify connection.

Example:

		URL: https://emea.fortify.com
		API URL: https://api.emea.fortify.com/api/v3
		key: sdfap98145ulnañgd6'9p8urijnñqdl
		secret: yhp000fahsduyhgblkja

## Services available

### Get OAuth token

#### Parameters

This service will deploy a WAR file on a Fortify Server Resource.

- **Fortify server (variable name: instance)** - The server you want to deploy the WAR file to.
- **WAR file path (war_path)** - The path on the remote server where the WAR file to deploy is located.
- **Application path (app_path)** - The application path in the Fortify server where the application will be deployed.
- **Force update? (update)** - Check this if you want the application to be overwritten if already exists.

#### How to use

##### In Clarive EE

You can find this service in the Rule Designer palette.

Op Name: **Deploy WAR to Fortify**

```yaml
    Fortify server: Fortify_server
    WAR file path: /deploys/tomcat.war
    Application path: /path/apps/
    Force update?: 0
```

##### In Clarive SE

##### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Configuration example:

```yaml
rule: Fortify demo
do:
   - tomcat_deploy:
       instance: tomcat_instance         # Required. Use the mid set to the resource you created
       war_path: '/deploys/tomcat.war'   # Required.
       app_path: ${destination_folder} 	 # Required.
       update: "0"
```

##### Outputs

###### Success

This service will return the deployment message.

###### Possible configuration failures

**Task failed**

You will get an error returned by the Fortify plugin.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "tomcat_deploy": "war_path"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `webs` not available for op "tomcat_deploy"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
