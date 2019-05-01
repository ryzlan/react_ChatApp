import React from 'react'

const RenderRoomUser = (props) => {
      
    if(props.users){
      return props.users.map((u, index)=>{
            return <li key={index*69}> ===> {u} </li>
        })
    }
    return null;

    
}
 
export default RenderRoomUser;