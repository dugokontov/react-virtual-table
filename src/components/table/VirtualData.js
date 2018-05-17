import React from 'react';
import PropTypes from 'prop-types';
import Td from './Td';

const DISPLAY_ROWS_BEFORE = 10;
const DISPLAY_ROWS_AFTER = 40;
const SELECTED_CLASS_NAME = 'row-selected';

function getStyle(headerHeight, rowHeight, startRow, endRow, numberOfRows) {
    const tableMarginTop = startRow * rowHeight - rowHeight;
    const tableMarginBottom = Math.max(numberOfRows - endRow, 0) * rowHeight;
    return {
        container: {
            overflowY: 'auto',
            height: `calc(100% - ${headerHeight}px)`,
            marginTop: -rowHeight,
        },
        thead: {
            visibility: 'hidden',
        },
        firstRow: {
            visibility: 'hidden',
        },
        table: {
            marginTop: tableMarginTop,
            marginBottom: tableMarginBottom,
        },
    };
}

class VirtualData extends React.Component {
    constructor(params) {
        super(params);

        this.state = {};

        this.dataRow = React.createRef();
        this.headerRow = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.data !== prevState.data ||
            nextProps.header !== prevState.header
        ) {
            return {
                data: nextProps.data,
                header: nextProps.header,
                startRow: 0,
                endRow: DISPLAY_ROWS_AFTER,
                rowHeight: prevState.rowHeight || 20,
                headerHeight: prevState.headerHeight || 20,
            };
        }
        return null;
    }

    componentDidMount() {
        this.setState({
            rowHeight: this.dataRow.current.clientHeight,
            headerHeight: this.headerRow.current.clientHeight,
        });
    }

    componentDidUpdate() {
        this.setState(prevState => {
            const rowHeight = this.dataRow.current.clientHeight;
            const headerHeight = this.headerRow.current.clientHeight;

            if (
                prevState.rowHeight !== rowHeight ||
                prevState.headerHeight !== headerHeight
            ) {
                return { rowHeight, headerHeight };
            }
            return null;
        });
    }

    onScroll = e => {
        const { scrollTop, scrollLeft } = e.target;
        const rowHeight = this.state.rowHeight;
        const numberOfRows = this.props.data.length;
        const rowIndexOnTop = Math.floor(scrollTop / rowHeight);
        const startRow = Math.max(
            0,
            Math.min(rowIndexOnTop, numberOfRows - DISPLAY_ROWS_AFTER) -
                DISPLAY_ROWS_BEFORE,
        );
        const endRow = rowIndexOnTop + DISPLAY_ROWS_AFTER;
        this.setState({ startRow, endRow });
        if (scrollLeft != null) {
            this.props.onHorizontalScrollChange(scrollLeft);
        }
    };

    onRowClick = e => {
        this.props.onRowClick(+e.currentTarget.dataset.index);
    };

    render() {
        const {
            header,
            theWidestStrings,
            data,
            selectedRowIndexes,
            onRowClick,
            onCellClick,
        } = this.props;

        const { headerHeight, rowHeight } = this.state;

        const { startRow, endRow } = this.state;
        const domHeader = header.map((header, index) => (
            <th key={index}>{header}</th>
        ));
        const domWidest = theWidestStrings.map((value, index) => (
            <td key={index}>{value}</td>
        ));
        const onRowClickCb = onRowClick ? this.onRowClick : undefined;
        const domData = data
            .slice(startRow, endRow + 1)
            .map((row, rowIndex) => {
                const actualRowIndex = rowIndex + startRow;
                const className = selectedRowIndexes.includes(actualRowIndex)
                    ? SELECTED_CLASS_NAME
                    : undefined;
                return (
                    <tr
                        className={className}
                        key={rowIndex}
                        data-index={actualRowIndex}
                        onClick={onRowClickCb}
                    >
                        {row.map((cell, cellIndex) => (
                            <Td
                                key={cellIndex}
                                value={cell}
                                rowIndex={actualRowIndex}
                                columnIndex={cellIndex}
                                onCellClick={onCellClick}
                            />
                        ))}
                    </tr>
                );
            });

        const style = getStyle(
            headerHeight,
            rowHeight,
            startRow,
            endRow,
            data.length,
        );
        return (
            <div style={style.container} onScroll={this.onScroll}>
                <table style={style.table}>
                    <thead style={style.thead}>
                        <tr ref={this.headerRow}>{domHeader}</tr>
                    </thead>
                    <tbody>
                        <tr ref={this.dataRow} style={style.firstRow}>
                            {domWidest}
                        </tr>
                        {domData}
                    </tbody>
                </table>
            </div>
        );
    }
}

VirtualData.propTypes = {
    data: PropTypes.array.isRequired,
    header: PropTypes.array.isRequired,
    theWidestStrings: PropTypes.array.isRequired,
    onHorizontalScrollChange: PropTypes.func.isRequired,
    selectedRowIndexes: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
    onCellClick: PropTypes.func,
};

VirtualData.defaultProps = {
    onRowClick: undefined,
    onCellClick: undefined,
};

export default VirtualData;
