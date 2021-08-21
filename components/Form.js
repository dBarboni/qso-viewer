// Form component
import styles from '../styles/Form.module.css'
import axios from 'axios';

export default function Form() {
    const retrieveData = e => {
        // Prevent refresh
        e.preventDefault();

        // Build query
        // Bare minimum needs login, password, qso_query params
        // qso_startdate not req'd

        // Define base params
        const baseURL = 'https://lotw.arrl.org/lotwuser/lotwreport.adi';
        let params = {
            qso_query: 1,
            login: e.target.call.value,
            password: e.target.password.value
        };

        // Add date param if not empty
        const startDate = e.target.date.value;
        if (startDate !== '') {
            params.qso_startdate = startDate;
        }

        // Call LOTW API
        axios.get(baseURL, params)
        .then(response => {
            console.log(response);
        }).catch(error => {
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
            <input type="date" name="date" id="date" className={styles.field} />
            <button type="Submit">Submit</button>
        </form>
    )
}
