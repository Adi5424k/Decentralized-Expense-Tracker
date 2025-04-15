# Blockchain Expense Tracker

A decentralized application (dApp) built on the Ethereum blockchain that allows users to record and manage their daily expenses in a transparent and immutable manner.

## Features

- Record expenses on the blockchain
- View expense history
- Filter expenses by date range
- MetaMask wallet integration
- Real-time updates
- Secure and decentralized storage

## Technical Stack

- Smart Contracts: Solidity
- Blockchain Platform: Ethereum (Sepolia testnet)
- Frontend: React.js with Tailwind CSS
- Blockchain Interaction: Ethers.js
- Wallet Integration: MetaMask
- Build Tools: Hardhat, Vite

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MetaMask wallet
- Sepolia testnet ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

3. Compile the smart contract:
```bash
npm run compile
```

4. Deploy the contract to Sepolia testnet:
```bash
npm run deploy
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the contract address in `src/utils/contract.js` with your deployed contract address

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Connect your MetaMask wallet to the Sepolia testnet
2. Connect your wallet to the application
3. Add expenses using the form
4. View your expense history in the table below

## Security Considerations

- All user data is isolated by wallet address
- Smart contract code follows gas optimization practices
- Private data is stored securely on the blockchain
- Uses event logs for reliable tracking

## Future Enhancements

- Graph Integration for efficient querying
- User Authentication using SIWE (Sign-In with Ethereum)
- Budget Goal Feature for setting and tracking monthly limits
- Analytics Dashboard with charts and insights
- Token Reward System for user engagement

## License

MIT 