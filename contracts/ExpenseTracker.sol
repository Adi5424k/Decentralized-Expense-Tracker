// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpenseTracker {
    struct Expense {
        uint256 id;
        string description;
        uint256 amount;
        uint256 timestamp;
        string category;
    }

    mapping(address => Expense[]) private userExpenses;
    mapping(address => uint256) private expenseCount;

    event ExpenseAdded(
        address indexed user,
        uint256 indexed expenseId,
        string description,
        uint256 amount,
        uint256 timestamp,
        string category
    );

    function addExpense(
        string memory _description,
        uint256 _amount,
        string memory _category
    ) public {
        uint256 expenseId = expenseCount[msg.sender];
        uint256 timestamp = block.timestamp;

        Expense memory newExpense = Expense({
            id: expenseId,
            description: _description,
            amount: _amount,
            timestamp: timestamp,
            category: _category
        });

        userExpenses[msg.sender].push(newExpense);
        expenseCount[msg.sender]++;

        emit ExpenseAdded(
            msg.sender,
            expenseId,
            _description,
            _amount,
            timestamp,
            _category
        );
    }

    function getExpenses() public view returns (Expense[] memory) {
        return userExpenses[msg.sender];
    }

    function getExpensesByDateRange(
        uint256 _startDate,
        uint256 _endDate
    ) public view returns (Expense[] memory) {
        Expense[] memory allExpenses = userExpenses[msg.sender];
        uint256 count = 0;

        // Count matching expenses
        for (uint256 i = 0; i < allExpenses.length; i++) {
            if (
                allExpenses[i].timestamp >= _startDate &&
                allExpenses[i].timestamp <= _endDate
            ) {
                count++;
            }
        }

        // Create and populate result array
        Expense[] memory result = new Expense[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < allExpenses.length; i++) {
            if (
                allExpenses[i].timestamp >= _startDate &&
                allExpenses[i].timestamp <= _endDate
            ) {
                result[index] = allExpenses[i];
                index++;
            }
        }

        return result;
    }
} 