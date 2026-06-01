import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { useExpenseFilter } from '../hooks/useExpenseFilter'
import ExpenseItem from './ExpenseItem'
import ExpenseSummary from './ExpenseSummary'
import { useMemo } from 'react'

interface ExpenseListProps {
  query: string
}

function ExpenseList({ query }: ExpenseListProps) {
  const expenses = useSelector((state: RootState) => state.expenses.items)
  // TODO: Get activeCategory from state.filters.category
  const activeCategory = useSelector((state: RootState) => state.filters.category)

  // TODO: Filter expenses by activeCategory before passing to useExpenseFilter
  const categoryFilteredExpenses = useMemo(() => {
    if (!activeCategory)
      return expenses;
    
    return expenses.filter(expense => expense.category === activeCategory)
  }, [expenses, activeCategory])

  const { filteredExpenses, total } = useExpenseFilter(categoryFilteredExpenses, query)

  return (
    <div className="expense-list">
      <ExpenseSummary total={total} />
      <h2>Expenses</h2>
      {filteredExpenses.length === 0 ? (
        <p className="empty-state">No expenses yet.</p>
      ) : (
        <ul>
          {filteredExpenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList
