import { useState } from "react";
import "./AddTasks.css";
import Button from "./Button";

function AddTasks({ handleTasksAddition }) {
    // Atualiza o estado do input
    const [inputData, setInputData] = useState('');

    // Função para atualizar o setData pelo onChange
    const handleInputChange = (e) => {
        const value = e.target.value;

        // Atualiza o estado diretamente com o valor digitado (sem formatar)
        setInputData(value);
    };

    // Função para formatar o nome para primeira letra maiúscula
    const capitalizeFirstLetter = (str) => {
        return str
            .split(' ') // Divide a string em palavras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Converte a primeira letra de cada palavra
            .join(' '); // Junta as palavras novamente
    };

    // Passa o inputData atualizado para o app.jsx
    const addTasksClick = () => {
        // Verifica se o campo de entrada está vazio
        if (inputData.trim() === '') {
            alert("DIGITE UM NOME VÁLIDO!"); // Alerta se o campo estiver vazio
            return; // Não faz nada se estiver vazio
        }

        // Aqui você faz a transformação do texto para a primeira letra maiúscula
        const formattedInputData = capitalizeFirstLetter(inputData);

        // Passa os dados para o servidor (ou para o App.jsx)
        handleTasksAddition(formattedInputData);

        // Limpa o campo de input
        setInputData('');
    };

    return (
        <div className="add-tasks-container">
            <input
                onChange={handleInputChange}
                value={inputData}
                placeholder="Digite o nome do candidato"
                className="add-tasks-input"
                type="text"
               maxlength="35"
            />
            <div className="add-tasks-button-container">
                <Button onClick={addTasksClick}>Adicionar</Button>
            </div>
        </div>
    );
}

export default AddTasks;
