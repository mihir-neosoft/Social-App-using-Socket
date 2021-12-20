import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { registeruser } from '../API/index';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const regForusername = RegExp("^[a-zA-Z0-9._-]");
const regForemail = RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$");
const regForpassword = RegExp("^[a-zA-Z0-9@*!&%$]{8,15}");

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({ username: "", email: "", password: "", confirmpassword: "", });
    const [verror, setVerror] = useState({ username: "", email: "", password: "", confirmpassword: "", });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setVerror({ ...verror, [name]: regForusername.test(value) ? "" : 'Enter a Valid Name (FirstNane LastName)' })
                break;
            case "email":
                setVerror({ ...verror, [name]: regForemail.test(value) ? "" : 'Enter a Valid Email' })
                break;
            case "password":
                setVerror({ ...verror, [name]: regForpassword.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            case "confirmpassword":
                setVerror({ ...verror, [name]: data.password === value ? "" : 'Password Not Matched)' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.username === "" && errors.email === "" && errors.password === "" && errors.confirmpassword === "") ? true : false;
        return validate;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.username !== "" && data.email !== "" && data.password !== "" && data.confirmpassword !== "") {
                console.log(data);
                registeruser(data);
                alert("User Registered");
                navigate('/Login');
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Details"); }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" method='post' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="username"
                                required
                                onChange={handleInputChange}
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                onChange={handleInputChange}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                onChange={handleInputChange}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                onChange={handleInputChange}
                                fullWidth
                                name="confirmpassword"
                                label="confirmpassword"
                                type="password"
                                id="confirmpassword"
                                autoComplete="new-confirm-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}