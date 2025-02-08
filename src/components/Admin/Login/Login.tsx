"use client";
import React, { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

import { useMainStore } from '@/stores/store-provider';

const SignInContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
  },
});


export default function SignIn() {
  const locale = useLocale();
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const setUser = useMainStore((state) => state.setUser);

  const { replace } = useRouter();
  
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) setError(null);

    if (validateInputs()) {
      !loading && setLoading(true); 
      
      const formData = new FormData(e.target as HTMLFormElement);
  
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })
  
      setLoading(false);
  
      if (!response.ok) {
        const errorText: {
          error: string
        } = await response.json();
        setError(errorText.error);
        return
      }
  
      const user = await response.json();
  
      if (user) {
        setUser(user);
        (e.target as HTMLFormElement).reset();
        replace(`/${locale}/admin_hub`);
      }
    }
  }

  const validateInputs = () => {

    let isValid = true;
    if (!emailRef.current?.value) {
      setEmailErrorMessage("Поле для логіну обов'язкове");
      isValid = false;
    } else {
      setEmailErrorMessage('');
    }

    if (!passwordRef.current?.value) {
      setPasswordErrorMessage("Поле для пароля обов'язкове");
      isValid = false;
    } else {
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <SignInContainer sx={{
      minHeight: 'calc(100dvh - 96px)'
    }}>
      <div className='flex flex-col items-center gap-6 w-96 rounded-lg shadow-xl border-black border-solid border p-6'>
        <h1 className='text-center text-2xl font-bold'>НА СЕЛІ У ДІДУСЯ</h1>
        <h2 className='text-center text-xl font-semibold'>Авторизація</h2>
        <Stack
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <TextField
              inputRef={emailRef}
              error={Boolean(emailErrorMessage)}
              label="Логін"
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              fullWidth
              color={Boolean(emailErrorMessage) ? 'error' : 'primary'}
              sx={{ ariaLabel: 'email' }}
              onChange={() => setEmailErrorMessage('')}
            />
          </FormControl>
          <FormControl>

            <TextField
              inputRef={passwordRef}
              error={Boolean(passwordErrorMessage)}
              helperText={passwordErrorMessage}
              label="Пароль"
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              fullWidth
              variant="outlined"
              color={Boolean(passwordErrorMessage) ? 'error' : 'primary'}
              onChange={() => setPasswordErrorMessage('')}
            />
          </FormControl>
          <Typography sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              padding: '10px 14px',
              mt: 2, 
              fontSize: 20,
              bgcolor: 'rgb(63, 85, 64)'
            }}
          >
           Увійти
          </Button>
        </Stack>
      </div>
    </SignInContainer>
  );
}