import { ArrowDownRight, ArrowUpRight, ChartNoAxesColumnIncreasing, Layers3, Receipt, Wallet } from 'lucide-react'

interface SummaryStatsProps {
  total: number
  highest: number
  topCategory: string
  expenseCount: number
}

function formatMoney(amount: number): string {
  return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
}

export default function SummaryStats({ total, highest, topCategory, expenseCount }: SummaryStatsProps) {
  return (
    <section className="summary-grid" aria-label="Expense summary">
      <article className="summary-card summary-card--total">
        <div className="summary-card__top"><span className="summary-card__icon"><Wallet size={17} /></span><span className="summary-card__caption">THIS MONTH</span></div>
        <p className="summary-card__value">{formatMoney(total)}</p>
        <p className="summary-card__foot"><ArrowDownRight size={14} /> {expenseCount} {expenseCount === 1 ? 'transaction' : 'transactions'} tracked</p>
      </article>
      <article className="summary-card">
        <div className="summary-card__top"><span className="summary-card__icon summary-card__icon--coral"><ChartNoAxesColumnIncreasing size={17} /></span><span className="summary-card__caption">HIGHEST EXPENSE</span></div>
        <p className="summary-card__value">{formatMoney(highest)}</p>
        <p className="summary-card__foot"><ArrowUpRight size={14} /> Single transaction</p>
      </article>
      <article className="summary-card">
        <div className="summary-card__top"><span className="summary-card__icon summary-card__icon--blue"><Layers3 size={17} /></span><span className="summary-card__caption">TOP CATEGORY</span></div>
        <p className="summary-card__value summary-card__value--category">{topCategory}</p>
        <p className="summary-card__foot"><Receipt size={14} /> Most frequent this month</p>
      </article>
    </section>
  )
}