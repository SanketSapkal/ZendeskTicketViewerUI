import React from 'react';
import { Button, Card, Grid, Label } from 'semantic-ui-react';

export default class TicketViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            tickets: [],
            error: false,
            count: 0,
            fetching: true,
            previousEnd: true,
            nextEnd: false
        };

        this.getNextPage = this.getNextPage.bind(this);
        this.getPreviousPage = this.getPreviousPage.bind(this);
    }

    componentDidMount() {
        // Fetch tickets for the current page number.
        fetch('http://localhost:3000/ticketsOnPage/1')
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                // TODO: Check if the tickets list is empty, if it is then error
                // has occurred on server side
                this.setState({
                    page: 1,
                    tickets: response,
                    error: false
                })
            })
            .catch(error => {
                console.log(error);
            })

        fetch('http://localhost:3000/tickets/count')
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                this.setState({
                    count: response.ticketCount,
                    error: false,
                    fetching: false,
                    previousEnd: true
                })

                if (this.state.count < this.state.page * 25) {
                    this.setState({nextEnd: true});
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    getNextPage(_event, _data) {
        var newPage = this.state.page + 1;
        // Fetch tickets for the new page number.
        fetch('http://localhost:3000/ticketsOnPage/' + newPage)
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                // TODO: Check if the tickets list is empty, if it is then error
                // has occurred on server side
                this.setState({
                    page: newPage,
                    tickets: response,
                    error: false,
                    previousEnd: false
                })

                // Disable next button on last page
                if (this.state.count < this.state.page * 25) {
                    this.setState({nextEnd: true});
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    getPreviousPage(_event, _data) {
        var newPage = this.state.page - 1;
        // Fetch tickets for the new page number.
        fetch('http://localhost:3000/ticketsOnPage/' + newPage)
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                // TODO: Check if the tickets list is empty, if it is then error
                // has occurred on server side
                this.setState({
                    page: newPage,
                    tickets: response,
                    error: false,
                    nextEnd: false
                })

                // Disable previous button on first page
                if (this.state.page === 1) {
                    this.setState({previousEnd: true});
                }
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
            <>
            <Grid>
                <Grid.Column floated="right">
                    <Button
                        icon
                        disabled={this.state.fetching || this.state.previousEnd}
                        color="blue"
                        onClick={this.getPreviousPage}
                    >
                        Previous
                    </Button>
                </Grid.Column>
                <Grid.Column><h2>{this.state.page}</h2></Grid.Column>
                <Grid.Column floated="left">
                    <Button
                        icon
                        disabled={this.state.fetching || this.state.nextEnd}
                        color="blue"
                        onClick={this.getNextPage}
                    >
                        Next
                    </Button>
                </Grid.Column>
            </Grid>
            <Grid centered>
                <Grid.Column width="14">
                    {this.renderTickets()}
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column floated="right">
                    <Button
                        icon
                        disabled={this.state.fetching || this.state.previousEnd}
                        color="blue"
                        onClick={this.getPreviousPage}
                    >
                        Previous
                    </Button>
                </Grid.Column>
                <Grid.Column><h2>{this.state.page}</h2></Grid.Column>
                <Grid.Column floated="left">
                    <Button
                        icon
                        disabled={this.state.fetching || this.state.nextEnd}
                        color="blue"
                        onClick={this.getNextPage}
                    >
                        Next
                    </Button>
                </Grid.Column>
            </Grid>
            </>
        );
    }
}
