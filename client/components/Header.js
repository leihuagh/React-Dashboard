import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import mutation from '../mutations/Logout';
import query from '../queries/CurrentUser';
import {Link} from 'react-router-dom';

class Header extends Component{

  onLogoutClick(){
    this.props.mutate({
      refetchQueries:[{query}]
    });
  }

  renderButtons(){
    const {loading, user} = this.props.data;

    if(loading){return <div/>;}

    if(user){
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Admin Dashboard</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);
