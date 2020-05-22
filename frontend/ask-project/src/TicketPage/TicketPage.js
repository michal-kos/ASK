import React from 'react';

import { ticketService } from '../_services';
import { authenticationService } from '../_services';
import { Role } from '../_helpers';
import TicketList from '../_components/TicketList'
import { TicketCreation } from '../TicketCreation/TicketCreation';
import Comment from '../_components/Comments'

export default class TicketPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticketId: props.match.params.ticketId,
            ticket: null,
            loading: true
        };
    }

    componentDidMount() {
        ticketService.getById(this.state.ticketId).then(ticket => (
            this.setState({
                ...this.state,
                ticket: ticket,
                loading: false
            })
        ));
    }

    render() {
        var path = '/ticket/edit/'+this.state.ticketId
        return (
            <div class="container-fluid">
                <div>{!this.state.loading &&
                    <div>
                        {this.state.ticket.summary}
                        <a className="btn btn-warning" href={path} role="button">Edit ticket</a>
                        <Comment ticketId={this.state.ticket._id} comments={this.state.comments} />
                    </div>
                }</div>
            </div>
        );
    }
}
