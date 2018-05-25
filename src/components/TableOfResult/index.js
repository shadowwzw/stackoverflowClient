import React from 'react'
import ReactTable from "react-table";

const columns = [
    {
        accessor: 'author',
        Header: 'Author',
        maxWidth: 150
    },
    {
        accessor: 'subject',
        Header: 'Subject'
    },
    {
        accessor: 'numberOfAnswers',
        Header: 'answers',
        maxWidth: 70
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
        pageSizeOptions={[5, 10, 15, 30, 50]}
        defaultPageSize={15}
    />
)

export default TableOfResult