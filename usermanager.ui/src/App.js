import './App.css'
import { Box, Grid } from '@mui/material'
import UsersTable from './components/UsersTable'

function App() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container flexDirection={"column"}>
                <Grid item>

                </Grid>
                <Grid item>
                    <UsersTable />
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
