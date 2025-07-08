import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';

const BudgetForm = () => {
  return (
    <Grid container spacing={3} p={3}>
      {/* Left Form */}
      <Grid item xs={12} md={6}>
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          {[
            { label: 'Monthly Pay', unit: 'per month' },
            {
              label: 'Other (Source)',
              unit: 'per month',
            },
            { label: 'Monthly Expense', unit: 'per month' },
            // { label: 'Annual Tax Return', unit: 'per year' },
          ].map((item, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={1}>
              <Typography minWidth="160px">{item.label}:</Typography>
              <Box display="flex" alignItems="center" flexGrow={1}>
                <Box p={1} sx={{ borderRight: 0 }}>
                  $
                </Box>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{ style: { padding: '10px' } }}
                />
              </Box>
              <Typography minWidth="80px">{item.unit}</Typography>
            </Box>
          ))}
        </Box>
      </Grid>

      {/* Right Summary Box */}
      <Grid item xs={12} md={6}>
        <Paper elevation={1} sx={{ padding: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Budget Review
          </Typography>

          <Box display="flex" justifyContent="space-between" my={1}>
            <Typography>Total Monthly Savings</Typography>
            <Typography>$0.00</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" my={1}>
            <Typography>Total Monthly Expenses</Typography>
            <Typography>$0.00</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" my={1}>
            <Typography>Total Annual Expenses $0.00 / 12</Typography>
            <Typography>$0.00</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" my={1}>
            <Typography>Total Monthly Income</Typography>
            <Typography>$0.00</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            bgcolor="green"
            color="#fff"
            textAlign="center"
            py={2}
            borderRadius="4px"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Under Monthly Budget
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              $0.00
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BudgetForm;
