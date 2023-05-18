// Transaction data
let transactions = [];
let selectedTransactionIndex = null;

// DOM elements
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');

// Load transactions from local storage
function loadTransactions() {
  const storedTransactions = localStorage.getItem('transactions');
  if (storedTransactions) {
    transactions = JSON.parse(storedTransactions);
    displayTransactions();
  }
}

// Save transactions to local storage
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Add transaction event listener
transactionForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);

  // Create new transaction object
  const newTransaction = {
    title: title,
    category: category,
    amount: amount
  };

  // Add new transaction to the array
  transactions.push(newTransaction);

  // Clear form inputs
  transactionForm.reset();

  // Update transaction list on the page
  displayTransactions();

  // Save transactions to local storage
  saveTransactions();
});

// Delete transaction event listener
transactionList.addEventListener('click', function(e) {
    if (e.target.classList.contains('transaction-container')) {
      const transactionIndex = parseInt(e.target.getAttribute('data-index'));
      setSelectedTransaction(transactionIndex);
    }
  });
  
  // Set selected transaction index and update UI
  function setSelectedTransaction(index) {
    selectedTransactionIndex = index;
    editButton.disabled = false;
    deleteButton.disabled = false;
    transactionList.querySelectorAll('.transaction-container').forEach(function(transactionContainer, i) {
      if (i === selectedTransactionIndex) {
        transactionContainer.classList.add('selected');
      } else {
        transactionContainer.classList.remove('selected');
      }
    });
  }

  
  
  // Edit button event listener
  editButton.addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
  
    if (selectedTransactionIndex !== null) {
      if (!title || !amount) {
        alert('Please fill in all the fields.');
        return;
      }
  
      transactions[selectedTransactionIndex] = {
        title: title,
        category: category,
        amount: category === 'expense' ? -amount : amount
      };
  
      displayTransactions();
      saveTransactions();
      clearSelectedTransaction();
      transactionForm.reset();
    } else  {
            alert('Please select a transaction to edit.');
    }
  });
  
  // Delete button event listener
  deleteButton.addEventListener('click', function() {
    if (selectedTransactionIndex !== null) {
      transactions.splice(selectedTransactionIndex, 1);
      displayTransactions();
      saveTransactions();
      clearSelectedTransaction();
    } else {
      alert('Please select a transaction to delete.');
    }
  });
  
  
// Clear selected transaction and update UI
function clearSelectedTransaction() {
  selectedTransactionIndex = null;
  editButton.disabled = true;
  deleteButton.disabled = true;
  transactionList.querySelectorAll('.transaction-container').forEach(function(transactionContainer) {
    transactionContainer.classList.remove('selected');
  });
}

/// Display transactions on the page
function displayTransactions() {
    // Clear existing transactions
    transactionList.innerHTML = '';
  
    // Loop through transactions array and create transaction containers
    transactions.forEach(function(transaction, index) {
      const transactionContainer = document.createElement('div');
      transactionContainer.classList.add('transaction-container', transaction.category);
      transactionContainer.setAttribute('data-index', index);
  
      const titleElement = document.createElement('span');
      titleElement.classList.add('transaction-title');
      titleElement.textContent = transaction.title;
  
      const amountElement = document.createElement('span');
      amountElement.classList.add('transaction-amount');
      amountElement.textContent = (transaction.category === 'expense' ? '-' : '+') + '$' + Math.abs(transaction.amount);
  
      transactionContainer.appendChild(titleElement);
      transactionContainer.appendChild(amountElement);
  
      transactionList.appendChild(transactionContainer);
    });
  }
  
  
  
// Load transactions on page load
loadTransactions();
