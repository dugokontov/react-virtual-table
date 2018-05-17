import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/table/Table';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowIndexes: new Set(),
            data: [],
            header: [
                'sid',
                'id',
                'position',
                'created_at',
                'created_meta',
                'updated_at',
                'updated_meta',
                'meta',
                'Unique Key',
                'Created Date',
                'Closed Date',
                'Agency',
                'Agency Name',
                'Complaint Type',
                'Descriptor',
                'Location Type',
                'Incident Zip',
                'Incident Address',
                'Street Name',
                'Cross Street 1',
                'Cross Street 2',
                'Intersection Street 1',
                'Intersection Street 2',
                'Address Type',
                'City',
                'Landmark',
                'Facility Type',
                'Status',
                'Due Date',
                'Resolution Description',
                'Resolution Action Updated Date',
                'Community Board',
                'BBL',
                'Borough',
                'X Coordinate (State Plane)',
                'Y Coordinate (State Plane)',
                'Open Data Channel Type',
                'Park Facility Name',
                'Park Borough',
                'Vehicle Type',
                'Taxi Company Borough',
                'Taxi Pick Up Location',
                'Bridge Highway Name',
                'Bridge Highway Direction',
                'Road Ramp',
                'Bridge Highway Segment',
                'Latitude',
                'Longitude',
                'Location',
            ],
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/data.json', { mode: 'cors' })
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    onRowClick = index => {
        const { selectedRowIndexes } = this.state;
        if (selectedRowIndexes.has(index)) {
            selectedRowIndexes.delete(index);
        } else {
            selectedRowIndexes.add(index);
        }
        this.setState({ selectedRowIndexes });
    };

    onHeaderClick = index => {
        console.log(this.state.header[index]);
    }

    onCellClick = (rowIndex, columnIndex) => {
        console.log(this.state.data[rowIndex][columnIndex]);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                <div className="table">
                    <Table
                        dataFont="sans-serif 18px"
                        data={this.state.data}
                        header={this.state.header}
                        selectedRowIndexes={[...this.state.selectedRowIndexes]}
                        onRowClick={this.onRowClick}
                        onHeaderClick={this.onHeaderClick}
                        onCellClick={this.onCellClick}
                    />
                </div>
            </div>
        );
    }
}

export default App;
