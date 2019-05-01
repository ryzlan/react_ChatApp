import React, { Component } from 'react';

class NewRoomForm extends Component {
    state = { 
        roomName:''
     }

    handleChange=(e)=> {
        this.setState({
            roomName: e.target.value
        })
    }

    handleSubmit= (e)=> {
        e.preventDefault()
        this.props.onSubmit(this.state.roomName)
        this.setState({
            roomName: ''
        })
    }
    render() { 
        return ( 
            <div className="new-room-form">
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text" 
                    placeholder="Create a room" 
                    value={this.state.roomName} 
                    onChange={this.handleChange}
                    required />
                <button id="create-room-btn" type="submit">+</button>
        </form>
        </div>
         );
    }
}
 
export default NewRoomForm;