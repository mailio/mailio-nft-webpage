import { FC, useState } from "react";
import { InputAdornment, styled, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Password, Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/use-auth";
import toast from "react-hot-toast";
import { useMounted } from "../../hooks/use-mounted";
import { useRouter } from "next/router";
import { AuthenticationError } from '../../types/auth-error';

const TransparentTextField = styled(TextField)(
    ({ theme }) => ({
        '& .MuiInputBase-input': {
            color: '#dddddd',
            outline: 'none',
            fontWeight: 300,
            '&:focus': {
                borderColor: '#dddddd',
            },
            '& hover': {
                borderColor: '#dddddd',
            },
            '& Mui-focused': {
                color: '#ddd',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#dddddd',
        },
        '& .MuiInputAdornment-root': {
            color: '#dddddd',
        },
    })
);

interface LoginInputs {
    email: string;
    password: string;
}

export const Login: FC = () => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginInputs>();
    const isMounted = useMounted();
    const router = useRouter();
    const { login } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const onSubmit = async (data: LoginInputs) => {
        try {
            setIsSubmitting(true);
            await login(data.email, data.password);
            if (isMounted()) {
                const returnUrl = (router.query.returnUrl as string) || '/admin/dashboard';
                router.push(returnUrl);
            }
        } catch (error: any) {
            if (error instanceof AuthenticationError) {
                setError('password', { type: 'custom', message: 'Login failed. Please try again.' });
                return;
            }
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <TransparentTextField
                    autoFocus
                    fullWidth
                    label="Email Address"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                    margin="normal"
                    id="email"
                    type="email"
                    {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                    error={errors.email ? true : false}
                    helperText={errors.email ? 'Please enter a valid email address' : ''}
                />
                <TransparentTextField
                    autoFocus
                    fullWidth
                    label="Password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Password />
                            </InputAdornment>
                        ),
                    }}
                    {...register('password', { required: true })}
                    margin="normal"
                    error={errors.password ? true : false}
                    helperText={errors.password ? 'Please enter a valid password and email' : ''}
                    type="password"
                />
                <LoadingButton
                    loading={isSubmitting}
                    sx={{
                        mt: 2,
                    }}
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Login
                </LoadingButton>
            </form>
        </>
    );
};