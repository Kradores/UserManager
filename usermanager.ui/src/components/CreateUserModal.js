import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

/**
 * 
 * @param {Object} props
 * @param {() => void} props.triggerRefresh 
 * @returns 
 */
export default function CreateUserModal({triggerRefresh}) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        credit: undefined
    })
    const handleOpen = () => {
        setOpen(true)
        setData({
            name: '',
            email: '',
            credit: undefined
        })
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event) => {
        setData({...data, [event.target.id]: event.target.value})
    }

    const handleNumberChange = (event) => {
        if (!isNaN(event.target.value)) {
            setData({...data, [event.target.id]: parseInt(event.target.value)})
        }

        if (event.target.value === '') {
            setData({...data, [event.target.id]: undefined})
        }
    }

    const handleSubmit = () => {
        setLoading(true)

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                triggerRefresh()
            }
        }).finally(() => {
            setLoading(false)
            setOpen(false)
        })
        
    }

    return (<>
        <Button variant="outlined" onClick={handleOpen}>Create User</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container flexDirection={'column'} rowSpacing={3} >
                    <Grid item>
                        <Typography variant="h6">New User</Typography>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth id="name" label="Name" variant="outlined" size="small" onChange={handleChange} value={data.name} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth id="email" label="Email" variant="outlined" size="small" onChange={handleChange} value={data.email} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth id="credit" label="Credits" variant="outlined" size="small" onChange={handleNumberChange} value={data.credit} />
                    </Grid>
                    <Grid container item display={'flex'} justifyContent={'flex-end'} columnSpacing={3}>
                        <Grid item>
                            <Button variant="outlined" color="error" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <LoadingButton variant="outlined" color="success" loading={loading} onClick={handleSubmit}>
                                Save
                            </LoadingButton>
                        </Grid>
                        
                        
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    </>)
}