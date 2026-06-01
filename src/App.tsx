import { useState, useEffect, useMemo, useCallback, createContext } from 'react'
import type { Expense } from './types/expense'
import { STORAGE_KEY } from './constants'
import { filterExpenses } from './utils/filterExpenses'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchBar from './components/SearchBar'
import AppHeader from './components/AppHeader'
import './App.css'

type SettingsContextType = {
  currency: 'USD' | 'VND'
  theme: 'light' | 'dark'
  total: number
  currencySymbol: string
  setCurrency: React.Dispatch<React.SetStateAction<'USD' | 'VND'>>
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export const SettingsContext = createContext<SettingsContextType | null>(null)

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Expense[]) : []
  })

  const [query, setQuery] = useState('')

  const [currency, setCurrency] = useState<'USD' | 'VND'>('USD')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const currencySymbol = currency === 'USD' ? '$' : '₫'

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const filteredExpenses = useMemo(
    () => filterExpenses(expenses, query),
    [expenses, query],
  )

  const total = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses],
  )

  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }, [])

  function handleAddExpense(expense: Omit<Expense, 'id'>) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  const settingsValue = useMemo(() =>({
    currency,
    theme,
    total,
    currencySymbol,
    setCurrency,
    setTheme
  }), [currency, theme, currencySymbol, total])

  // TODO: replace prop drilling with useContext
  return (
    <SettingsContext.Provider value={settingsValue}>
      <div className="app-layout" data-theme={theme}>
        <aside>
          <h1>Expense Manager</h1>
          <AppHeader />
          <ExpenseForm onAddExpense={handleAddExpense} />
        </aside>
        <main>
          <SearchBar query={query} onQueryChange={setQuery} />
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </main>
      </div>
    </SettingsContext.Provider>
  )
}

export default App
