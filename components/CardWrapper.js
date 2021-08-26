// Wrapper for cards
import styles from '../styles/CardWrapper.module.css'

export default function CardWrapper({ children }) {
    return <div className={styles.wrapper}>{children}</div>;
}