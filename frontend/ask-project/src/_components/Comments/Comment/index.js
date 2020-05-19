import React from 'react';
import Moment from 'moment';

export default class Comment extends React.Component {
    componentDidMount() {
        Moment.locale('pl');
    }

    render() {
        return (
            <div className="comment">
                <header className="clearfix">
                    <div>{this.props.comment.author_display_name} added a comment - {Moment(this.props.comment.creation_date).format('DD/MMM/YY hh:mm')}</div>
                </header>
                <p>{this.props.comment.body}</p>
            </div>
        );
    }
}