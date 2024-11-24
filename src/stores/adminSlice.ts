import { StateCreator } from 'zustand';
import { UserSlice } from './authSlice';
import { extraFieldsetData } from '@/data/admin/defaultsForHousesInputs';

export interface AdminSlice {
    adminMenuIsOpen: boolean;
    dialogIsOpen: boolean;
    dialogMessage: {
        text: string;
        type: 'error' | 'success' | null;
    };
    houseEditing: (Omit<HouseItem, 'photo'> & { photo: (string | File)[] }) | null;
    houseAdding: Omit<HouseItem, 'photo'> & { photo: (string | File)[] };

    setAdminMenuOpen: () => void;

    setDialogOpen: (isOpen: boolean, type: 'success' | 'error' | null, message: string) => void;

    setHouseEditing: (
        houseDataUpdate:
            | ((houseData: AdminSlice['houseEditing']) => AdminSlice['houseEditing'])
            | AdminSlice['houseEditing'],
    ) => void;
    setHouseAdding: (
        houseDataUpdate:
            | ((houseData: AdminSlice['houseAdding']) => AdminSlice['houseAdding'])
            | AdminSlice['houseAdding'],
    ) => void;
}

export const initialAdminState: Pick<
    AdminSlice,
    'dialogMessage' | 'dialogIsOpen' | 'adminMenuIsOpen' | 'houseEditing' | 'houseAdding'
> = {
    adminMenuIsOpen: true,
    dialogIsOpen: false,
    dialogMessage: {
        text: '',
        type: null,
    },
    houseEditing: null,
    houseAdding: {
        id: 0,
        name: '',
        title: {
            uk: '',
            ru: '',
            en: '',
        },
        long_title: {
            uk: '',
            ru: '',
            en: '',
        },
        decor_text: {
            uk: '',
            ru: '',
            en: '',
        },
        description: {
            uk: '',
            ru: '',
            en: '',
        },
        photo: [],
        rental_price: 0,
        max_adults: extraFieldsetData.filter((item) => item.nameAttr === 'max_adults')[0]
            .defaultValue!,
        is_available: true,
        discount_percent: 0,
        extra_adults: extraFieldsetData.filter((item) => item.nameAttr === 'extra_adults')[0]
            .defaultValue!,
        extra_children: extraFieldsetData.filter((item) => item.nameAttr === 'extra_children')[0]
            .defaultValue!,
        extra_adult_price: extraFieldsetData.filter(
            (item) => item.nameAttr === 'extra_adult_price',
        )[0].defaultValue!,
        extra_children_price: extraFieldsetData.filter(
            (item) => item.nameAttr === 'extra_children_price',
        )[0].defaultValue!,
        house_type: null,
        photoDecor: '',
        treesDecor: '',
        coordinates: {
            bottom: 0,
            left: 0,
        },
    },
};

export const createAdminSlice: StateCreator<
    AdminSlice & UserSlice,
    [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]],
    [],
    AdminSlice
> = (set, get) => ({
    ...initialAdminState,
    setAdminMenuOpen: () =>
        set((state) => ({
            ...state,
            adminMenuIsOpen: !state.adminMenuIsOpen,
        })),
    setDialogOpen: (isOpen, type, message) =>
        set((state) => ({
            ...state,
            dialogIsOpen: isOpen,
            dialogMessage: {
                text: message,
                type,
            },
        })),
    setHouseEditing: (houseDataUpdate) =>
        set((state) => {
            state.houseEditing =
                typeof houseDataUpdate === 'function'
                    ? houseDataUpdate(state.houseEditing)
                    : houseDataUpdate;
        }),
    setHouseAdding: (houseDataUpdate) =>
        set((state) => {
            state.houseAdding =
                typeof houseDataUpdate === 'function'
                    ? houseDataUpdate(state.houseAdding)
                    : houseDataUpdate;
        }),
});
