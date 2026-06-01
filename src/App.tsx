import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { AppProvider, useAppContext } from './context/AppContext'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchBar from './components/SearchBar'
import AppHeader from './components/AppHeader'
import FilterBar from './components/FilterBar'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <AppBody />
      </AppProvider>
    </Provider>
  )
}

function AppBody() {
  const [query, setQuery] = useState('')
  const { theme } = useAppContext()

  return (
    <div className="app-layout" data-theme={theme}>
      <aside>
        <h1>Expense Manager</h1>
        <AppHeader />
        <ExpenseForm />
      </aside>
      <main>
        <SearchBar query={query} onQueryChange={setQuery} />
        <FilterBar/>
        <ExpenseList query={query} />
      </main>
    </div>
  )
}

export default App
