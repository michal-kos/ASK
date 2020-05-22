import React from 'react';

import Comment from './Comment'
import CommentForm from './CommentForm'
import { commentService } from '../../_services';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments,
        };
    }

    saveClicked = comment => {
        var self = this;
        commentService.create(this.props.ticketId, comment).then(ticket => (
            self.setState({
                ...self.state,
                comments: ticket.comments
            })
        ));
    }

    deleteClicked = comment => {
        commentService._delete(comment._id).then(() => this.setState({...this.state, comments: this.state.comments.filter(newComment => newComment._id != comment._id)}));
    }

    render() {
        return (
            <div>
                <table class="table table-hover">
                    <tbody>
                        {
                            this.state.comments && this.state.comments.map((comment => (<Comment comment={comment} deleteClicked={() => (this.deleteClicked(comment))}/>)))
                        }
                    </tbody>
                </table>
                <CommentForm saveComment={this.saveClicked} />
            </div>
        )
    }
}