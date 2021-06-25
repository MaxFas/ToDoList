import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button, CircularProgress,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {ToDoListList} from "./components/ToDoListList";
import {Login} from "./components/Login";
import {Route, Switch, Redirect} from "react-router-dom";
import {initializeAppTC} from "./reducers/app-reducer";
import {logoutTC} from "./reducers/auth-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {

    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.loading)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state)=> state.auth.isLoggedIn)

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    useEffect( ()=> {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <ErrorSnackbar />
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn &&<Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
            {isLoading&&<LinearProgress color="secondary"/>}
            <Switch>
                <Route exact path={'/'} render={()=> <ToDoListList />}/>
                <Route path={'/ToDoList'} render={()=> <ToDoListList />}/>
                <Route path={'/login'} render={()=> <Login/>}/>
                <Route path={'/404'} render={()=> <h1 style={{textAlign: 'center', fontSize:'80px'}}> 404: PAGE IS NOT FOUND</h1>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default AppWithRedux;
