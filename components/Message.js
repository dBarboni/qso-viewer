// Displays a message
import styles from '../styles/Message.module.css'

export default function Message({type, children}) {
    // Make sure children were passed in
    if (!children) {
        children = "No text provided";
    }

    // Determine styling for message
    const messageType = (type === "success") ? "message" : "message--error";

    // Render content
    return (
        <p className={styles[messageType]}>{children}</p>
    )
}