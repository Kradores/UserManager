import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function UsersTable() {

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'credit', headerName: 'Credits', width: 90 },
        { field: 'actions', headerName: 'Actions', width: 90 },
    ];
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const url = new URL('http://localhost:5000/users')
        url.searchParams.append('skip', paginationModel.page * paginationModel.pageSize)
        url.searchParams.append('take', paginationModel.pageSize)

        setLoading(true)
        fetch(url, {
            method: 'GET'
        }).then(async response => {
            const data = await response.json()
            setRows(data.users)
            setRowCount(data.rows)
        }).finally(() => {
            setLoading(false)
        })
    }, [paginationModel]);
    return (<Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            loading={loading} />
    </Box>)
}