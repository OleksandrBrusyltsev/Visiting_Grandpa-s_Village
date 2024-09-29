'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type UserStore, createMainStore } from '@/stores/auth/store'

export type StoreApi = ReturnType<typeof createMainStore>

export const StoreContext = createContext<StoreApi | undefined>(
    undefined,
)

export interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({
    children,
}: StoreProviderProps) => {
    const storeRef = useRef<StoreApi>()
    if (!storeRef.current) {
        storeRef.current = createMainStore()
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}

export const useMainStore = <T,>(
    selector: (store: UserStore) => T,
): T => {
    const storeContext = useContext(StoreContext)

    if (!storeContext) {
        throw new Error(`useMainStore must be used within StoreProvider`)
    }

    return useStore(storeContext, selector)
}
