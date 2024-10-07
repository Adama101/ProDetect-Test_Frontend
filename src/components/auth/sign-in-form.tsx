'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import Checkbox from '@mui/material/Checkbox';
import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';
import { Box, FormControlLabel } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email('Invalid email address'),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError('root', {
          type: 'manual',
          message: 'Invalid email or password',
        });
      } else {
        router.push(''); // Redirect to dashboard or home page after successful sign-in
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('root', {
        type: 'manual',
        message: 'An error occurred during sign-in',
      });
    }
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">Log In</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)} required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" required />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)} required>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <div>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
            Forgot password?
            </Link></Box>
          </div>
          {errors.root && (
            <Alert severity="error">{errors.root.message}</Alert>
          )}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </form>
    </Stack>
  );
}
