import { StateCreator } from 'zustand';
import { AdminSlice } from './adminSlice';

export interface UserSlice {
    user: UserType;
    setUser: (user: UserType) => void;
    resetUser: () => void;
}

export const initialUserState: Pick<UserSlice, 'user'> = {
    user: {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        user_type: '',
        id_active: false,
        phone_number: '',
    },
};

export const createAuthSlice: StateCreator<
    UserSlice & AdminSlice,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    UserSlice
> = (set, get) => ({
    ...initialUserState,
    setUser: (user: UserType) =>
        set((state) => ({
            ...state,
            user,
        })),
    resetUser: () => set(initialUserState),
});
