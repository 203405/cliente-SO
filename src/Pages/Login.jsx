import React, { Component } from "react";
import "../CSS/Login.css"
import swal2 from 'sweetalert2';
import axios from 'axios';
import API from '../Network/API';
import Cookies from 'universal-cookie';
import md5 from 'md5';

//import swal from 'sweetalert';

const cookies = new Cookies();

var message = "";

class Login extends Component {
    constructor(props) {
        super(props);

        this.inputPassword = React.createRef();
        this.inputUsername = React.createRef();

    }
    
    state = {
        form: {
            username: "",
            password: "",
        },
        isMovil: false,
        flag: false
    }
    

    handleChange = async (e) => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        //console.log(this.state.form);
    }

    componentDidMount() {

        document.body.style.backgroundColor = "#016390";
        window.document.title = 'Login';
        this.inputUsername.current.focus();
        let details = navigator.userAgent;
        let regexp = /android|iphone|kindle|ipad/i;
        let isMobileDevice = regexp.test(details);

        if (isMobileDevice) {
            //alert("You are using a Mobile Device");
            swal2.fire({
                imageUrl: 'https://1000marcas.net/wp-content/uploads/2020/01/Domino’s-logo.jpg',
                title: 'Cargando pagina',
                imageHeight: 120,
                text: "Por favor espere un momento",
                footer:'<p>Estamos trabajando para ti</p>',
                timer: "2300",
                confirmButtonColor: '#016390',    
                showConfirmButton:false,            
                allowEscapeKey: true,
                timerProgressBar: true,
            })
            this.setState({
                isMovil: false
            })
            //document.body.style.backgroundColor = "#016390";
        } else {
            //alert("You are using Desktop");
            this.setState({
                isMovil: true
            })
        }
        this.inputUsername.current.focus();
    }

    validateInput = async () => {
        let isEmptyUsername = false;
        let isEmptyPassword = false;
        let cont = 0;
        if (this.state.form.username === "") {
            message = "Falta llenar el campo de nombre de usuario";
            cont++;
            isEmptyUsername = true;

        }

        if (this.state.form.password === "") {
            if (cont === 1) {
                cont++;
                message = message + " y contraseña";
                isEmptyUsername = true;
            } else {
                message = "Falta llenar el campo de contraseña";
                cont++;
                isEmptyPassword = true;
            }
        }


        //alert(cont,message);
        if (cont > 0) {
            swal2.fire({ 
                icon:'warning',               
                title: 'Atencion',
                text: message,
                timer: "5000",
                confirmButtonColor: '#016390',
                confirmButtonText: 'Okey',
                allowEscapeKey: true,
                timerProgressBar: true,
            }).then(() => {
                if (isEmptyUsername) {
                    this.inputUsername.current.focus();
                }
                if (isEmptyPassword) {
                    this.inputPassword.current.focus();
                }
            })
            if (isEmptyUsername) {
                this.inputUsername.current.focus();
            }
            if (isEmptyPassword) {
                this.inputPassword.current.focus();
            }
        } else {
            this.startLogin();
        }
    }

    onKeyDown = (e) => {
        //console.log(e.key);       
        if (e.key === 'Enter' && e.target.name === 'username') {

            this.inputPassword.current.focus();
        }
        if (e.key === 'Enter' && e.target.name === 'password') {
            this.validateInput();
            //this.inputPassword.current.focus();
        }
        if (e.key === 'Escape') {
            console.log("Escape");
            this.setState({
                form: {
                    username: '',
                    password: ''
                }
            });
            this.inputUsername.current.focus();
        }
    }

    startLogin = async () => {
        ///alert(md5(this.state.form.password));
        await axios({
            method: "POST",
            url: API + "/user/login",
            data: {
                username: this.state.form.username,
                password: md5(this.state.form.password)
            }
        }).then(response => {
            let data = response.data;
            //console.log(data);
            if (data.status === 201) {
                swal2.fire({
                    icon:'error',            
                    title: 'Error',
                    text: "Acceso denegado, verifique bien su usuario y/o contraseña",
                    timer: "5000",
                    confirmButtonColor: '#016390',
                    confirmButtonText: 'Okey',
                    allowEscapeKey: true,
                    timerProgressBar: true,
                }).then(()=>{
                    this.inputUsername.current.focus();
                    this.inputUsername.current.focus();
                    this.inputUsername.current.focus();
                });
                this.inputUsername.current.focus();
                this.inputUsername.current.focus();
                this.inputUsername.current.focus();
            } else {
                if(data.status === 202){
                    swal2.fire({
                        icon:'warning',            
                        title: 'Usuario no activo',
                        text: "Tu cuenta no esta activada, pide que te la activen",
                        timer: "5000",
                        confirmButtonColor: '#016390',
                        confirmButtonText: 'Okey',
                        allowEscapeKey: true,
                        timerProgressBar: true,
                    }).then(()=>{
                        this.inputUsername.current.focus();
                        this.inputUsername.current.focus();
                        this.inputUsername.current.focus();
                    });
                    this.inputUsername.current.focus();
                    this.inputUsername.current.focus();
                    this.inputUsername.current.focus();
                }else{
                    cookies.set('IdUsuario', data.user.IdUsuario, { path: "/" });
                    cookies.set('token', data.user.token, {path: "/"});
                    window.location.href = "/home";
                }

                
            }
        }).catch((error) => {
            swal2.fire({
                icon:'error',            
                title: 'Error',      
                text: "Error en el servidor\n" + error,
                timer: "5000",
                confirmButtonColor: '#016390',
                confirmButtonText: 'Okey',
                allowEscapeKey: true,
                timerProgressBar: true,
            });
        });
    }


    render() {
        return (
            <>
                <div id="container">
                    <div id="inviteContainer">
                        {this.state.isMovil ? <div className="logoContainer">
                            <img className="logo" alt="" src={"https://1000marcas.net/wp-content/uploads/2020/01/Domino’s-logo.jpg"} />
                        </div> : null}
                        <div className="acceptContainer">
                            {/* <form> */}

                            <div className="formContainer"  >
                                <div className="formDiv" style={{ transitionDelay: '0.2s' }}>
                                    <h2>Inicio de Sesión</h2>
                                </div>
                                {/* {this.state.flag === true ? <h4 style={{ backgroundColor: '#000000' }} >Acceso denegado</h4> : null} */}
                                <div className="formDiv" style={{ transitionDelay: '0.2s' }}>
                                    <h3>Nombre de Usuario</h3>
                                    <input
                                        ref={this.inputUsername}
                                        type="username"
                                        name="username"
                                        placeholder="Nombre de Usuario"
                                        onChange={(e) => this.handleChange(e)}
                                        onKeyDown={this.onKeyDown}
                                        value={this.state.form.username}
                                    />
                                </div>
                                <div className="formDiv" style={{ transitionDelay: '0.4s' }}>
                                    <h3>Contraseña</h3>
                                    <input
                                        ref={this.inputPassword}
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        onChange={(e) => this.handleChange(e)}
                                        onKeyDown={this.onKeyDown}
                                        value={this.state.form.password}
                                    />
                                </div>
                                <div className="formDiv" style={{ transitionDelay: '0.6s' }}>
                                    <button className="acceptBtn" type="submit" onClick={() => this.validateInput()}>Iniciar Sesion</button>
                                </div>
                            </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>

            </>
        );
    }
}



export default Login;