import { StateCreator } from 'zustand';
import { UserSlice } from './authSlice';

export interface AdminSlice {
    adminMenuIsOpen: boolean;
    dialogIsOpen: boolean;
    dialogMessage: {
        text: string;
        type: "error" | "success" | null;
    };

    setAdminMenuOpen: () => void;

    setDialogOpen: (isOpen: boolean, type: 'success' | 'error' | null, message: string) => void;
}

export const initialAdminState: Pick<AdminSlice, 'dialogMessage' | 'dialogIsOpen' | 'adminMenuIsOpen'> = {
    adminMenuIsOpen: true,
    dialogIsOpen: false,
    dialogMessage: {
        text: '',
        type: null,
    },
};

export const createAdminSlice: StateCreator<
    UserSlice & AdminSlice,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    AdminSlice
> = (set, get) => ({
    ...initialAdminState,
    setAdminMenuOpen: () =>
        set((state) => ({
            ...state,
            adminMenuIsOpen: !state.adminMenuIsOpen,
        })),
    setDialogOpen: (isOpen: boolean, type: 'success' | 'error' | null, message: string) =>
        set((state) => ({
            ...state,
            dialogIsOpen: isOpen,
            dialogMessage: {
                text: message,
                type,
            },
        })),
});
