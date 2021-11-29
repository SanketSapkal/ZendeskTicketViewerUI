import React, { useState } from 'react';
import { Card, Grid, Label } from 'semantic-ui-react';

export default class TicketViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            tickets: [],
            error: false
        };
    }

    componentDidMount() {
        // Fetch tickets for the current page number.
        fetch('http://localhost:3000/ticketsOnPage/1')
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                // TODO: Check if the tickets list is empty, if it is then error
                // has occured on server side
                this.setState({
                    page: 1,
                    tickets: response
                })
            })
            .catch(error => {
                console.log(error);
            })
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
                <Grid.Column width="14">
                    {this.renderTickets()}
                </Grid.Column>
            </Grid>
        );
    }
}
