import React from 'react';
import Ticket from './Ticket'

export default class TicketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: props.tickets
        };
    }

    render() {
        return (
            <div class="list-group">
                {this.state.tickets.map((ticket => ( <Ticket ticket = {ticket}/> )))}
            </div>
        );
    }
}
