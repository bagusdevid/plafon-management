const dataTable = {
    customStyle: {
        table: {
            style: {
                fontFamily: 'Inter',
            }
        },
        rows: {
            style: {
                backgroundColor: '#edf2f7',
                '&:nth-child(2n)': {
                    backgroundColor: '#FFFFFF',
                },
                '&:not(:last-of-type)': {
                    borderBottomColor: '#e1eaf3',
                },
            },
        },
        headCells: {
            style: {
                fontWeight: 700,
                borderBottom: '2px solid #e1eaf3'
            }
        },
        header: {
            style: {
                fontFamily: 'Roboto',
                fontSize: '16px',
                minHeight: 'auto',
                paddingTop: '5px',
                fontWeight: 700
            }
        }
    }
}

export default dataTable;
