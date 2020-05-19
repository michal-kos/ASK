import React from 'react';

import { userService } from '../_services';

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
        userService.getById(this.state.ticketId).then(ticket => (
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
                <div>{this.state.lodading ? <div>loading..</div> : this.state.ticket.summary}</div>
            </div>
        );
    }
}
