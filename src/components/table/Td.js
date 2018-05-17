import React from 'react';

class Td extends React.PureComponent {
    onClick = () => {
        const { rowIndex, columnIndex, onCellClick } = this.props;
        onCellClick(rowIndex, columnIndex);
    };

    render() {
        const { value, onCellClick } = this.props;
        const str = value == null ? '' : value.toString();
        const onClick = onCellClick ? this.onClick : undefined;
        return <td onClick={onClick}>{str}</td>;
    }
}

export default Td;
