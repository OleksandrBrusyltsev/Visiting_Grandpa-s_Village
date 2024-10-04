import { createStore } from 'zustand/vanilla';
import { devtools, persist } from 'zustand/middleware';

export type UserState = {
    user: UserType;
}
export type AdminMenuState = {
    adminMenuIsOpen: boolean;
}

export type UserActions = {
    setUser: (user: UserType) => void;
    resetUser: () => void;
    setAdminMenuOpen: () => void;
}

export type UserStore = UserState & AdminMenuState & UserActions

const initialMainState:
    UserState & AdminMenuState = {
    user: {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        user_type: '',
        id_active: false,
        phone_number: '',
    },
    adminMenuIsOpen: true,
};

export const createMainStore = (
    initialState: UserState & AdminMenuState = initialMainState
) => {
    return createStore<UserStore>()(
        devtools(
            persist(
                (set) => ({
                    ...initialState,
                    setUser: (user: UserType) => set((state) => ({
                        ...state,
                        user,
                    })),
                    resetUser: () => set(initialState),
                    setAdminMenuOpen: () => set((state) => ({
                        ...state,
                        adminMenuIsOpen: !state.adminMenuIsOpen,
                    })),
                }),
                {
                    name: 'auth-user'
                }
            )
        )
    )
};

