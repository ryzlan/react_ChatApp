import React from 'react'


class UsernameForm extends React.Component {
    state = { 
        username:'',
        error:''
     }
     onChange = (e) =>{
        this.setState({
            username:e.target.value,
            error:''
        })
     }

     onSubmit = e =>{
         e.preventDefault()
         if(this.state.username.length < 4){
             this.setState({
                 error:'Username Cannot be less than 4 chars'
             })
             return;
         }
         this.props.onSubmit(this.state.username)
     }
    render() { 
        return ( 
            <div className="User-form-wrapper">
                <h1>React Chat App</h1>
              {this.state.error && <span className="error-text">{this.state.error}</span> }  
                <form onSubmit={this.onSubmit}>
                    <input type='text' placeholder="Name ?" onChange={this.onChange} />
                    <button type='submit'>Add User</button>
                </form>
            </div>
         );
    }
}
 
export default UsernameForm;