import React from 'react';

import { userService } from '../_services';

class SupportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: null
        };
    }

    componentDidMount() {
        userService.getAll().then(tickets => this.setState({ tickets }));
    }

    render() {
        const { tickets } = this.state;
        return (
            <div>
                <h1>Support</h1>
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
        );
    }
}

export { SupportPage };