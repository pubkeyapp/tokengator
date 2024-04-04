import { ellipsify } from '@tokengator-mint/sdk'
import { useCurrencies } from '@tokengator-mint/web-core-data-access'
import { createContext, ReactNode, useContext } from 'react'

export interface SolanaLabelProviderContext {
  map: Map<string, string>
  getLabel: (mint: string) => string
}

const Context = createContext<SolanaLabelProviderContext>({} as SolanaLabelProviderContext)

export function SolanaLabelProvider({ children }: { children: ReactNode }) {
  const currencyQuery = useCurrencies()
  const map = new Map<string, string>()
  currencyQuery.data?.forEach((currency) => {
    map.set(currency.mint, currency.symbol)
  })
  const value: SolanaLabelProviderContext = {
    map,
    getLabel: (mint: string) => map.get(mint) ?? ellipsify(mint),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useSolanaLabel() {
  return useContext(Context)
}
