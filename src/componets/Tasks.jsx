import Task from "./Task";


function Tasks({tasks , handleTasksComplete,deleteLista,handleTasksInvestigation, handleTasksRemoveVote}){
    return(
        <div>
            {tasks.map((candidate)=> <Task task={candidate} 
            handleTasksComplete={handleTasksComplete} 
            deleteLista={deleteLista} 
            handleTasksInvestigation={handleTasksInvestigation}
            handleTasksRemoveVote={handleTasksRemoveVote}/>
  
            )}
        </div>
    );
}

export default Tasks;