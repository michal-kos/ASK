import React from 'react';

import { ticketService } from '../_services';
import { authenticationService } from '../_services';
import { Role } from '../_helpers';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';

class TicketCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        //ticketService.getAll().then(tickets => this.setState({ tickets }));
    }

    render() {
        const { currentUser } = this.state;
        //const { currentUser/*, userFromApi */} = this.state;

        return (
            <div>
            <h1>Hi, {currentUser.user.cn}</h1>
            <p>On this page you can add a new ticket for our support team. Just fill the form below.</p>
            <div>
                {/* <div className="alert alert-info">
                    <strong>Normal User</strong> - U: user P: user<br />
                    <strong>Administrator</strong> - U: admin P: admin
                </div> */}
                <h2>New Ticket</h2>
                <Formik
                    initialValues={{
                        summary: '',
                        description: '',
                        priority: 'lowest',
                        type: 'task',
                        assignee: '',
                        due_date: new Date()
                    }}
                    validationSchema={Yup.object().shape({
                        summary: Yup.string().required('Summary is required'),
                        description: Yup.string().required('Description is required'),
                        priority: Yup.string().required('Priority is required'),
                        type: Yup.string().required('Type is required'),
                        assignee: Yup.string().required('Assignee is required'),
                    })}
                    onSubmit={({ summary, description, priority, type, assignee, due_date}, { setStatus, setSubmitting }) => {
                        setStatus();
                        var payload = {
                            "summary": summary,
                            "description": description,
                            "priority": priority,
                            "type": type,
                            "assignee": assignee,
                            "due_date": due_date
                        }
                        //console.log(payload)
                        ticketService.createTicket(payload)
                            .then(
                                // () => { if (this.isMounted) {
                                //     setSubmitting(false)
                                // }},
                                ticket => {
                                    //const { from } = this.props.location.state || { from: { pathname: "/tickets" } };
                                    this.props.history.push('/tickets');
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, values, isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="summary">Summary</label>
                                <Field name="summary" type="text" className={'form-control' + (errors.summary && touched.summary ? ' is-invalid' : '')} />
                                <ErrorMessage name="summary" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <Field name="priority" as="select" type="text" placeholder="select priority" className={'form-control' + (errors.priority && touched.priority ? ' is-invalid' : '')}>
                                <option value="1">Lowest</option>
                                <option value="2">Low</option>
                                <option value="3">Medium</option>
                                <option value="4">High</option>
                                <option value="5">Highest</option>
                                </Field>
                                <ErrorMessage name="priority" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <Field name="type" as="select" type="text" placeholder="select type" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')}>
                                <option value="task">Task</option>
                                <option value="bug">Bug</option>
                                <option value="story">Story</option>
                                </Field>
                                <ErrorMessage name="type" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="assignee">Assignee</label>
                                <Field name="assignee" type="text" className={'form-control' + (errors.assignee && touched.assignee ? ' is-invalid' : '')} />
                                <ErrorMessage name="assignee" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <div><label htmlFor="due_date">Due date</label></div>                                
                                <DatePicker 
                                    name = "due_date"
                                    selected = {values.due_date}
                                    onChange = {date => setFieldValue('due_date', date)}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" disabled={isSubmitting}>Submit</button>
                                <a className="btn btn-danger" href="/tickets" role="button">Cancel</a>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{JSON.stringify(status)}</div>
                            }
                        </Form>
                    )}
                />
            </div>
        </div>
        )
    }
}

export { TicketCreation };