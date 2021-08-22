class AdifFormatter {
    constructor() {

    }
    convertToJSON(adifString, firstItem) {
        // format adif and parse to json
        let cleaned = adifString.slice(firstItem); // remove the header info
        cleaned = cleaned.replaceAll(/\/{2}.*/g, ''); // remove comments
        cleaned = cleaned.replaceAll(/\s+$/gm, ''); // trim blank space at EOL
        cleaned = cleaned.replaceAll(/\<(.*):\d+\>(.*)/g, '"$1":"$2",'); // format tags
        cleaned = cleaned.replaceAll('"CALL"', '{"CALL"'); // Add curly bracket before each record
        cleaned = cleaned.replaceAll('<eor>', '}'); // replace eor tags with closing curly bracket
        cleaned = cleaned.replaceAll(/}\s+\{/gm, '},{'); // add comma between brackets
        cleaned = cleaned.replaceAll(/,\s+}/gm, '}'); // remove comma after last key/value
        cleaned = cleaned.replace('<APP_LoTW_EOF>', ''); // remove EOF tag
        cleaned = '[' + cleaned + ']'; // wrap in brackets
        const records = JSON.parse(cleaned);
        return records;
    }
}

export default new AdifFormatter();