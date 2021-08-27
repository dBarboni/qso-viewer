// Map marker component. Shows a circle and a text label.
import styles from '../styles/Marker.module.css'

export default function Marker({ label }) {
    return (
        <div className={styles.container}>
            <div className={styles.labelContainer}>
                <p className={styles.label}>{label}</p>
            </div>
            <div className={styles.marker}></div>
        </div>
    );
}
