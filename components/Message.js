// Displays a message
// TODO: add styling for error, etc.

export default function Message({children}) {
    if (!children) {
        children = "No text provided";
    }
    return (
        <p>{children}</p>
    )
}