import React from 'react';
import PropTypes from 'prop-types';
import StringWidth from '../../helpers/StringWidth';
import FixedHeader from './FixedHeader';
import VirtualData from './VirtualData';

const style = {
    header: { overflow: 'hidden' },
};

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftScrollPosition: 0,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let stringWidthMeasure = prevState.stringWidthMeasure;
        let shouldMeasureData = nextProps.data !== prevState.data;

        if (prevState.dataFont !== nextProps.dataFont) {
            stringWidthMeasure = new StringWidth(nextProps.dataFont);
            shouldMeasureData = true;
        }

        if (shouldMeasureData) {
            return {
                stringWidthMeasure,
                dataFont: nextProps.dataFont,
                data: nextProps.data,
                theWidestStrings: stringWidthMeasure.findTheWidestForEachColumn(
                    nextProps.data,
                ),
            };
        }
        return null;
    }

    onHorizontalScrollChange = leftScrollPosition => {
        this.setState(prevState => {
            if (prevState.leftScrollPosition !== leftScrollPosition) {
                return { leftScrollPosition };
            }
            return null;
        });
    };

    render() {
        const {
            header,
            data,
            selectedRowIndexes,
            onRowClick,
            onHeaderClick,
            onCellClick,
        } = this.props;
        const { theWidestStrings, leftScrollPosition } = this.state;
        return [
            <div key="header" style={style.header}>
                <FixedHeader
                    header={header}
                    theWidestStrings={theWidestStrings}
                    leftOffset={leftScrollPosition}
                    onHeaderClick={onHeaderClick}
                />
            </div>,
            <VirtualData
                key="data"
                header={header}
                theWidestStrings={theWidestStrings}
                data={data}
                onHorizontalScrollChange={this.onHorizontalScrollChange}
                selectedRowIndexes={selectedRowIndexes}
                onRowClick={onRowClick}
                onCellClick={onCellClick}
            />,
        ];
    }
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    dataFont: PropTypes.string.isRequired,
    header: PropTypes.array.isRequired,
    selectedRowIndexes: PropTypes.array,
    onRowClick: PropTypes.func,
    onHeaderClick: PropTypes.func,
    onCellClick: PropTypes.func,
};

Table.defaultProps = {
    selectedRowIndexes: [],
    onRowClick: undefined,
    onHeaderClick: undefined,
    onCellClick: undefined,
};

export default Table;
