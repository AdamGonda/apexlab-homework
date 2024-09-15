import { useState, useEffect } from 'react'

type Alert = {
  id: string
  message: string
  price: number
  quantity: number
  total: number
  timestamp: number
}

type AlertRule = {
  name: string
  message: string
  condition: (price: number, quantity: number, total: number) => boolean
  color: string
}

const alertRules: AlertRule[] = [
  {
    name: 'Cheap sell',
    message: 'Cheap sell detected',
    condition: (price) => price < 50000,
    color: 'text-green-500',
  },
  {
    name: 'Solid transaction',
    message: 'Solid transaction detected',
    condition: (_, quantity) => quantity > 10,
    color: 'text-orange-500',
  },
  {
    name: 'Big biznis here',
    message: 'Big biznis here detected',
    condition: (_, __, total) => total > 1000000,
    color: 'text-red-500',
  },
]

export const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [counters, setCounters] = useState<Record<string, number>>({})

  useEffect(() => {
    const interval = setInterval(() => {
      const price = Math.random() * 100000
      const quantity = Math.random() * 20
      const total = price * quantity

      alertRules.forEach(rule => {
        if (rule.condition(price, quantity, total)) {
          const newAlert: Alert = {
            id: Math.random().toString(36).substr(2, 9),
            message: rule.message,
            price,
            quantity,
            total,
            timestamp: Date.now(),
          }

          setAlerts(prev => [newAlert, ...prev])
          setCounters(prev => ({ ...prev, [rule.name]: (prev[rule.name] || 0) + 1 }))
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const oneMinuteAgo = Date.now() - 60000
      setAlerts(prev => prev.filter(alert => alert.timestamp > oneMinuteAgo))
    }, 1000)

    return () => clearInterval(cleanupInterval)
  }, [])

  const formatNumber = (num: number) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alertRules.map(rule => (
          <div key={rule.name} className={`p-4 rounded-lg shadow-md ${rule.color} bg-gray-800`}>
            <h2 className="text-xl font-bold mb-2">{rule.name}</h2>
            <p className="text-3xl font-bold">{counters[rule.name] || 0}</p>
          </div>
        ))}
      </div>
      {alertRules.map(rule => (
        <div key={rule.name}>
          <h2 className={`text-xl font-bold mb-2 ${rule.color}`}>{rule.name} Alerts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Alert Message</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {alerts
                  .filter(alert => alert.message === rule.message)
                  .map(alert => (
                    <tr key={alert.id}>
                      <td className="border-t border-gray-700 px-4 py-2">{alert.message}</td>
                      <td className="border-t border-gray-700 px-4 py-2">${formatNumber(alert.price)}</td>
                      <td className="border-t border-gray-700 px-4 py-2">{formatNumber(alert.quantity)} BTC</td>
                      <td className="border-t border-gray-700 px-4 py-2">${formatNumber(alert.total)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}