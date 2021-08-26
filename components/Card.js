// Card for individual record
import styles from '../styles/Card.module.css'

export default function Card({ call, band, mode, qso_date }) {
    return (
        <div className={styles.card}>
            <p className={styles.item}>- {call} -</p>
            <p className={styles.item}>Band: {band}</p>
            <p className={styles.item}>Mode: {mode}</p>
            <p className={styles.item}>Date: {qso_date}</p>
        </div>
    );
}
