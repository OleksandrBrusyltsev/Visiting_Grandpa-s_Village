import { StateCreator } from 'zustand';
import { UserSlice } from './authSlice';
import { extraFieldsetData } from '@/data/admin/defaultsForHousesInputs';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface AdminSlice {
    adminMenuIsOpen: boolean;
    dialogIsOpen: boolean;
    dialogMessage: {
        text: string;
        type: 'error' | 'success' | null;
    };
    isDirtyPage: boolean;
    houseData: Omit<HouseItem, 'photo'>;
    photosEditing: Array<DnDItem<UniqueIdentifier>>;

    setAdminMenuOpen: () => void;

    setDialogOpen: (isOpen: boolean, type: 'success' | 'error' | null, message: string) => void;

    setIsDirtyPage: (isDirty: boolean) => void;

    setHouseData: (
        houseDataUpdate:
            | ((houseData: AdminSlice['houseData']) => AdminSlice['houseData'])
            | AdminSlice['houseData'],
        resetDirtyPage?: boolean,
    ) => void;
    setPhotosEditing: (
        photosUpdate:
            | ((photosData: AdminSlice['photosEditing']) => AdminSlice['photosEditing'])
            | AdminSlice['photosEditing'],
        resetDirtyPage?: boolean,
    ) => void;
}

export const initialAdminState: Pick<
    AdminSlice,
    | 'adminMenuIsOpen'
    | 'dialogIsOpen'
    | 'dialogMessage'
    | 'isDirtyPage'
    | 'houseData'
    | 'photosEditing'
> = {
    adminMenuIsOpen: true,
    dialogIsOpen: false,
    dialogMessage: {
        text: '',
        type: null,
    },
    isDirtyPage: false,
    houseData: {
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
    photosEditing: [],
};

export const createAdminSlice: StateCreator<
    AdminSlice & UserSlice,
    // [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]]1,
    [['zustand/devtools', never], ['zustand/immer', never]],
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
    setIsDirtyPage: (isDirty) =>
        set((state) => ({
            ...state,
            isDirtyPage: isDirty,
        })),
    setHouseData: (houseDataUpdate, resetDirtyPage) =>
        set((state) => {
            if (resetDirtyPage && state.isDirtyPage) {
                state.isDirtyPage = false;
            } else if (resetDirtyPage === undefined && !state.isDirtyPage) {
                state.isDirtyPage = true;
            }
            state.houseData =
                typeof houseDataUpdate === 'function'
                    ? houseDataUpdate(state.houseData)
                    : houseDataUpdate;
        }),
    setPhotosEditing: (photosDataUpdate, resetDirtyPage) =>
        set((state) => {
            if (resetDirtyPage && state.isDirtyPage) {
                state.isDirtyPage = false;
            } else if (resetDirtyPage === undefined && !state.isDirtyPage) {
                state.isDirtyPage = true;
            }
            state.photosEditing =
                typeof photosDataUpdate === 'function'
                    ? photosDataUpdate(state.photosEditing)
                    : photosDataUpdate;
        }),
});
