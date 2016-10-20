const xml = require('libxmljs')
const fs = require('fs-extra')
const utils = require('./packageUtils')
// ====================================================================================================
// ======================================      Matchers     ===========================================
// ====================================================================================================
// Base
function isDirMatch(file, metadata) {
    return file.path.match(new RegExp('/src/' + metadata.dir + '/'))
}
function isExtensionMatch(file, metadata) {
    return file.path.endsWith(metadata.extension)
}
function isFile(file) {
    return file.stats.isFile()
}
function isMetaXml(file) {
    return file.path.match(/-meta.xml/)
}
function isHidden(file) {
    return file.path.startsWith('.')
}
// Composed
function isBaseMatch(file, metadata) {
    return isDirMatch(file, metadata) && !isMetaXml(file) && !isHidden(file)
}
function isFolderMatch(file, metadata) {
    return isDirMatch(file, metadata) && !isMetaXml(file) && !isHidden(file) && !file.path.endsWith('unfiled$public')
}
function isFileMatch(file, metadata) {
    return isBaseMatch(file, metadata) && isFile(file)
}
function isFileExtensionMatch(file, metadata) {
    return isBaseMatch(file, metadata) && isFile(file) && isExtensionMatch(file, metadata)
}
function isMetadataXmlMatch(file, metadata) {
    return isBaseMatch(file, metadata) && isFile(file)
}
function isCustomObjectMatch(file, metadata) {
    return !isManagedObjectFilter(file) && isCustomObjectFilter(file) && isFileExtensionMatch(file, metadata)
}
// ====================================================================================================
// ======================================      Filter     ===========================================
// ====================================================================================================
function unmanagedElementFilter(element) {
    return !element.text().match(/__[\s\S]*__/)
}
function isManagedObjectFilter(file) {
    return file.path.match(/__[\s\S]*__/)
}
function isCustomObjectFilter(file) {
    return file.path.match(/__c.object$/) || file.path.match(/__mdt.object$/)
}
function customElementFilter(element, metadata) {
    const customOnlyTypes = ['CustomField']
    // Only return custom types.  Don't get Standard elements.  This means the thing ends with __c
    var idx = customOnlyTypes.indexOf(metadata.type)
    if (idx > -1) {
        return element.text().match(/__c/)
    }
    return true
}
// ====================================================================================================
// ==================================      Support Functions     ======================================
// ====================================================================================================
function merge(prev, curr, idx, arr) {
    return prev.concat(curr)
}
function getFileAndElementName(file, metadata, element) {
    return getFilename(file, metadata) + '.' + element.text()
}
function getFilename(file, metadata) {
    return utils.getFilename(file.path, metadata.extension)
}
function getAuraName(file, metadata) {
    var name = file.path.substring(0, file.path.lastIndexOf('/'))
    name = name.substring(name.lastIndexOf('/') + 1)
    return name
}
function getFolderAndFilename(file, metadata) {
    return utils.getFolderAndFilename(file.path, metadata.extension, metadata.dir)
}
function getFolderAndFilenameWithExt(file, metadata) {
    return utils.getFolderAndFilenameWithExt(file.path, metadata.dir)
}
function getProcessName(file, metadata) {
    return getXmlElements(file, metadata)
        .map(element => getFileAndElementName(file, metadata, element))
}
function getXmlElements(file, metadata) {
    var xmlString = fs.readFileSync(file.path).toString()
    var xmlDocument = xml.parseXmlString(xmlString)
    var elements = xmlDocument.find(metadata.options.item_xpath, 'http://soap.sforce.com/2006/04/metadata')
    return elements
}
function getFileAndElement(file, metadata) {
    return getXmlElements(file, metadata)
        .filter(e => unmanagedElementFilter(e))
        .map(element => getFileAndElementName(file, metadata, element))
}
function getElement(file, metadata) {
    return getXmlElements(file, metadata)
        .filter(e => unmanagedElementFilter(e))
        .map(element => element.text())
}
// ====================================================================================================
// ======================================      Parsers     ============================================
// ====================================================================================================
function BaseMetadataParser(metadata, contents) {
    return contents
        .filter(file => isFileExtensionMatch(file, metadata))
        .map(file => getFilename(file, metadata))
}
function MetadataFilenameParser(metadata, contents) {
    return contents
        .filter(file => isBaseMatch(file, metadata))
        .map(file => getFolderAndFilename(file, metadata)).sort()
}
function MetadataFolderParser(metadata, contents) {
    return contents
        .filter(file => isFolderMatch(file, metadata))
        .map(file => getFolderAndFilename(file, metadata)).sort()
}
function MetadataXmlElementParser(metadata, contents) {
    return contents
        .filter(file => isMetadataXmlMatch(file, metadata))
        .map(file => getFileAndElement(file, metadata))
        .reduce(merge, [])
}
function CustomLabelsParser(metadata, contents) {
    return contents
        .filter(file => isMetadataXmlMatch(file, metadata))
        .map(file => getElement(file, metadata))
        .reduce(merge, [])
}
function CustomObjectParser(metadata, contents) {
    return contents
        .filter(file => isCustomObjectMatch(file, metadata))
        .map(file => getFilename(file, metadata))
}
function RecordTypeParser(metadata, contents) {
    return this.MetadataXmlElementParser(metadata, contents)
}
function BusinessProcessParser(metadata, contents) {
    return contents
        .filter(file => isFileMatch(file, metadata))
        .map(file => getProcessName(file, metadata))
        .reduce(merge, [])
}
function AuraBundleParser(metadata, contents) {
    return contents
        .filter(file => isFileMatch(file, metadata))
        .map(file => getAuraName(file, metadata))
}
function DocumentParser(metadata, contents) {
    return contents
        .filter(file => isFileMatch(file, metadata))
        .map(file => getFolderAndFilenameWithExt(file, metadata))
}
module.exports = {
    BaseMetadataParser: BaseMetadataParser,
    MetadataFilenameParser: MetadataFilenameParser,
    MetadataFolderParser: MetadataFolderParser,
    MetadataXmlElementParser: MetadataXmlElementParser,
    CustomLabelsParser: CustomLabelsParser,
    CustomObjectParser: CustomObjectParser,
    RecordTypeParser: RecordTypeParser,
    BusinessProcessParser: BusinessProcessParser,
    AuraBundleParser: AuraBundleParser,
    DocumentParser: DocumentParser
}
