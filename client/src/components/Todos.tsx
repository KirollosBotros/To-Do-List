import React, { Component } from 'react';
import TodoItem from './TodoItem';

interface PropsType {
  todos: Array<{ id: string, completed: boolean, title: string }>;
  markComplete: (id: string) => void;
  delI: (id: string) => void;
}

class Todos extends React.Component<PropsType>{
  render(){
    return this.props.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete}
        delI={this.props.delI}/>
    ));
  }
}

export default Todos;