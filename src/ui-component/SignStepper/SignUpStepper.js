import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['User Details', 'Company Details'];

export const SignUpStepper = ({ st }) => {
    return (
        <Box sx={{ width: '100%', marginTop: '0px', marginBottom: '10px' }}>
            <Stepper activeStep={st} alternativeLabel className="company-stepper">
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};
