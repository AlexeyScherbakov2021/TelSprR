import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';




const Login = props => {

    let navigate = useNavigate();

    //console.log("param", Params[0]);

    return (
        
        <div className="Login">
            <div>
                <h1>Авторизация</h1>
                <form className="LoginForm" onSubmit={(e) => loginHandler(e, props.callBackAdm, navigate)}>
                    <label htmlFor="login">Логин</label>
                    <input id="login"
                    />
                    <label htmlFor="pass">Пароль</label>
                    <input id="pass"
                    />
                    <button
                        type="success"
                       
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
        
        );


}

function loginHandler(e, callBack, navigate) {
    e.preventDefault();
    const form = e.target;
    const login = form.login.value;
    const pass = form.pass.value;

    if (login === "admin" && pass === "55555") {
        callBack();
        navigate("/");
    }
    //console.log("loginHandler", form.login.value);
}

export default Login;




