import { useEffect, useState } from 'react'
import type { Expense } from './types/expense'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import './App.css'

function App() {
  // Lazy initialization:
  // read from localStorage during the initial state setup
  // to prevent useEffect form accidentally
  // overwriting saved data with an empty array
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const savedData = localStorage.getItem('wecamp-expenses')
      return savedData ? JSON.parse(savedData) : []
    } catch (e) {
      console.log("Error when loading data from local storage: ", e)
      return []
    }
  })

  // TODO: load expenses from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('wecamp-expenses')
    if (savedData) 
      setExpenses(JSON.parse(savedData))
  }, [])

  // TODO: save expenses to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('wecamp-expenses', JSON.stringify(expenses))
  }, [expenses])

  function handleAddExpense(expense: Omit<Expense, 'id'>) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  function handleDeleteExpense(id: string) {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </aside>
      <main>
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App
