import React from 'react';


const TypingIndicator = (props) => { 

    if(props.userTyping.length === 0 ){
        return null
    }else if(props.userTyping.length === 1){
        return <p>{props.userTyping[0]} is typing ... </p>
    }else if(props.userTyping.length > 1){
        return <p>{props.userTyping.join(' and ') } are typing ...</p>
    }
}
 
export default TypingIndicator