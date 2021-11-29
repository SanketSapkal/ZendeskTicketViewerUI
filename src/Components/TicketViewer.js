import React, { useState } from 'react';
import { Card, Grid, Label } from 'semantic-ui-react';

export default class TicketViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            tickets: [{
                "url":"https://zcc52495.zendesk.com/api/v2/tickets/2.json",
                "id":2,
                "external_id":null,
                "via":{
                    "channel":"api",
                    "source":{"from":{},"to":{},"rel":null}
                },
                "created_at":"2021-11-28T22:51:03Z",
                "updated_at":"2021-11-28T22:51:03Z",
                "type":null,
                "subject":"velit eiusmod reprehenderit officia cupidatat",
                "raw_subject":"velit eiusmod reprehenderit officia cupidatat",
                "description":"Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n\nAliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.",
                "priority":null,
                "status":"open",
                "recipient":null,
                "requester_id":1910731209245,
                "submitter_id":1910731209245,
                "assignee_id":1910731209245,
                "organization_id":1900158076305,
                "group_id":4414345883159,
                "collaborator_ids":[],
                "follower_ids":[],
                "email_cc_ids":[],
                "forum_topic_id":null,
                "problem_id":null,
                "has_incidents":false,
                "is_public":true,
                "due_at":null,
                "tags":["est","incididunt","nisi"],
                "custom_fields":[],
                "satisfaction_rating":null,
                "sharing_agreement_ids":[],
                "fields":[],
                "followup_ids":[],
                "ticket_form_id":1900001015685,
                "brand_id":1900000528765,
                "allow_channelback":false,
                "allow_attachments":true
            },
            {
                "url":"https://zcc52495.zendesk.com/api/v2/tickets/2.json",
                "id":2,
                "external_id":null,
                "via":{
                    "channel":"api",
                    "source":{"from":{},"to":{},"rel":null}
                },
                "created_at":"2021-11-28T22:51:03Z",
                "updated_at":"2021-11-28T22:51:03Z",
                "type":null,
                "subject":"velit eiusmod reprehenderit officia cupidatat",
                "raw_subject":"velit eiusmod reprehenderit officia cupidatat",
                "description":"Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n\nAliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.",
                "priority":null,
                "status":"open",
                "recipient":null,
                "requester_id":1910731209245,
                "submitter_id":1910731209245,
                "assignee_id":1910731209245,
                "organization_id":1900158076305,
                "group_id":4414345883159,
                "collaborator_ids":[],
                "follower_ids":[],
                "email_cc_ids":[],
                "forum_topic_id":null,
                "problem_id":null,
                "has_incidents":false,
                "is_public":true,
                "due_at":null,
                "tags":["est","incididunt","nisi"],
                "custom_fields":[],
                "satisfaction_rating":null,
                "sharing_agreement_ids":[],
                "fields":[],
                "followup_ids":[],
                "ticket_form_id":1900001015685,
                "brand_id":1900000528765,
                "allow_channelback":false,
                "allow_attachments":true
            }]
        };
    }

    componentDidMount() {
        // Fetch tickets for the current page number.
    }

    renderTickets() {
        const tickets = this.state.tickets.map(ticket =>(
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Grid centered>
                            <Grid.Column width="3">
                                {"ID: " + ticket.id}
                            </Grid.Column>
                            <Grid.Column width="9" textAlign="left">
                                {ticket.subject}
                            </Grid.Column>
                            <Grid.Column width="3" textAlign="right">
                                {"Status: " + ticket.status}
                            </Grid.Column>
                        </Grid>
                    </Card.Header>
                    <Card.Description>{ticket.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label.Group circular>
                        {ticket.tags.map(tag => (<Label as="a">{tag}</Label>))}
                    </Label.Group>
                </Card.Content>
            </Card>
        ));

        return <Card.Group>{tickets}</Card.Group>
    }

    render() {
        return (
            <Grid centered>
                <Grid.Column width="12">
                    {this.renderTickets()}
                </Grid.Column>
            </Grid>
        );
    }
}
