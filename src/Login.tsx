import React, {useContext, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {getDatabase, set, ref} from "firebase/database";
import {AuthContext} from "./App.tsx";
import {useNavigate} from "react-router-dom";
import bcrypt from 'bcryptjs-react';

const styles = {
    container: {
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "center",
        "alignItems": "center",
        "width": "100%",
        "height": "90vh",
    },
    box: {
        padding: 2,
        boxShadow: "1px 1px 10px 0px #d48a6a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "40%",
        borderWidth: "1px",
        borderRadius: "10px",
        backgroundColor: "navajowhite",
    },
    formContainer: {
        m: 1,
        width: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
}

function Login() {
    const { setConnected } = useContext(AuthContext);
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError(false)
        setPasswordError(false)

        if (!email.includes("@")) {
            setEmailError(true)
        }

        const db = getDatabase();
        await set(ref(db, 'users/' + crypto.randomUUID()), {
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        })
        localStorage.setItem("isConnected", "connected");
        setConnected("connected")
        navigate("/");
    }

    return (
        <Box sx={styles.container}>
            <Box component={"form"} sx={styles.box} onSubmit={login} autoComplete="off">
                <Typography variant="h5" component="div" sx={{marginBottom: 2}}>
                    Connexion
                </Typography>
                <FormControl sx={styles.formContainer} required fullWidth>
                    <TextField
                        required
                        fullWidth
                        id="outlined-adornment-email"
                        type={'text'}
                        label="Email"
                        helperText={emailError ? "Invalid email !" : ""}
                        error={emailError}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl sx={styles.formContainer} required fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        error={passwordError}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button sx={{
                    marginTop: 2,
                    color: "black",
                    borderColor: "black",
                    borderRadius: 0,
                    transition: "0.5s",
                    ":hover": {borderColor: "black", borderRadius: 5}
                }} type="submit" variant="outlined">Se connecter</Button>
            </Box>
        </Box>
    )
}

export default Login
