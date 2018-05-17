import React from 'react';
import PropTypes from 'prop-types';
import Td from './Td';

function getStyle(leftOffset) {
    return {
        table: {
            marginLeft: -leftOffset,
        },
        tbody: {
            visibility: 'hidden',
        },
    };
}

class FixedHeader extends React.Component {
    onClick = e => {
        this.props.onHeaderClick(+e.currentTarget.dataset.index);
    }

    render() {
        const { header, theWidestStrings, leftOffset, onHeaderClick } = this.props;
        const onClick = onHeaderClick ? this.onClick : undefined;
        const domHeader = header.map((header, index) => (
            <th key={index} data-index={index} onClick={onClick}>{header}</th>
        ));
        const theWidestData = theWidestStrings.map((value, index) => (
            <Td key={index} value={value} />
        ));
        const style = getStyle(leftOffset);
        return (
            <table style={style.table}>
                <thead>
                    <tr>{domHeader}</tr>
                </thead>
                <tbody style={style.tbody}>
                    <tr>{theWidestData}</tr>
                </tbody>
            </table>
        );
    }
}

FixedHeader.propTypes = {
    header: PropTypes.array.isRequired,
    theWidestStrings: PropTypes.array.isRequired,
    leftOffset: PropTypes.number,
    onHeaderClick: PropTypes.func,
};

FixedHeader.defaultProps = {
    leftOffset: 0,
    onHeaderClick: undefined,
};

export default FixedHeader;
