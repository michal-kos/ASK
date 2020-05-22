import React from 'react';

import { ticketService } from '../_services';
import { authenticationService } from '../_services';
import { Role } from '../_helpers';
import TicketList from '../_components/TicketList'
import { TicketCreation } from '../TicketCreation/TicketCreation';

class TicketsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: null,
            loading: true,
            currentUser: authenticationService.currentUserValue
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        ticketService.getAll().then(tickets => (
            this.setState({ 
                tickets: tickets,
                loading: false 
            })
        ));
    }

    handleClick = (id) => {
        this.setState({tickets: []})
    }

    render() {
        const { tickets, currentUser } = this.state;
        //const { currentUser/*, userFromApi */} = this.state;
        
        if(parseInt(currentUser.user.gidNumber) === Role.Admin) {
            return (
                <div>
                <h1>Support ADMIN</h1>
                <p>This page can only be accessed by support members.</p>
                {/* <div>
                    List of all submitted tickets:
                        {tickets &&
                            <ul>
                                {tickets.map(ticket =>
                                    <li key={ticket._id}>{ticket.summary} {tickets.summary}</li>
                                )}
                            </ul>
                        }
                </div> */}
                <div>
                    {
                        this.state.loading ? <div>loading..</div> : 
                        <TicketList
                         tickets={this.state.tickets} 
                         handleClick={this.handleClick}
                         />
                    }
                </div>
            </div>
            )
        }

        else {
            return(
                <div>
                <h1>Hi, {currentUser.user.cn}!</h1>
                <p>Here you can browse your tickets.</p>

                {/* <Link to="/tickets/create">
                    <button type="button" class="btn btn-success">Success</button>
                </Link> */}

                <a className="btn btn-primary" href="/tickets/create" role="button">Create ticket</a>
                
                <div>
                    {
                        this.state.loading ? <div>loading..</div> : 
                        <TicketList
                         tickets={this.state.tickets} 
                         handleClick={this.handleClick}
                         />
                    }
                </div>
            </div>
            )
        }
    }
}

export { TicketsPage };