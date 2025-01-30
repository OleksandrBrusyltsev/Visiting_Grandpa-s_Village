import { createStore } from 'zustand/vanilla';
import { devtools, persist } from 'zustand/middleware';

import { createAuthSlice, UserSlice } from './authSlice';
import { AdminSlice, createAdminSlice } from './adminSlice';
import { immer } from 'zustand/middleware/immer';

export const createMainStore = () => {
    return createStore<UserSlice & AdminSlice>()(
        devtools(
            // persist(
            immer((...args) => ({
                ...createAuthSlice(...args),
                ...createAdminSlice(...args),
            })),
            // {
            //     name: 'grandpa-store',
            //     partialize: (state) => ({
            //         ...state,
            //         houseAdding: {
            //             ...state.houseAdding,
            //             photo: [],
            //         },
            //         houseEditing: {
            //             ...state.houseEditing,
            //             photo: [],
            //         },
            //     }),
            // },
            // ),
        ),
    );
};
