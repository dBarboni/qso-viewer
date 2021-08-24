import axios from 'axios'

class DataHandler {
    constructor() {

    }
    retrieveRecords = async e => {
        // Build query
        // Bare minimum needs login, password, qso_query params
        // qso_startdate not req'd

        // Define base params
        let params = {
            qso_query: 1,
            login: e.target.call.value,
            password: e.target.password.value // may need to convert to lowercase
        };

        let records = [];

        // Add date param if not empty
        const startDate = e.target.date.value;
        if (startDate !== '') {
            params.qso_startdate = startDate;
        }

        // Call LOTW API. Rewrite defined in next.config.js.
        return axios.get('/lotw', { params })
        .then(response => {
            //console.log(response.data);
            // if <eoh> tag exists then succesfully got data
            const adifString = response.data;
            if (adifString.indexOf('<eoh>') !== -1) {
                const firstItem = adifString.indexOf('<CALL');
                if (firstItem !== -1) {
                    // at least one record exists, convert adif string to JSON
                    records = this.convertToJSON(adifString, firstItem);
                    const message = `Found ${records.length} records.`;
                    return {records, message};
                } else {
                    // no records were found
                    const message = "No records were found.";
                    return {records, message};
                }

            } else { // else wrong credentials
                const message = "The Call sign or password is incorrect.";
                return {records, message};
            }
        }).catch(error => {
            // Error communicating with LOTW API
            console.log(error);
            const message = "There was an error communicating with LOTW.";
            return {records, message};
        });
    }
    convertToJSON = (adifString, firstItem) => {
        // format adif and parse to json
        let cleaned = adifString.slice(firstItem); // remove the header info
        cleaned = cleaned.replaceAll(/\/{2}.*/g, ''); // remove comments
        cleaned = cleaned.replaceAll(/\s+$/gm, ''); // trim blank space at EOL
        cleaned = cleaned.replaceAll(/\<(.*):\d+\>(.*)/g, '"$1":"$2",'); // format tags
        cleaned = cleaned.replaceAll('"CALL"', '{"CALL"'); // Add curly bracket before each record
        cleaned = cleaned.replaceAll('<eor>', '}'); // replace eor tags with closing curly bracket
        cleaned = cleaned.replaceAll(/\}\s+\{/gm, '},{'); // add comma between brackets
        cleaned = cleaned.replaceAll(/,\s+}/gm, '}'); // remove comma after last key/value
        cleaned = cleaned.replace('<APP_LoTW_EOF>', ''); // remove EOF tag
        cleaned = '[' + cleaned + ']'; // wrap in brackets
        const records = JSON.parse(cleaned);
        return records;
    }
}

export default new DataHandler();