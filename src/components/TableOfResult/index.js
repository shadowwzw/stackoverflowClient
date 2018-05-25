import React from 'react'
import ReactTable from "react-table";

const columns = [
    {
        accessor: 'author',
        Header: 'Author',
    },
    {
        accessor: 'subject',
        Header: 'Subject'
    },
    {
        accessor: 'numberOfAnswers',
        Header: 'answers'
    },
    {
        accessor: 'tags',
        Header: 'Tags'
    },
];

const TableOfResult = ({data, caption, getTdProps}) => (
    <ReactTable
        data={data}
        columns={columns}
        getTdProps={getTdProps}
    />
)

export default TableOfResult