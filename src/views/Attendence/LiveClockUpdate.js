import React, { Component } from 'react';

class LiveClockUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = { date: new Date() };
    }

    componentDidMount() {
        // console.log('hi');
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return <>{this.state.date.toLocaleTimeString()}</>;
    }
}

export default LiveClockUpdate;
