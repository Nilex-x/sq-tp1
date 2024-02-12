import {createContext, useState} from 'react'
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Login from "./Login.tsx";

export const AuthContext = createContext(null);

function App() {

    const [isConnected, setConnected] = useState(localStorage.getItem("isConnected") as string)

    const logoutUser = () => {
        localStorage.setItem("isConnected", "")
        setConnected("");
    }

    return (
        <AuthContext.Provider value={{isConnected, setConnected}}>
            <BrowserRouter>
                <div style={{margin: -10}}>
                    <AppBar position="static" sx={{backgroundColor: "#d48a6a"}}>
                        <Toolbar>
                            <Link to={"/"}
                                  style={{
                                      color: "white",
                                      borderWidth: 10,
                                      borderColor: "black",
                                      flexGrow: 1,
                                      textDecoration: "none"
                                  }}>
                                <Typography variant="h6" component="div">
                                    TP1
                                </Typography>
                            </Link>
                            {isConnected ?
                                <Button color="inherit" variant="outlined" onClick={logoutUser}>Logout</Button>
                                :
                                <Link to={"/login"} title={"Login"}
                                      style={{color: "white", borderWidth: 10, borderColor: "black"}}>
                                    <Button color="inherit" variant="outlined">Login</Button>
                                </Link>
                            }
                        </Toolbar>
                    </AppBar>
                </div>
                <div style={{margin: 10, marginTop: 20}}>
                    <Routes>
                        <Route path={"/"} Component={() => <div>Home</div>}/>
                        {!isConnected && <Route path={"/login"} Component={Login}/>}
                        <Route path={"*"} Component={() => <div>404 page not found !!</div>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
