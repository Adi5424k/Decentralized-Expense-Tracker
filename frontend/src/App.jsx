import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import WalletConnect from './components/WalletConnect';
import { contractAddress, contractABI } from './utils/contract';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount('');
      setContract(null);
      setExpenses([]);
    } else {
      setAccount(accounts[0]);
      initializeContract(accounts[0]);
    }
  };

  const initializeContract = async (account) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract);
      loadExpenses(contract);
    } catch (error) {
      console.error('Error initializing contract:', error);
    }
  };

  const loadExpenses = async (contract) => {
    try {
      setLoading(true);
      const expenses = await contract.getExpenses();
      setExpenses(expenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (description, amount, category) => {
    try {
      setLoading(true);
      setError('');
      
      // Convert ETH amount to Wei
      const amountInWei = ethers.parseEther(amount.toString());
      
      // Call the contract's addExpense function
      const tx = await contract.addExpense(description, amountInWei, category);
      
      // Wait for the transaction to be mined
      await tx.wait();
      
      // Reload expenses after successful transaction
      await loadExpenses(contract);
    } catch (error) {
      console.error('Error adding expense:', error);
      setError('Failed to add expense. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Blockchain Expense Tracker</h1>
        
        <WalletConnect 
          account={account} 
          setAccount={setAccount}
          initializeContract={initializeContract}
        />

        {account && (
          <>
            <ExpenseForm 
              onSubmit={addExpense} 
              loading={loading}
              error={error}
            />
            
            <ExpenseList 
              expenses={expenses} 
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App; 