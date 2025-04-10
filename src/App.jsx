import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"


import "./App.css"
import Tasks from "./componets/Tasks";
import AddTasks from "./componets/AddTasks";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import ButtonFinalizarLimpar from "./componets/ButtonFinalizarLimpar";

function App() {

  // Função renderizar o state
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (e) {
      console.error("Erro ao ler tarefas do localStorage", e);
      return [];
    }
  });

  // Ref para armazenar o valor anterior de tasks
  const tasksRef = useRef(tasks);

  useEffect(() => {
    // Atualiza o localStorage somente quando tasks for alterado
    if (tasks !== tasksRef.current) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      tasksRef.current = tasks;
    }
  }, [tasks]); // Atualiza quando tasks mudar
  // adicionar nome na lista
  function handleTasksAddition(title) {

    const newTasks = [
      ...tasks,
      {
        id: uuidv4(),
        nome: title,
        situacao: false,
        pontuacao: "00"
      },
    ];
    setTasks(newTasks)

  }

  //função para completar a tarefa
  function handleTasksComplete(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return {
        ...task, situacao: !task.situacao
      }
      return task;
    })
    setTasks(newTasks);
  }


  // Função para deletar da lista
  function deleteLista(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }


  //Função para adicionar votos candidatos
  function handleTasksInvestigation(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        // Verificar se a pontuação é uma string numérica válida, se não, definir um valor padrão
        const currentPontuacao = task.pontuacao ? parseInt(task.pontuacao) : 0;

        // Incrementa a pontuação de forma segura
        const newPontuacao = (currentPontuacao + 1).toString().padStart(2, '0');
        return {
          ...task,
          pontuacao: newPontuacao
        };
      }
      return task;
    });

    // Definindo um atraso de 2 segundo (2000 milissegundos)
    setTimeout(() => {
      // Ordena as tarefas por pontuação
      newTasks.sort((a, b) => parseInt(b.pontuacao) - parseInt(a.pontuacao));  // Ordenação decrescente
      setTasks(newTasks);  // Atualiza o estado com as tarefas ordenadas
    }, 2000);  // Tempo de espera de 2000ms (2 segundo)

    setTasks(newTasks);
  }

  //Função para retirar votos candidatos
  function handleTasksRemoveVote(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        // Verificar se a pontuação é uma string numérica válida, se não, definir um valor padrão
        const currentPontuacao = task.pontuacao ? parseInt(task.pontuacao) : 0;
        if (currentPontuacao <= 0) {
          return task;
        }
        // Incrementa a pontuação de forma segura
        const newPontuacao = (currentPontuacao - 1).toString().padStart(2, '0');
        return {
          ...task,
          pontuacao: newPontuacao
        };
      }
      return task;
    });
    // Definindo um atraso de 2 segundo (2000 milissegundos)
    setTimeout(() => {
      // Ordena as tarefas por pontuação
      newTasks.sort((a, b) => parseInt(b.pontuacao) - parseInt(a.pontuacao));  // Ordenação decrescente
      setTasks(newTasks);  // Atualiza o estado com as tarefas ordenadas
    }, 2000);  // Tempo de espera de 2000ms (2 segundo)

    setTasks(newTasks);
  }

  const [showResults, setShowResults] = useState(false);

  const [championName, setChampionName] = useState("");

  // Função para definir quem tem maior pontuação
  function maxPoint() {
    // Encontrar a maior pontuação
    const maxPontuacao = Math.max(...tasks.map(task => Number(task.pontuacao)));

    // Filtrar todas as tarefas que possuem a maior pontuação
    const champions = tasks.filter(task => Number(task.pontuacao) === maxPontuacao);
    //se não houver candidatos
    if (champions.length === 0) {
      alert("PREENCHA COM O NOME DOS CANDIDATOS");
    } 
    // Se houver mais de um campeão, dispara o alerta
    else if (champions.length > 1) {
      alert("EMPATE AINDA NÃO TEMOS UM VENCEDOR!!");
    } else {
      // Se houver apenas um vencedor, atualiza o estado com o nome do vencedor
      const nameOfChampion = champions[0].nome;

      // atualiza o showResultados do container campeão
      setShowResults(true);
      //Refresh automatico apos clicar botão finalizar
      setTimeout(() => {
        window.location.reload(); // Recarrega a página
      }, 30000);
      setChampionName(nameOfChampion);
    }
  }

  //limpar dados do navegador
  const clearLocalStorage = () => {
    // Exibe uma caixa de confirmação para o usuário
    const confirmClear = window.confirm("Tem certeza que deseja limpar os dados?");
    
    // Se o usuário confirmar (clicar em 'OK')
    if (confirmClear) {
      localStorage.clear(); // Limpar todos os dados
      setTasks([]); // Limpar o estado das tarefas
      // alert("Dados limpos!");  Alerta de sucesso
    } else {
      alert("Ação cancelada!"); // Se o usuário cancelar
    }
  };
  
  
  return (
    <>
      <div className={`container-home ${showResults ? "d-none" : ""}`}>
        <div className="container">
          <Header />
          <AddTasks handleTasksAddition={handleTasksAddition} />
          <Tasks tasks={tasks}
            handleTasksComplete={handleTasksComplete}
            deleteLista={deleteLista}
            handleTasksInvestigation={handleTasksInvestigation}
            handleTasksRemoveVote={handleTasksRemoveVote} />
          <ButtonFinalizarLimpar maxPoint={maxPoint} championName={championName} clearLocalStorage={clearLocalStorage}/>
          <Footer />
        </div>
      </div>
      <div className={`container-campeao ${showResults ? "show" : ""}`}>
        <h2>{championName}</h2>
      </div>

    </>
  )
}

export default App
