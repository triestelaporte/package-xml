# Package.xml generator in JavaScript
`npm install package-xml -g`

change directories to you project directory, which contains your src folder and run

`package-xml`

or, the long version...

`package-xml -D "./src" -n "PackageName" -v "37.0"`

## Options: (No options are required)
* If no directory is provided, it will default to ./src
* If there is no version, it will use version 37 (Summer 16)
* If no name is provided, the package will not have a name
```
  -D, --dir      The path to the source directory containing your SFDC files and
                 metadata.  Your package.xml file will end up here.
                                           [string] [default: "./src"]
  -v, --version  The Saleforce API Version you wish to target with this package.
                                           [string] [default: "37.0"]
  -n, --name     The name of the package.
                                           [string]
```

