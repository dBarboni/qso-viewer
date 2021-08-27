// Displays a message
import styles from '../styles/Message.module.css'

export default function Message({type, children}) {
    // Make sure children were passed in
    if (!children) {
        children = "No text provided";
    }

    // Determine styling for message
    let classNames = `${styles.message}`;
    if (type === "error") {
        classNames += ` ${styles.error}`;
    }

    // Render content
    return (
        <p className={classNames}>{children}</p>
    )
}