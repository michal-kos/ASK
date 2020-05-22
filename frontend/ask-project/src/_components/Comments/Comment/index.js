import React from 'react';
import Moment from 'moment';
import "../Comment/index.css";
import Button from '../../Button/index';


export default class Comment extends React.Component {
    constructor(props) {
        super(props)

        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
        };
    }

    componentDidMount() {
        Moment.locale('pl');
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
        };
    }

    editClicked() {

    }

    render() {
        return (
            <tr
                onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}
            >
                <th className="th">
                    <header>
                        <div>{this.props.comment.author_display_name} added a comment - {Moment(this.props.comment.creation_date).format('DD/MMM/YY hh:mm')}</div>
                    </header>
                    <p>{this.props.comment.body}</p>

                </th>
                <td>
                    {
                        this.state.isHovering &&
                        <div class="btn-group btn-group-xs">
                            <Button icon="trash" iconSize={19} variant="secondary" onClick={this.props.deleteClicked} />
                        </div>
                    }

                </td>
            </tr>
        );
    }
}