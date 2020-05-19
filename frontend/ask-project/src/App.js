import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from './_helpers';
import { authenticationService } from './_services';
import { PrivateRoute } from './_components'
import { HomePage } from './HomePage/HomePage';
import { SupportPage } from './SupportPage/SupportPage';
import { LoginPage } from './LoginPage/LoginPage';
import TicketPage from './TicketPage/TicketPage'

//import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && parseInt(x.user.gidNumber) === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    handleClick = (id) => {
        history.push('/admin/' + id);
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div>
                        <div className="container">
                            <div className="row">
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/admin" roles={[Role.Admin]} component={SupportPage} handleClick={this.handleClick} />
                                <PrivateRoute exact path="/admin/:ticketId" roles={[Role.Admin]} component={TicketPage} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
