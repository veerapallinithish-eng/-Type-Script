import { Search, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES, type FilterBarProps, type FilterType, type SortType } from '../types'

const periods: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All time' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
]

export default function FilterBar({
  category,
  period,
  sort,
  search,
  onCategoryChange,
  onPeriodChange,
  onSortChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Filter expenses">
      <div className="filter-bar__top">
        <div className="filter-label"><SlidersHorizontal size={15} /><span>FILTER BY</span></div>
        <label className="search-field">
          <Search size={16} />
          <input aria-label="Search expenses" onChange={(event) => onSearchChange(event.target.value)} placeholder="Search expenses" value={search} />
        </label>
      </div>
      <div className="filter-bar__controls">
        <div className="period-tabs" aria-label="Time period">
          {periods.map((item) => (
            <button aria-pressed={period === item.value} className={period === item.value ? 'period-tab is-active' : 'period-tab'} key={item.value} onClick={() => onPeriodChange(item.value)}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="filter-selects">
          <label className="select-wrap">
            <span className="sr-only">Category</span>
            <select onChange={(event) => onCategoryChange(event.target.value as typeof category)} value={category}>
              <option value="all">Every category</option>
              {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="select-wrap">
            <span className="sr-only">Sort expenses</span>
            <select onChange={(event) => onSortChange(event.target.value as SortType)} value={sort}>
              <option value="date">Sort: newest</option>
              <option value="amount">Sort: amount</option>
              <option value="category">Sort: category</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  )
}