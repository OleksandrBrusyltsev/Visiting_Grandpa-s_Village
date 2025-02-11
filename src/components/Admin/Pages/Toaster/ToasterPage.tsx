"use client";

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Stack } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { useMainStore } from '@/stores/store-provider';
import SubmitFabGroup from '../../UI/SubmitFabGroup/SubmitFabGroup';
import showErrors from '@/functions/showErrors';
import ToasterItem from './ToasterItem';

type Props = Readonly<{ data: AdvToaster[] }>;
dayjs.extend(customParseFormat);

export default function ToasterPage({ data }: Props) {
	const [activeToaster, setActiveToaster] = useState<AdvToaster | null>(data.filter((item) => item.is_active)[0]);
	const [loading, setLoading] = useState(false);

	const formRef = useRef<HTMLFormElement | null>(null);
	const changedToasterRef = useRef(new Set<number>());
	const resetToasterRef = useRef<(ResetType | null)[]>([]);

	const { refresh } = useRouter();

	const setDialogOpen = useMainStore((state) => state.setDialogOpen);
	const setIsDirtyPage = useMainStore((state) => state.setIsDirtyPage);

	const handleDataChange = (position: number) => {
		changedToasterRef.current.add(position);
	};

	const handleResetForm = () => {
		formRef.current?.reset();
		Object.entries(resetToasterRef.current).forEach(([index, ref]) => {
			ref?.reset();
		});
		setActiveToaster(data.filter((item) => item.is_active)[0]);
		changedToasterRef.current.clear();
		setIsDirtyPage(false);
		window?.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!changedToasterRef.current.size || !formRef.current) {
			return;
		}

		if (!formRef.current?.checkValidity()) {
			showErrors(formRef.current, setDialogOpen);
		} else {
			setLoading(true);
			const formData = new FormData(e.currentTarget);

			/*
			*Проверка на изменение данных  проходит в 2 этапа:
			*1.Собираем инлексі тостеров, в которых модифицировались данные
			*2. Проверяем, действительно ли данные были изменены (избегаем кейсов с редактированием и 
			*откату к первоначальным данным, без использования кнопки "Reset" в форме)
			*/
			const newActiveToasterIndex = data.findIndex((item) => item.id === activeToaster?.id);
			const previousActiveToasterIndex = data.findIndex((item) => item.is_active === true);

			//ищем тостеры, в которых реально произошли изменения
			const toastersWithChanges = new Set<number>();

			Array.from(formData.entries()).forEach(([key, currentValue]) => {
				const parts = key.split('-');
				const fieldName = parts[0] as keyof AdvToaster;
				const blockIndex = +parts.at(-1)!;
				const lang = parts.length === 3 ? (parts[1] as Language) : undefined;

				if (changedToasterRef.current.has(blockIndex)) {
					const initialValue = lang && typeof data[blockIndex][fieldName] === 'object'
						? (data[blockIndex][fieldName] as Record<Language, string>)[lang]
						: data[blockIndex][fieldName];

					const formattedValue = fieldName === 'start_date'
						? dayjs(currentValue as string, "DD/MM/YYYY").format("YYYY-MM-DD[T]00:00:00")
						: fieldName === 'end_date'
							? dayjs(currentValue as string, "DD/MM/YYYY").format("YYYY-MM-DD[T]23:59:59")
							: currentValue;
					if (initialValue.toString() !== formattedValue) toastersWithChanges.add(blockIndex);
				}
			});

			//если была смена активного тостера, тогда предыдущий тостер закидываем в changedToasterRef
			if (newActiveToasterIndex !== previousActiveToasterIndex) {
				previousActiveToasterIndex !== -1 && toastersWithChanges.add(previousActiveToasterIndex);
				toastersWithChanges.add(newActiveToasterIndex);
			}

			//чистим formData от неизменённых блоков
			for (let key of Array.from(formData.keys())) {
				const blockIndex = +key.split('-').at(-1)!;

				if (!toastersWithChanges.has(blockIndex)) {
					formData.delete(key);
				}
			}

			toastersWithChanges.forEach((blockIndex) =>
				formData.append(`is_active-${blockIndex}`, String(blockIndex === newActiveToasterIndex)));

			try {
				const response = await fetch('/api/admin/toasters/edit', {
					method: 'PUT',
					body: formData
				});
				if (response.status === 200) {
					setLoading(false);
					const data = await response.json();
					setDialogOpen(true, 'success', data.description);
					setIsDirtyPage(false);
					changedToasterRef.current.clear();
					refresh();
				} else {
					const errorData = await response.json();
					window?.scrollTo({ top: 0, behavior: 'smooth' });
					setDialogOpen(true, 'error', errorData.message);
					setLoading(false);
				}
			} catch (error) {
				window?.scrollTo({ top: 0, behavior: 'smooth' });
				setDialogOpen(true, 'error', `Щось пішло не так, як планувалось! Спробуйте ще раз!\n\n${(error as Error).message}`);
				setLoading(false);
			}
		}
	}

	const handleSetActiveToaster = (item: AdvToaster) => {
		if (item?.id === activeToaster?.id) setActiveToaster(null)
		else setActiveToaster(item);
		setIsDirtyPage(true);
	};

	return (
		<Box component={'form'} ref={formRef} onSubmit={handleSubmit} noValidate
			sx={{
				userSelect: 'none',
			}}
		>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{data.map((item, index) => (
						<ToasterItem
							key={item.id}
							data={item}
							position={index}
							setActiveToaster={() => handleSetActiveToaster(item)}
							handleDataChange={() => handleDataChange(index)}
							activeToaster={activeToaster}
							ref={(el) => resetToasterRef.current[index] = el}
						/>
					))}

				</Stack>
			</LocalizationProvider>
			<SubmitFabGroup
				loading={loading}
				onReset={handleResetForm}
				onSubmit={() => { }}
			/>
		</Box>
	)
}
