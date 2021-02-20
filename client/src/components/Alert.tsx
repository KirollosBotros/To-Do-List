import React from 'react'

interface PropsType {
    done: boolean;
}

export default function Alert({done}: PropsType) {
    const isDone = done;

    const alertStyle = {
        marginRight: '10px',
        marginLeft: '10px',
        textAlign: 'center'
    } as React.CSSProperties;

    if(isDone){
        return (
        <div className="alert alert-success" style={alertStyle} role="alert">
            Hooray, you're all done!
        </div>);
    }else{
        return (null);
    }  
}