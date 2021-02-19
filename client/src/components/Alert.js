import React from 'react'

export default function Alert(props) {
    const isDone = props.done;
    const alertStyle = {
        marginRight: '10px',
        marginLeft: '10px',
        textAlign: 'center'
    }
    if(isDone){
        return (
        <div className="alert alert-success" style={alertStyle} role="alert">
            Hooray, you're all done!
        </div>);
    }else{
        return (null);
    }  
}