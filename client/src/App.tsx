import React, { Component } from 'react';
import Todos from './components/Todos';
import Header from './components/layouts/Header';
import AddTodo from './components/AddTodo';
import Alert from './components/Alert';
import axios from 'axios'
import {v4 as uuid} from 'uuid'; 

// type for state
interface stateTypes {
  todos: Array<{ id: string, completed: boolean, title: string }>;
  done: boolean;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    id: string;
  }
}

class App extends Component{
  state: stateTypes = {
    todos: [],
    done: false
  }

  componentDidMount() {
    // get data from MySQL database and set states
    axios.get('https://localhost:3001/api/get').then((response) => {
      console.log(response.data)
      this.setState({todos: response.data})
    })

    // for deployment
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=6').then(res => 
    {for(var i = 0; i < res.data.length; i++){
      res.data[i].completed = false;
      res.data[i].title = "Example to do item " + (i + 1);
    }
    this.setState({todos: res.data});
    })
  }
  
  // flip the current state of completed for the todo with the specified id
  markComplete = (id: string) => {
    let current = {id: "", completed: false, title: ""};
    this.setState({
      todos: this.state.todos.map(todo => {
        if(id === todo.id){
          todo.completed = !todo.completed;
          current = todo;
        }
        return todo;
      })
    });
    const newState = [...this.state.todos.filter(todo => todo.id !== id)];
    newState.push(current);
    this.setState({todos: newState});

    // put request via axios to update MySQL database
    axios.put('http//localhost:3001/api/update', {
      completed: current.completed,
      id: current.id
    })

  }

  // delete to do from the list and delete from database
  delI = (id: string) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]});
    this.updateNum(this.state.todos.length - 1);
    
    // update database
    axios.delete(`https://localhost:3001/api/delete/${id}`)
  }

  // add to do to the list and update database
  addTodo = (title: string) => {
    const tempID = uuid()
    const tempTITLE = title
    const tempCOMPLETED = false
    this.state.todos.push({id: tempID, title: tempTITLE, completed: tempCOMPLETED});
    this.setState({todos: this.state.todos})
    this.updateNum(this.state.todos.length);

    // update MySQL database via axios post request
    axios.post('http://localhost:3001/api/post', {
      id: tempID, 
      title: tempTITLE, 
      completed: tempCOMPLETED
    })
  }

  // update number of todos
  updateNum = (len: number) => {
    if(len === 0){
      this.setState({done: true})
    }else{
      this.setState({done: false})
    }
  }

  // delete all todos in the list
  clearList = () => {
    let newState = this.state.todos;
    newState.length = 0;
    this.setState({todos: newState})
    this.setState({done: true})
  }
  
  render(){
    console.log(uuid())
    return (
      <div>
        <Header />
        <AddTodo addTodo={this.addTodo} clearList={this.clearList}/>
        <Alert done={this.state.done}/>
        <Todos key={uuid()} todos={this.state.todos} markComplete={this.markComplete} delI = {this.delI}/>
      </div>
    )
  }
}

export default App;