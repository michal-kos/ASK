import React from 'react';
import logo from './logo.svg';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/Home/Home';
import AlertComponent from './components/AlertComponent/AlertComponent';  
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
// eslint-disable-next-line
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload I'm testing.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const [title, updateTitle] = React.useState(null);
  const [errorMessage, updateErrorMessage] = React.useState(null);
  return (
    <Router>
    <div className="App">
      <Header title={title}/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            {/* <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route> */}
            {/* <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route> */}
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
    </div>
    </Router>
  );
}

// eslint-disable-next-line
class MyForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { username: ''}
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.username);
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    // let header = '';
    // if (this.state.username) {
    //   header = <h1>Hello {this.state.username}</h1>;
    // } else {
    //   header = '';
    // }
    return (
      <form onSubmit={this.mySubmitHandler}>
        {/* {header} */}
        <h1>Hello {this.state.username}</h1>
        <p>Enter your name:</p>
        <input
          type="text"
          onChange={this.myChangeHandler}
        />
        <input
        type='submit'
        />
      </form>
    );
  }
}


export default App;
