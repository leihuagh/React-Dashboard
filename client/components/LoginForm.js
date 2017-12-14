import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import AuthForm from './AuthForm';
import {HashRouter} from 'react-router-dom';

class LoginForm extends Component{

  constructor(props){
    super(props);

    this.state={errors:[]};
  }

  componentWillUpdate(nextProps){

    if(!this.props.data.user && nextProps.data.user){
      //redirect to dashboard
      HashRouter.push('/dashboard');
    }
  }

  onSubmit({email, password}){
    this.props.mutate({
      variables:{email,password},
      refetchQueries:[{query}]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({
        errors
      });
    });
  }

  render(){
    return(
      <div>
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(LoginForm)
);
