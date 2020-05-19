import React from 'react';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        var comment = this.state.value;

        this.props.saveComment(comment);
        
        this.setState({value: ''})
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <form className="clearfix" onSubmit={this.handleSubmit}>
                <textarea className="form-control" ref="text" rows="3" placeholder="Your comment" value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
                <br />
                <button className="btn btn-primary float-right">Send</button>
            </form>
        );
    }
}