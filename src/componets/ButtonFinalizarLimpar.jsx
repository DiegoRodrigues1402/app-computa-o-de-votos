import Button from "./Button"
import "./ButtonFinalizarLimpar.css"


function ButtonFinalizarLimpar({ maxPoint,clearLocalStorage }) {
    return (
        <div className="button-container-limpa-finaliza">
            <div className="limpa" onClick={clearLocalStorage}> <Button>Limpar</Button></div>
            <div onClick={() => maxPoint()} className="finaliza"> <Button>Finalizar</Button></div>
        </div>
    );
}
export default ButtonFinalizarLimpar;