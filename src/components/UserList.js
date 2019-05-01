import React from 'react';

const UserList = (props) => {

    if(props.users){
        return(
            <div className="user-list">
            <h1>User list:</h1>
            <ul>

            {
                props.users.map((user, index)=>{
                    return <li key={index*88} >{user.name}  ({user.presence.state})</li>
                })
            }
            </ul>
            </div>
        )
    }else{
        return<div className="user-list"><h1>User list:</h1><p>Loading  .... </p></div> 
    }



} 
     export default UserList
;