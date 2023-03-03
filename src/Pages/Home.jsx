import { Component } from "react";
import NavBar from "../Components/NavBar";
import {getUserById, validateAccess} from '../Models/User.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Home extends Component {

    state = {
        user : {
            IdUsuario: 0,
            direccion: "",
            fechaNacimiento: "",
            materno: "",
            nombre: "",
            password: "",
            paterno: "",
            username: "",
        },
    }


    componentDidMount() {

        document.body.style.backgroundColor = "#016390";
        window.document.title = 'Inicio';
        let IdUsuario = cookies.get('IdUsuario');
        //let token = cookies.get('token');
        validateAccess(IdUsuario,(data)=>{
            if(!data === true){
                getUserById(IdUsuario, (data) =>{            
                    this.setState({
                        user: data
                    });
                });   
            }else{
                window.location.href="/";  
            }
        });
        
    }


    
    render() {
        return (
            <>
                <NavBar username={this.state.user.nombre+ " " +this.state.user.paterno+ " " +this.state.user.materno} />
                {/* <NavBar username="Donny"/> */}
            </>
        );
    }
}


export default Home;