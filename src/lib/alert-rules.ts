import { AlertRule } from "@/types";

export const alertRules: AlertRule[] = [
  {
    name: 'Cheap sell',
    condition: (price) => price < 50_000,
    color: 'text-green-500',
  },
  {
    name: 'Solid transaction',
    condition: (_, quantity) => quantity > 0.1,
    color: 'text-orange-500',
  },
  {
    name: 'Big biznis here',
    condition: (_, __, total) => total > 10_000,
    color: 'text-red-500',
  },
]