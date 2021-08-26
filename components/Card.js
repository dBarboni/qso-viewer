// Card for individual record
import styles from '../styles/Card.module.css'

export default function Card({ call, band, mode, qso_date }) {
    return (
        <div className={styles.card}>
            <p>{call}</p>
            <p>{band}</p>
            <p>{mode}</p>
            <p>{qso_date}</p>
        </div>
    );
}