import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

/**
 * 
 * @param {Object} props 
 * @param {any} props.refresh
 * @returns 
 */
export default function UsersTable({refresh}) {

    const [rowModesModel, setRowModesModel] = useState({});

    const columns = [
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        { field: 'email', headerName: 'Email', width: 250, editable: true },
        { field: 'credit', headerName: 'Credits', type: 'number', width: 90, editable: true },
        { field: 'actions', headerName: 'Actions', type: 'actions', width: 100, cellClassName: 'actions',
            getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
            if (isInEditMode) {
                return [
                <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                    color: 'primary.main',
                    }}
                    onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                />,
                ];
            }
    
            return [
                <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
                />,
                <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
                />,
            ];
            },
        },
    ];
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5
    });
    const [loading, setLoading] = useState(false)
    const [innerRefresh, setInnerRefresh] = useState({})

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
    };
    
    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    
    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    
    const handleDeleteClick = (id) => () => {
        setLoading(true)
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                setInnerRefresh({})
            }
        }).finally(() => {
            setLoading(false)
        })
    };
    
    const handleCancelClick = (id) => () => {
        setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
        }
    };
    
    const processRowUpdate = (newRow, oldRow) => {
        updateRowApiRequest(newRow, oldRow)
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const updateRowApiRequest = (newRow, oldRow) => {
        if (oldRow.credit !== newRow.credit) {
            updateCreditApiRequest(newRow.id, { changeAmountBy: newRow.credit - oldRow.credit })
        }

        let data = {}

        if (oldRow.name !== newRow.name) {
            data.name = newRow.name
        }

        if (oldRow.email !== newRow.email) {
            data.email = newRow.email
        }

        if (Object.keys(data).length > 0) {
            updateUserApiRequest(newRow.id, data)
        }
    }

    const updateCreditApiRequest = (id, data) => {
        fetch(`http://localhost:5000/users/${id}/credits`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    }

    const updateUserApiRequest = (id, data) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
    }

    useEffect(() => {
        setPaginationModel({
            page: 0,
            pageSize: 5
        })
    }, [refresh])

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
    }, [paginationModel, innerRefresh]);

    return (<Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            loading={loading}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slotProps={{
                toolbar: { setRows, setRowModesModel },
            }} />
    </Box>)
}