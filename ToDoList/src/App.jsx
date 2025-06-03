import React,{Component} from 'react'
import './App.css'

class TodoItem extends Component{
  render(){
    const {task,index,markComplete,deleteTask}=this.props;
    return(
      <li style={{textDecoration:task.completed? 'line-through':'none'}}>
        {task.text}
        <button onClick={()=> markComplete(index)} style={{marginLeft:'10px'}}>
          {task.completed ? 'Undo':'Complete'}
        </button>
        <button onClick={()=> deleteTask(index)} style={{marginLeft:'10px'}}>
          Delete
        </button>
      </li>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks : [],
      newTask:''
    }
  };
  handleInputChange =(e) =>{
    this.setState({newTask:e.target.value});
  };
  addTask = () =>{
    const {newTask,tasks} =this.state;
    if(newTask.trim() !== ''){
      this.setState({
        tasks:[...tasks,{text:newTask,completed:false}],
        newTask:''
      });
    }
  };
  markComplete = (index) => {
    const tasks =[...this.state.tasks];
    tasks[index].completed = !tasks[index].completed;
    this.setState({tasks})
  }
  deleteTask = (index) =>{
    const tasks =[...this.state.tasks];
    tasks.splice(index,1)
    this.setState({tasks})
  }
  render (){
    return (
      <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
        <h2>To-Do List</h2>
        <input
          type="text"
          value={this.state.newTask}
          onChange={this.handleInputChange}  
          placeholder="Add new task"
        />
        <button onClick={this.addTask}>Add</button>

        <ul>
          {this.state.tasks.map((task, index) => (
            <TodoItem
              key={index}
              task={task}
              index={index}
              markComplete={this.markComplete}
              deleteTask={this.deleteTask}
            />
          ))}
        </ul>
      </div>
    );

  }
}
export default App