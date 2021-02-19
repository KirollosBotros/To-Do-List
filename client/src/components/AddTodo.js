import React, { Component } from 'react'

export class AddTodo extends Component {
    state = {
        title: ''
    }
    
    onChange = (e) => this.setState({title: e.target.value});
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
        document.getElementById("inputField").reset();
    }

    render() {
        const inputStyle = {
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: '10px',
        }

        const addBtnStyle = {
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '12px',
            paddingRight: '28px',
            paddingLeft: '28px',
        }

        const clearBtnStyle = {
            paddingLeft: '20px',
            paddingRight: '20px',
            marginTop: '10px',
            marginBottom: '10px',
            marginRight: '12px',
            whiteSpace: 'nowrap',
            textAlign: 'center'
        }

        return (
            <form id="inputField" onSubmit={this.onSubmit}>
                <div className="form-group input-group-prepend">
                    <input className="form-control" 
                        placeholder="Add Todo..."
                        onChange={this.onChange}
                        style={inputStyle}/>
                    <button type="submit" className="btn btn-primary" style={addBtnStyle}>Add</button>
                    <button type="button" className="btn btn-danger" style={clearBtnStyle}
                    onClick={this.props.clearList.bind(this)}>Clear All</button>
                </div>
            </form>  
        )
    }
}

export default AddTodo