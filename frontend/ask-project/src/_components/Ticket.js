import React from 'react';

import TicketTypeIcon from './TicketTypeIcon';
import TicketPriorityIcon from './TicketPriorityIcon';

export default class Ticket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: props.ticket
        };
    }

    render() {
        return (
            <a href="#" class="list-group-item list-group-item-action">
                <div class="row d-flex justify-content-between align-items-center">
                    <div>
                        <TicketTypeIcon type={this.state.ticket.type} />
                        <TicketPriorityIcon priority={this.state.ticket.priority} top={-1} left={4} />
                    </div>

                    {/* <div class="ghx-key">
                                <a href="/browse/PSC-5252" title="PSC-5252" class="js-key-link">PSC-5252</a>
                            </div> */}
                    <div class="summary" title="As a non approved user I can enter the app, so that I am more likely to turn on the notifications">
                        <span class="inner">{this.state.ticket.summary}</span>
                    </div>
                    <span class="badge badge-primary badge-pill">{this.state.ticket.time_estimate ? this.state.ticket.time_estimate + 'h' : '-'}</span>
                </div>
                {/* <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">List group item heading</h5>
                                <small>3 days ago</small>
                                <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                <small>Donec id elit non mi porta.</small>
                            </div> */}
            </a>
        );
    }
}