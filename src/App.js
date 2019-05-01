import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './components/ChatScreen'



class App extends Component {
state={
  currentScreen: 'WUN',
  username:''
}
handleSubmit = username =>{
  console.log(username);
  
      // fetch('http://localhost:3001/users', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ username }),
      //   })
      //     .then(response => {
            this.setState({
              username: username,
              currentScreen:"ChatScreen"
            })
          // })
          // .catch(error => console.error('error', error))
        
}

  render() {
    if(this.state.currentScreen === "WUN"){
      return (
        <UsernameForm onSubmit={this.handleSubmit}/>
      )
    }else if(this.state.currentScreen === 'ChatScreen'){
      return(
        <ChatScreen username={this.state.username}/>
      )
    }
    
  }
}

export default App
