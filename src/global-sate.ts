import { atom } from 'jotai'
import { Trade } from '@/types'

export const tradesAtom = atom<Trade[]>([])