// Form component
import styles from '../styles/Form.module.css'
import axios from 'axios';

export default function Form() {
    // Get YYYY-MM-DD formatted date for date picker max property
    const today = new Date().toISOString().slice(0, 10);

    const retrieveData = e => {
        // Prevent refresh
        e.preventDefault();

        // Build query
        // Bare minimum needs login, password, qso_query params
        // qso_startdate not req'd

        // Define base params
        let params = {
            qso_query: 1,
            login: e.target.call.value,
            password: e.target.password.value // may need to convert to lowercase
        };

        // Add date param if not empty
        const startDate = e.target.date.value;
        if (startDate !== '') {
            params.qso_startdate = startDate;
        }

        // Call LOTW API. Rewrite defined in next.config.js.
        axios.get('/lotw', { params })
        .then(response => {
            //console.log(response.data);
            // if <eoh> tag exists then succesfully got data
            const adifString = response.data;
            if (adifString.indexOf('<eoh>') !== -1) {
                const firstItem = adifString.indexOf('<CALL');
                if (firstItem !== -1) {
                    // at least one record exists
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
                    console.log(records);
                } else {
                    // no records were found
                }

            } else { // else wrong credentials
                console.log("wrong credentials");
            }
        }).catch(error => {
            // Error communicating with LOTW API
            console.log(error);
        });
    }
    return (
        <form onSubmit={retrieveData} className={styles.form}>
            <label htmlFor="call" className={styles.label}>Call sign</label>
            <input type="text" name="call" id="call" required className={styles.field} />
            <label htmlFor="password" className={styles.label}>Password</label>
            <input type="password" name="password" id="password" required className={styles.field} />
            <label htmlFor="date" className={styles.label}>Start Date</label>
            <input type="date" name="date" id="date" className={styles.field} max={today} />
            <button type="Submit">Submit</button>
        </form>
    )
}
