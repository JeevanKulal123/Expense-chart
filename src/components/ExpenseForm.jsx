import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const LOCAL_STORAGE_KEY = 'expenses';

const initialExpenses = [
  {
    id: 1,
    item: 'Canara Bank RD',
    amount: 1500,
    status: 'Not Paid',
    category: 'savings',
  },
  {
    id: 2,
    item: 'Samaja Seva RD',
    amount: 2000,
    status: 'Not Paid',
    category: 'savings',
  },
  {
    id: 3,
    item: 'Grow SIP',
    amount: 1500,
    status: 'Not Paid',
    category: 'savings',
  },
  {
    id: 4,
    item: 'Loan',
    amount: 9000,
    status: 'Not Paid',
    category: 'expense',
  },
  { id: 5, item: 'LIC', amount: 1100, status: 'Not Paid', category: 'savings' },
  {
    id: 6,
    item: 'Food',
    amount: 2000,
    status: 'Not Paid',
    category: 'expense',
  },
  {
    id: 7,
    item: 'Petrol',
    amount: 4000,
    status: 'Not Paid',
    category: 'expense',
  },
  {
    id: 8,
    item: 'Amma g',
    amount: 1000,
    status: 'Not Paid',
    category: 'expense',
  },
  {
    id: 9,
    item: 'Savings',
    amount: 10000,
    status: 'Not Paid',
    category: 'savings',
  },
];

export default function ExpenseForm() {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('expense');
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setExpenses(JSON.parse(stored));
    } else {
      setExpenses(initialExpenses);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (!item || !amount) return;
    const newExpense = {
      id: Date.now(),
      item,
      amount: parseFloat(amount),
      status: 'Not Paid',
      category,
    };
    setExpenses((prev) => [...prev, newExpense]);
    setItem('');
    setAmount('');
  };

  const toggleStatus = (id) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? { ...exp, status: exp.status === 'Paid' ? 'Not Paid' : 'Paid' }
          : exp
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const filteredExpenses = expenses.filter(
    (e) =>
      (filterCategory === 'all' || e.category === filterCategory) &&
      (filterStatus === 'all' || e.status === filterStatus)
  );

  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const paidAmount = filteredExpenses
    .filter((e) => e.status === 'Paid')
    .reduce((sum, e) => sum + e.amount, 0);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Expense Report', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Item', 'Amount', 'Category', 'Status']],
      body: filteredExpenses.map((exp) => [
        exp.item,
        exp.amount,
        exp.category,
        exp.status,
      ]),
    });
    doc.save('expenses.pdf');
  };

  const exportToCSV = () => {
    const header = ['Item', 'Amount', 'Category', 'Status'];
    const rows = filteredExpenses.map((exp) => [
      exp.item,
      exp.amount,
      exp.category,
      exp.status,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [header, ...rows].map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h6" gutterBottom>
          Add New Expense
        </Typography>
        <Box>
          <Tooltip title="Export to PDF">
            <IconButton color="secondary" onClick={exportToPDF}>
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export to CSV">
            <IconButton color="secondary" onClick={exportToCSV}>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box component="form" display="flex" flexWrap="wrap" gap={2} mb={2}>
        <TextField
          label="Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          color="secondary"
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: 200 } }}
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          color="secondary"
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: 200 } }}
        />
        <FormControl
          size="small"
          color="secondary"
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: 200 } }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="savings">Savings</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddExpense}
          sx={{ minWidth: { xs: '100%', sm: 100 }, height: 40 }}
        >
          Add
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <FormControl
          size="small"
          color="secondary"
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: 200 } }}
        >
          <InputLabel>Filter Category</InputLabel>
          <Select
            value={filterCategory}
            label="Filter Category"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="savings">Savings</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          size="small"
          color="secondary"
          fullWidth
          sx={{ minWidth: { xs: '100%', sm: 200 } }}
        >
          <InputLabel>Filter Status</InputLabel>
          <Select
            value={filterStatus}
            label="Filter Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Not Paid">Not Paid</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <Paper elevation={3}>
        <Box overflow="auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Item</b>
                </TableCell>
                <TableCell>
                  <b>Amount</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Paid?</b>
                </TableCell>
                <TableCell>
                  <b>Delete</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell>{exp.item}</TableCell>
                  <TableCell
                    sx={{ color: exp.category === 'savings' ? 'green' : 'red' }}
                  >
                    ₹{exp.amount}
                  </TableCell>
                  <TableCell>{exp.status}</TableCell>
                  <TableCell>
                    <Checkbox
                      color="success"
                      checked={exp.status === 'Paid'}
                      onChange={() => toggleStatus(exp.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteExpense(exp.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredExpenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No expenses found.
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>
                  <strong>Total</strong>
                </TableCell>
                <TableCell>
                  <strong>₹{totalAmount}</strong>
                </TableCell>
                <TableCell colSpan={3}>
                  <strong>Paid: ₹{paidAmount}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Paper>

      {/* Charts */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        mt={4}
      >
        {/* Expense vs Savings Chart */}
        <Box
          width={{ xs: '100%', sm: 300 }}
          height={300}
          maxWidth={360}
          minWidth={250}
        >
          <Typography textAlign="center" mb={1}>
            <strong>Expense vs Savings</strong>
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  {
                    name: 'Expense',
                    value: expenses.filter((e) => e.category === 'expense')
                      .length,
                  },
                  {
                    name: 'Savings',
                    value: expenses.filter((e) => e.category === 'savings')
                      .length,
                  },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#f44336" />
                <Cell fill="#4caf50" />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Paid vs Not Paid Chart */}
        <Box
          width={{ xs: '100%', sm: 300 }}
          height={300}
          maxWidth={360}
          minWidth={250}
        >
          <Typography textAlign="center" mb={1}>
            <strong>Paid vs Not Paid</strong>
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  {
                    name: 'Paid',
                    value: expenses.filter((e) => e.status === 'Paid').length,
                  },
                  {
                    name: 'Not Paid',
                    value: expenses.filter((e) => e.status === 'Not Paid')
                      .length,
                  },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#4caf50" />
                <Cell fill="#f44336" />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Container>
  );
}
