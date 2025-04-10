import "./Task.css"
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

function Task({ task, handleTasksComplete, deleteLista, handleTasksInvestigation, handleTasksRemoveVote }) {
    return (
        <div className="task-container" style={task.situacao ? { borderLeft: "6px solid #fff212", textDecoration: "line-through", color: "#ed3237 " } : {}}>
            <div className="task-container-titulo">
                <div className="task-nome" onClick={() => handleTasksComplete(task.id)}
                    style={task.situacao ? { color: "#ed3237" } : {}}>
                    {task.nome}

                </div>
                <div className="task-pontuacao" onClick={() => handleTasksComplete(task.id)}
                    style={task.situacao ? { color: "#ed3237" } : {}}>
                    Pontuação: &nbsp;{task.pontuacao}
                </div>
            </div>
            <div className="button-container">
                <button onClick={() => handleTasksInvestigation(task.id)} className="remove-task-button-mais">
                    <CiSquarePlus />
                </button>
                <button onClick={() => handleTasksRemoveVote(task.id)} className="remove-task-button-menos">
                    <CiSquareMinus />
                </button>
                <button onClick={() => deleteLista(task.id)} className="remove-task-button">
                    <RiDeleteBin6Line />
                </button>

            </div>

        </div>
    )
}
export default Task;