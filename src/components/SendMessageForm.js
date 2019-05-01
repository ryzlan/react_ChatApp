import React, { Component } from 'react';

class SendMessageForm extends Component {
    state = { 
        message: ''
     }
     onChange = (e) =>{
        this.setState({
            message:e.target.value
        })
       this.props.onChange()
     }

     onSubmit = e =>{
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        })
     }
    render() { 
       // console.log(this.props);
        
        return ( 
            <form className="send-message-form" onSubmit={this.onSubmit}>
                <input
                    placeholder="Type message and hit ENTER"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.message}
                    disabled={this.props.disabled} />
            </form>
         );
    }
}
 
export default SendMessageForm;