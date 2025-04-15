import { useState } from 'react';

const WalletConnect = ({ account, setAccount, initializeContract }) => {
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        initializeContract(accounts[0]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mb-8">
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Connected Account:</p>
          <p className="font-mono text-sm break-all">{account}</p>
        </div>
      )}
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default WalletConnect; 