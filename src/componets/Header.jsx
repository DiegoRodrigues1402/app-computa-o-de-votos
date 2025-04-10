import "./Header.css"
import Logo from "../../public/IPIB_logo.png"

function Header(){
    return(
        <div className="container-header">
            <h1>Lista Candidatos IPI</h1>
            <img className="logo" src={Logo} alt="Logo IPI" />
        </div>
    );
}
export default Header;