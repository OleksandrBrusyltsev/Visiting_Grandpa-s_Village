import { createStore } from 'zustand/vanilla';
import { devtools, persist } from 'zustand/middleware';

import { createAuthSlice, UserSlice } from './authSlice';
import { AdminSlice, createAdminSlice } from './adminSlice';


export const createMainStore = (
    
) => {
    return createStore<UserSlice & AdminSlice>()(
        devtools(
            persist(
                (...args) => ({
                    ...createAuthSlice(...args),
                    ...createAdminSlice(...args),
                }),
                {
                    name: 'grandpa-store',
                }
            )
        )
    )
};

