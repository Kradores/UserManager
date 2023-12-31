import { Box, Grid } from '@mui/material'
import UsersTable from './components/UsersTable'
import CreateUserModal from './components/CreateUserModal';
import { useState } from 'react';

function App() {
    const [refresh, setRefresh] = useState({})

    const triggerRefresh = () => {
        setRefresh({})
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
            <Grid container item flexDirection={"column"} rowSpacing={3} style={{maxWidth: '600px'}}>
                <Grid item display={'flex'} justifyContent={'flex-end'}>
                    <CreateUserModal triggerRefresh={triggerRefresh} />
                </Grid>
                <Grid item>
                    <UsersTable refresh={refresh} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
