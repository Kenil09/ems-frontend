import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotalIncomeLightCard from './TotalIncomeLightCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Shift = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Shift;
