// Form component
import styles from '../styles/Form.module.css'

export default function Form({ onSubmit }) {
    // Get YYYY-MM-DD formatted date for date picker max property
    const today = new Date().toISOString().slice(0, 10);
    
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <label htmlFor="call" className={styles.label}>Call sign</label>
            <input type="text" name="call" id="call" required className={styles.field} />
            <label htmlFor="password" className={styles.label}>Password</label>
            <input type="password" name="password" id="password" required className={styles.field} />
            <label htmlFor="date" className={styles.label}>Start Date</label>
            <input type="date" name="date" id="date" className={styles.field} max={today} />
            <button type="Submit">Submit</button>
        </form>
    );
}
