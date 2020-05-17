import React from 'react';

import { ticketService } from '../_services';
import { authenticationService } from '../_services';
import { Role } from '../_helpers';
import { PrivateRoute } from '../_components'
import { TicketCreation } from '../TicketCreation/TicketCreation';

class TicketsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: null,
            currentUser: authenticationService.currentUserValue
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        ticketService.getAll().then(tickets => this.setState({ tickets }));
    }

    render() {
        const { tickets, currentUser } = this.state;
        //const { currentUser/*, userFromApi */} = this.state;

        if(parseInt(currentUser.user.gidNumber) === Role.Admin) {
            return (
                <div>
                <h1>Support ADMIN</h1>
                <p>This page can only be accessed by support members.</p>
                <div>
                    All users from secure (support only) api end point:
                    {tickets &&
                        <ul>
                            {tickets.map(ticket =>
                                <li key={ticket._id}>{ticket.creator_display_name} {tickets.summary}</li>
                            )}
                        </ul>
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

                {/* <Router history={history}>
                    <div>
                        {currentUser && <Link to="/tickets/create" >Create Ticket</Link> }
                        <PrivateRoute exact path="/tickets/create" component={TicketCreation} />
                    </div>
                </Router> */}
                
                <div>
                    All users from secure (support only) api end point:
                    {tickets &&
                        <ul>
                            {tickets.map(ticket =>
                                <li key={ticket._id}>{ticket.creator_display_name} {tickets.summary}</li>
                            )}
                        </ul>
                    }
                </div>
            </div>
            )
        }
        // return (
        //     <div>
        //         <h1>Support</h1>
        //         <p>This page can only be accessed by support members.</p>
        //         <div>
        //             All users from secure (support only) api end point:
        //             {tickets &&
        //                 <ul>
        //                     {tickets.map(ticket =>
        //                         <li key={ticket._id}>{ticket.creator_display_name} {tickets.summary}</li>
        //                     )}
        //                 </ul>
        //             }
        //         </div>
        //     </div>
        // );
    }
}

export { TicketsPage };