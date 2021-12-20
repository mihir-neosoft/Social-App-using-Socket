import React, { useState } from 'react';
import { login } from '../API/index';
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const regForemail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const regForpassword = RegExp('^[a-zA-Z0-9@*!&%$]{8,15}$');

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [verror, setVerror] = useState({ email: "", password: "" });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                setVerror({ ...verror, [name]: regForemail.test(value) ? "" : 'Enter a Valid Email' })
                break;
            case "password":
                setVerror({ ...verror, [name]: regForpassword.test(value) ? "" : 'Enter a Valid Password (must include 8 character)' })
                break;
            default: break;
        }
        setData({ ...data, [name]: value });
    }
    const handleValidate = (errors) => {
        let validate = (errors.email === "" && errors.password === "") ? true : false;
        return validate;

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (handleValidate(verror)) {
            if (data.email !== "" && data.password !== "") {
                console.log(data);
                login(data).then(res => {
                    console.log(res.data);
                    sessionStorage.setItem('_id', res.data.user._id);
                    sessionStorage.setItem('username', res.data.user.username);
                    navigate('/mypost');
                });
            } else { alert("Please Fill All Fields"); }
        } else { alert("Please Enter Valid Email and Password"); }
    }

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
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        onChange={handleInputChange}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        onChange={handleInputChange}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}