import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

// const StyledCard = styled.section`
//     max-width: 800px
// `;

export default class TicketViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            tickets: []
        };
    }

    componentDidMount() {
        // Fetch tickets for the current page number.
    }

    render() {
        return (
            <Card.Group>
                <Card fluid color='red' header='Option e' />
                <Card fluid color='orange' header='Option 2' />
                <Card fluid color='yellow' header='Option 3' />
            </Card.Group>
        );
    }
}
