import { useState, useEffect } from 'react'

type Transaction = {
  id: string
  price: number
  quantity: number
  total: number
  timestamp: number
}

export const MonitorPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        price: Math.random() * 100000,
        quantity: Math.random() * 20,
        total: Math.random() * 2000000,
        timestamp: Date.now(),
      }

      setTransactions(prev => [newTransaction, ...prev].slice(0, 500))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const getAlertClass = (transaction: Transaction) => {
    if (transaction.price < 50000) return 'text-green-500'
    if (transaction.quantity > 10) return 'text-orange-500'
    if (transaction.total > 1000000) return 'text-red-500'
    return ''
  }

  return (
    <div className="bg-black text-green-400 p-4 h-screen overflow-hidden font-mono text-sm">
      {transactions.map(transaction => (
        <div key={transaction.id} className={`${getAlertClass(transaction)}`}>
          {`ID: ${transaction.id} | Price: $${formatNumber(transaction.price)} | Quantity: ${formatNumber(transaction.quantity)} BTC | Total: $${formatNumber(transaction.total)} | Time: ${new Date(transaction.timestamp).toLocaleTimeString()}`}
        </div>
      ))}
    </div>
  )
}