import {useMemo, useState} from "react";

export default function useDatatable(fieldColumns, mapped) {
    const no = {name: '', cell: (row, index) => index + 1, grow: 0, width: '60px'};
    const action = {name: '', selector: row => row.action, width: '140px'}
    let columns = fieldColumns.map((fc, k) => {
        return {
            name: fc.name,
            selector: row => row[fc.field],
            sortable: true
        }
    })
    columns.unshift(no);
    columns.push(action);

    const [filterText, setFilterText] = useState('');

    const filteredItems = useMemo(() => {
        return mapped.filter(item => {
            const searchableValues = Object.values(item).join(' ').toLowerCase();
            return searchableValues.includes(filterText.toLowerCase());
        });
    }, [mapped, filterText]);

    return {columns, filterText, setFilterText, filteredItems}
}
