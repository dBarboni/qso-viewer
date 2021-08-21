// Form component
import styles from '../styles/Form.module.css'

export default function Form() {
    const retrieveData = e => {
        // Prevent refresh
        e.preventDefault();
        // Call LOTW API
        // Bare minimum needs login, password, qso_query params
        // qso_startdate not req'd but recommended
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
