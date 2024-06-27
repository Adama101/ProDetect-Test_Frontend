'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';
import { Select, MenuItem } from '@mui/material';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  organisationName: zod.string().min(1, { message: 'Organisation Name is required' }),
  industry: zod.string().min(1, { message: 'Industry is required' }),
  organisationSize: zod.string().min(1, { message: 'Organisation Size is required' }),
  country: zod.string().min(1, { message: 'Country is required' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { 
  firstName: '', 
  lastName: '', 
  email: '', 
  password: '', 
  organisationName: '',
  industry: '',
  organisationSize: '',
  country: '',
  terms: false 
} satisfies Values;


export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  useUser();

  const [isPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (): Promise<void> => {
      // Navigate to the dashboard route directly
      router.push('/dashboard/integrations');
    },
    [router]
  );
  
  
    return (
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4">Sign up</Typography>
          <Typography color="text.secondary" variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
              Sign in
            </Link>
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.firstName)}>
                  <InputLabel>First name</InputLabel>
                  <OutlinedInput {...field} label="First name" />
                  {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.lastName)}>
                  <InputLabel>Last name</InputLabel>
                  <OutlinedInput {...field} label="Last name" />
                  {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <InputLabel>Email address</InputLabel>
                  <OutlinedInput {...field} label="Email address" type="email" />
                  {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput {...field} label="Password" type="password" />
                  {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="organisationName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.organisationName)}>
                  <InputLabel>Organisation Name</InputLabel>
                  <OutlinedInput {...field} label="Organisation Name" />
                  {errors.organisationName ? <FormHelperText>{errors.organisationName.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="industry"
              render={({ field }) => (
                <FormControl error={Boolean(errors.industry)}>
                  <InputLabel>Industry</InputLabel>
                  <Select {...field} label="Industry">
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Education">Insurance</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.industry ? <FormHelperText>{errors.industry.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="organisationSize"
              render={({ field }) => (
                <FormControl error={Boolean(errors.organisationSize)}>
                  <InputLabel>Organisation Size</InputLabel>
                  <OutlinedInput {...field} label="Organisation Size" />
                  {errors.organisationSize ? <FormHelperText>{errors.organisationSize.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <FormControl error={Boolean(errors.country)}>
                  <InputLabel>Country</InputLabel>
                  <OutlinedInput {...field} label="Country" />
                  {errors.country ? <FormHelperText>{errors.country.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <div>
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={
                      <React.Fragment>
                        I have read the <Link>terms and conditions</Link>
                      </React.Fragment>
                    }
                  />
                  {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
                </div>
              )}
            />
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit" variant="contained">
              Sign up
            </Button>
          </Stack>
        </form>
      </Stack>
    );
  }