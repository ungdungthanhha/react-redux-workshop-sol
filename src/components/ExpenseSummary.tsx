import { useContext } from "react"
import { SettingsContext } from "../App"

function ExpenseSummary() {
  // TODO: consume total and currencySymbol from context instead of props
  const context = useContext(SettingsContext)
    if (!context)
      return null
  
    const { currencySymbol, total } = context
  return (
    <div className="expense-summary">
      <span className="expense-summary-label">Total</span>
      <span className="expense-summary-amount">{currencySymbol}{total.toFixed(2)}</span>
    </div>
  )
}

export default ExpenseSummary
