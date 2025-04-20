export const groupAndSumTransactionsByDate = (transactions) => {
  const grouped = {}
  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0]
    if (!grouped[date]) {
      // creates a 'date' key which has values of 'transations' and 'amount' as nested keys
      grouped[date] = { transactions: [], amount: 0 }
    }
    grouped[date].transactions.push(transaction)
    // if transaction type is 'expense', amount = amount - transation.amount, else amount = transaction.amount
    const amount = transaction.type === 'Expense' ? -transaction.amount : transaction.amount
    // add the amount for non-expense
    grouped[date].amount += amount
  }
  return grouped
}