import React from 'react';

function Header(){
    return (
        <header style={headerStyle}>
            <h1>To Do List</h1>
        </header>
    )
}

const headerStyle = {
    padding: '20px',
    textAlign: 'center',
    background: '#1abc9c',
    color: 'white',
    fontSize: '30px'
}

export default Header; 