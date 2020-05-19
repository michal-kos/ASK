import React from 'react';
import Ticket from './Ticket/index'
import Comment from './Comments/Comment'
import CommentForm from './Comments/CommentForm'
import { userService } from '../_services';

export default class TicketList extends React.Component {
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
    }

    saveComment = comment => {
        userService.createComment(this.state.tickets[0]._id, comment).then(ticket => (
            this.setState({
                ...this.state,
                comments: ticket.comments
            })
        ));
    }

    render() {
        return (
            <div>
                {
                    this.state.comments.map((comment => (<Comment comment={comment} />)))
                }
                <CommentForm saveComment={this.saveComment} />
            </div>

            // <table class="table table-hover">
            //     <thead>
            //         <tr>
            //             <th scope="col">T</th>
            //             {/* <th scope="col">Key</th> */}
            //             <th scope="col">Summary</th>
            //             <th scope="col">Assignee</th>
            //             <th scope="col">Reporter</th>
            //             <th scope="col">P</th>
            //             <th scope="col">Status</th>
            //             <th scope="col">Created</th>
            //             <th scope="col">Due</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {
            //             this.state.tickets.map((ticket => (
            //                 <Ticket
            //                     ticket={ticket}
            //                     handleClick={() => this.handleClick(ticket._id)}
            //                 />))
            //             )
            //         }
            //     </tbody>
            // </table>
        );
    }
}
