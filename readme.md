# Package.xml generator in JavaScript
`npm install package-xml -g`

change directories to you project directory, which contains your src folder and run

`package-xml`

or, the long version...

`package-xml -D "./src" -n "Package Name" -v "37.0" -m -c -i "installScriptHandler"`

## Options: (No options are required)
* If no directory is provided, it will default to ./src
* If there is no version, it will use version 37 (Summer 16)
* If no name is provided, the package will not have a name
```
Options:
  -D, --dir           The path to the source directory containing your SFDC
                      files and metadata.  Your package.xml file will end up
                      here.               [string] [required] [default: "./src"]
  -v, --version       The Saleforce API Version you wish to target with this
                      package.                                          [string]
  -n, --name          The name of the package.                          [string]
  -i, --installScript The name the install handler class                [string]
  -m, --managed       Include Managed Package Fields. [boolean] [default: false]
  -c, --clean         Clean the Metadata files        [boolean] [default: false]
  -C, --clean-config  Clean the Metadata files from a provided configuration
                      file                                [string] [default: ""]
  -h                  Show help                                        [boolean]
```

## Clean Metadata

The Clean Metadta option is available ass of version 2.1
This option will clean out boilerplate metadata that can sometimes cause problems with deploying between different orgs. Also, if some metadata is not valid, visible, or enabled, then it shouldn't go in the package, hence we need to clean up the metadata.

Below is the standard configuration for cleaning files. When using the "clean" option, this is the configuration that will be used.

But we all know you will probably want a custom clean config.  In that case, copy the config below and customize it.
The selectors you see are simple xml path selectors. The `xmlns` namespace is required on element selectors, so if you create a custom configuration, be sure to include that on any element selectors.
For tips on how to write selectors, you can go to w3c at [http://www.w3schools.com/xml/xml_syntax.asp](http://www.w3schools.com/xml/xml_syntax.asp)
All options are optional, so you probably don't need to inlcude the namespace option unless you're doing something very unexpected

```
{
    "selectors": [
        "./xmlns:packageVersions",
        "./xmlns:applicationVisibilities[xmlns:visible = 'false']",
        "./xmlns:classAccesses[xmlns:enabled = 'false']",
        "./xmlns:fieldPermissions[xmlns:editable = 'false' and xmlns:readable = 'false']",
        "./xmlns:objectPermissions[xmlns:allowCreate = 'false' and xmlns:allowDelete = 'false' and xmlns:allowEdit = 'false' and xmlns:allowRead = 'false' and xmlns:modifyAllRecords = 'false' and xmlns:viewAllRecords = 'false']",
        "./xmlns:pageAccesses[xmlns:enabled = 'false']",
        "./xmlns:userPermissions[xmlns:enabled = 'false']",
        "./xmlns:recordTypeVisibilities[xmlns:visible = 'false']",
        "./xmlns:tabSettings[xmlns:visibility = 'None']"
    ],
    "extensions": [
        "-meta.xml",
        ".profile",
        ".permissionset"
    ],
    "namespace": "http://soap.sforce.com/2006/04/metadata"
}
``` 
