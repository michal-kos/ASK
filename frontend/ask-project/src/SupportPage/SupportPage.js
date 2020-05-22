import React from 'react';

import { Router, Route, Link } from 'react-router-dom';
import { ticketService } from '../_services';

import TicketList from '../_components/TicketList'

class SupportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: null,
            loading: true
        };
    }

    componentDidMount() {
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
        return (
            <div class="container-fluid">
                <div>
                    <h1>Support</h1>
                    <p>This page can only be accessed by support members.</p>
                </div>
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

        );
    }
}

export { SupportPage };