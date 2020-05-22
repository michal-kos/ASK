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
        return (
            <div class="container-fluid">
                <div>{!this.state.loading &&
                    <div>
                        <Comment ticketId={this.state.ticket._id} comments={this.state.ticket.comments} />
                    </div>
                }</div>
            </div>
        );
    }
}
