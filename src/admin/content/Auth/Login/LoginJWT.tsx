import * as Yup from 'yup';
import type {FC} from 'react';
import React from 'react';
import {Formik} from 'formik';
import { useDispatch } from '../../../store';

import {
    Alert, 
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';

import useAuth from '../../../hooks/useAuth';
import {AxiosError} from 'axios';
import { setMenu } from '../../../slices/menuItems';

const LoginJWT: FC = () => {
    const login = useAuth() as any;
    console.log(login);
    const dispatch = useDispatch();

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 2].focus();
            event.preventDefault();
        }
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <Formik
        initialValues= {{
            userId: '',
            password: '',
            submit: null
        }}
        validationSchema={Yup.object().shape({
            userId: Yup.string()
            .required('Requerido'),
        password: Yup.string()
            .required('Requerido'),
        })}
        onSubmit={async (
            values : any,
            {setStatus,setSubmitting}
        ): Promise<void> => {
            try {
                const response = await login(values.userId, values.password);
                console.log('sale');
                if(!response.data.token) {
                    console.log('no hay respuesta');
                }
                
                setStatus({success: true});
                setSubmitting(false);
                console.log('todo bien seteado');
            } catch (err) {
                setStatus({success: false})
                setSubmitting(false);
            }
        }}
        >
        {({
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
        }): JSX.Element => (
            <form noValidate onSubmit={handleSubmit} autoComplete="off">
                <TextField
                    id="inp-login-user"
                    fullWidth
                    margin="normal"
                    autoFocus
                    label="Usuario"
                    name="userId"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    type="text"
                    value={values.userId}
                    variant="outlined"
                    />
                <TextField
                    id="inp-login-pass"
                    fullWidth
                    margin="normal"
                    label="Contraseña"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                    />
                
                <Button
                    id="btn-login"
                    sx={{
                        mt:2
                    }}
                    color="primary"
                    startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null}
                    disabled={isSubmitting}
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                >
                    <Typography variant="h4">Log in</Typography>   
                </Button>
                
            </form>
        )}
        
        </Formik>
    );
};

export default LoginJWT;

