# Package.xml generator in JavaScript
`npm install package-xml -g`
change directories to you project directory, which contains your src folder
`package-xml -D ./src -n PackageName -v 37.0`

Options:
  -D, --dir      The path to the source directory containing your SFDC files and
                 metadata.  Your package.xml file will end up here.
                                          [string] [required] [default: "./src"]
  -v, --version  The Saleforce API Version you wish to target with this package.
                                           [string] [required] [default: "37.0"]
  -n, --name     The name of the package.                    [string] [required]
 