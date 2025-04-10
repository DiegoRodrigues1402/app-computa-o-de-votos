import "./Button.css"

function AddButton({ children, onClick }) {
    return (
        <button className="button" onClick={onClick} >{children}</button>
    )
} export default AddButton;
