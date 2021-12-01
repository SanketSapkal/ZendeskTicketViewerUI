import React from 'react';
import {Button,
        Card,
        Grid,
        Icon,
        Label,
        Modal} from 'semantic-ui-react';

export default class TicketViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            tickets: [],
            error: false,
            errorMessage: undefined,
            count: 0,
            fetching: true,
            previousEnd: true,
            nextEnd: false,
            displayTicket: false,
            currentTicket: undefined
        };

        this.getNextPage = this.getNextPage.bind(this);
        this.getPreviousPage = this.getPreviousPage.bind(this);
        this.getTicket = this.getTicket.bind(this);
        this.closeTicket = this.closeTicket.bind(this);
    }

    componentDidMount() {
        // Fetch tickets for the current page number.
        fetch('http://localhost:3000/ticketsOnPage/1')
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                if(Array.isArray(response)) {
                    this.setState({
                        page: 1,
                        tickets: response,
                        error: false
                    })
                } else {
                    // Got an error from server
                    this.setState({
                        error: true,
                        errorMessage: response.error
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                    errorMessage: "Error occurred while fetching data from node backend"
                });
            })

        // Fetch the count only if no error occurred in the previous api call
        if(this.state.error === false) {
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
                    this.setState({
                        error: true,
                        errorMessage: "Error occurred while fetching data from node backend"
                    });
                })
        }
    }

    getNextPage(_event, _data) {
        var newPage = this.state.page + 1;
        // Fetch tickets for the new page number.
        fetch('http://localhost:3000/ticketsOnPage/' + newPage)
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                if(Array.isArray(response)) {
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
                } else {
                    // Got an error from server
                    this.setState({
                        error: true,
                        errorMessage: response.error
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                    errorMessage: "Error occurred while fetching data from node backend"
                });
            })
    }

    getPreviousPage(_event, _data) {
        var newPage = this.state.page - 1;
        // Fetch tickets for the new page number.
        fetch('http://localhost:3000/ticketsOnPage/' + newPage)
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                if(Array.isArray(response)) {
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
                } else {
                    // Got an error from server
                    this.setState({
                        error: true,
                        errorMessage: response.error
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                    errorMessage: "Error occurred while fetching data from node backend"
                });
            })
    }

    getTicket(_event, data) {
        const ticketId = data.ticketId;
        fetch('http://localhost:3000/ticket/' + ticketId)
            .then(responseUnParsed => responseUnParsed.json())
            .then(response => {
                if(response.error === undefined) {
                    this.setState({
                        displayTicket: true,
                        currentTicket: response
                    });
                } else {
                    // Got an error from server
                    this.setState({
                        error: true,
                        errorMessage: response.error
                    });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true,
                    errorMessage: "Error occurred while fetching data from node backend"
                });
            })
    }

    closeTicket() {
        this.setState({
            currentTicket: undefined,
            displayTicket: false
        });
    }

    renderTicket() {
        return (
            <Modal
             open={this.state.displayTicket}>
                <Modal.Content>
                    <p>{JSON.stringify(this.state.currentTicket)}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                     color='black'
                     onClick={this.closeTicket}>
                        <Icon name='remove'></Icon>
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    renderErrorModal() {
        return (
            <Modal
             open={this.state.error}>
                <Modal.Content>
                    <p>{this.state.errorMessage}</p>
                    <p>{"Try refreshing the page"}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                     color='black'
                     onClick={this.closeErrorModal}>
                        <Icon name='remove'></Icon>
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }

    renderTickets() {
        const tickets = this.state.tickets.map(ticket =>(
            <Card
             fluid
             onClick={this.getTicket}
             ticketId={ticket.id}>
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
                        // Disable button while fetching data or on 1st page
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
                        // Disable button while fetching data or on last page
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
                    {this.renderTicket()}
                    {this.renderErrorModal()}
                    {this.renderTickets()}
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column floated="right">
                    <Button
                        icon
                        // Disable button while fetching data or on 1st page
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
                        // Disable button while fetching data or on last page
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
