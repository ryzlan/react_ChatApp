import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'


 
 import UserList from './UserList'

import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'

class ChatScreen extends Component {
    state = { 
        messages:[],
        currentRoom:{},
        currentUser:{},
        userTyping:[],
        joinableRooms:[],
        joinedRooms:[]
     }
    componentDidMount(){
       const chatManager= new ChatManager({
           instanceLocator:"v1:us1:9f0d98d9-3938-4b95-9afc-3e90b188b3b3",
           userId:this.props.username.toString(),
           tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9f0d98d9-3938-4b95-9afc-3e90b188b3b3/token' })
       })

       chatManager
        .connect()
        .then((currentUser)=>{
            console.log(currentUser)
            this.setState({currentUser:currentUser})
            return currentUser.getJoinableRooms()
            .then(joinableRooms =>{
                this.setState({
                    joinableRooms,
                    joinedRooms:this.state.currentUser.rooms
                })
            })
        })
        .catch(err=>console.error(err))
        
    }

    subscribeToRoom=(roomId)=> {
        
        this.setState({
            messages: []
        });
        this.state.currentUser.subscribeToRoomMultipart({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                },
                onUserStartedTyping: user => {
                   // console.log(`User ${user.name} started typing`)
                    this.setState({
                        userTyping:[...this.state.userTyping , user.name],
                    })
                  },
                  onUserStoppedTyping: user => {
                   // console.log(`User ${user.name} stopped typing`)
                    this.setState({
                        userTyping:this.state.userTyping.filter(
                            username => username !== user.name
                        ),
                    })
                  },
                onPresenceChange: () => this.forceUpdate(),
                onUserLeft: () => this.forceUpdate(),
                onUserJoined: () => this.forceUpdate()
        }

        })
        .then(currentRoom => {
            this.setState({currentRoom: currentRoom})
            return this.state.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.state.currentUser.rooms
                })
            })
           
        })
        .catch(err => console.log('error on subscribing: ', err))
    }

    createRoom=(name)=> {
        this.state.currentUser.createRoom({
            name
        })
        .then(room =>{
            //console.log(room);
            this.subscribeToRoom(room.id)
        })
        .catch(err => console.log(err))
    }
    handleMessage = text =>{
        this.state.currentUser.sendMessage({
            roomId:this.state.currentRoom.id,
            text:text
        })
    }
    handleTypingIndicator = () =>{
        
        this.state.currentUser
            .isTypingIn({
                roomId:this.state.currentRoom.id
            })
            .catch((err)=> console.error(err))
    }

    render() { 
        console.log(this.state);
        
        return ( 
            <div className="app">
                <RoomList
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    subscribeToRoom={this.subscribeToRoom}
                    currentRoom={this.state.currentRoom} />
                <MessageList
                    currentRoomId={this.state.currentRoom.id}
                    messages={this.state.messages} 
                    userTyping={this.state.userTyping}/>
                <UserList users={this.state.currentRoom.users} />
                <NewRoomForm onSubmit={this.createRoom} />
                <SendMessageForm
                    sendMessage={this.handleMessage}
                    disabled={!this.state.currentRoom.id} 
                    onChange={this.handleTypingIndicator}
                    />
            </div>
         );
    }
}
 
export default ChatScreen;