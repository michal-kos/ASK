import React from 'react';
import Ticket from './Ticket/index'
import { withRouter } from 'react-router-dom';

class TicketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: props.tickets,
            comments: props.tickets[0].comments,
            handleClick: props.handleClick
        };
    }

    handleClick = (id) => {
        this.state.handleClick(id);
        this.props.history.push('/ticket/'+id)
    }

    render() {
        return (
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">T</th>
                        {/* <th scope="col">Key</th> */}
                        <th scope="col">Summary</th>
                        <th scope="col">Assignee</th>
                        <th scope="col">Reporter</th>
                        <th scope="col">P</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created</th>
                        <th scope="col">Due</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.tickets.map((ticket => (
                            <Ticket
                                ticket={ticket}
                                handleClick={() => this.handleClick(ticket._id)}
                            />))
                        )
                    }
                </tbody>
            </table>
        );
    }
}

export default withRouter(TicketList)
