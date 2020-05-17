import React from 'react';

import { userService } from '../_services';

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
        userService.getAll().then(tickets => (
            this.setState({
                tickets: tickets,
                loading: false
            })
        ));
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Support</h1>
                    <p>This page can only be accessed by support members.</p>
                </div>
                <div>
                    {
                        this.state.loading ? <div>loading..</div> : <TicketList tickets={this.state.tickets} />
                    }
                </div>
            </div>

        );
    }
}

export { SupportPage };