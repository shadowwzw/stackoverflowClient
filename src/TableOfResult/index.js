import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
    {
        dataField: 'subject',
        text: 'Subject'
    },
    {
        dataField: 'author',
        text: 'Author'
    },
    {
        dataField: 'numberOfAnswers',
        text: 'Number of answers'
    },
    {
        dataField: 'tags',
        text: 'Tags'
    },
];

const TableOfResult = ({data}) => (
    <BootstrapTable keyField='id' data={data} columns={ columns } />
)

export default TableOfResult