import React from 'react';
import Moment from 'moment';

import TicketTypeIcon from '../TicketTypeIcon';
import TicketPriorityIcon from '../TicketPriorityIcon';

export default class Ticket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: props.ticket,
            handleClick: props.handleClick 
        };
    }

    componentDidMount() {
        Moment.locale('pl');
    }

    handleClick() {

    }

    render() {
        
        return (
            <tr onClick={this.state.handleClick}>
                <td><TicketTypeIcon type={this.state.ticket.type}></TicketTypeIcon></td>
                <td>{this.state.ticket.summary}</td>
                <td>{this.state.ticket.assignee}</td>
                <td>{this.state.ticket.creator_display_name}</td>
                <td><TicketPriorityIcon priority={this.state.ticket.priority} /></td>
                <td><div class="badge badge-primary">{this.state.ticket.status}</div></td>
                <td>{Moment(this.state.ticket.creation_date).format('DD/MMM/YY')}</td>
                <td>{Moment(this.state.ticket.due_date).format('DD/MMM/YY')}</td>
            </tr>
        );
    }
}
