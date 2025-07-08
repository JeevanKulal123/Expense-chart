import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import Budgetform from './components/BudgetForm';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<ExpenseForm />}></Route>
          <Route path="/budget" element={<Budgetform />}></Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
