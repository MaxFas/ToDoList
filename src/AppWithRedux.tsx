import React from 'react';
import './App.css';
import {
    AppBar,
    Button,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {ToDoListList} from "./components/ToDoListList";
import {Login} from "./components/Login";
import {Route, Switch, Redirect} from "react-router-dom";

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {

    let isLoading = useSelector<AppRootStateType, boolean>(state => state.app.loading)

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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {isLoading&&<LinearProgress color="secondary"/>}
            <Switch>
                <Route exact path={'/'} render={()=> <ToDoListList />}/>
                <Route path={'/login'} render={()=> <Login/>}/>
                <Route path={'/404'} render={()=> <h1 style={{textAlign: 'center', fontSize:'80px'}}> 404: PAGE IS NOT FOUND</h1>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default AppWithRedux;
