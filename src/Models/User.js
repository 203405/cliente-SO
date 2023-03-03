import axios from 'axios';
import API from '../Network/API';
import swal2 from 'sweetalert2';
import Cookies from 'universal-cookie';
import md5 from "md5"
const cookies = new Cookies();

export const getUserById = (IdUsuario,callback) => {

    //console.log("Obtenidno usuario desde funcion");
    axios({
        method: "GET",
        url: API + "/user/user_By_IdUser/" + IdUsuario,
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        
        if (data.status === 200) {    
            callback(data.user);
        } else {
            swal2.fire({
                icon: 'error',
                title: 'Error',
                text: "Ocurrio un error al momento de cargar al usuario, intente logueandose de nuevo",
                timer: "5000",
                confirmButtonColor: '#016390',
                confirmButtonText: 'Okey',
                allowEscapeKey: true,
                timerProgressBar: true,
            }).then(()=>{
                //window.location.href="/";
            });
            //window.location.href="/";
                    
        }
    }).catch((error) => {
        swal2.fire({
            icon: 'error',
            title: 'Error',
            text: "Error en el servidor\n" + error,
            timer: "5000",
            confirmButtonColor: '#016390',
            confirmButtonText: 'Okey',
            allowEscapeKey: true,
            timerProgressBar: true,
        }).then(()=>{
            //window.location.href="/";
        });
        
    });    

}

export const getAllUsers = (callback) => {

    //let token = 
    axios({
        method: "GET",
        url: API + "/user/all_user",
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        
        if (data.status === 200) {    
            callback(data.users);
        } else {
            swal2.fire({
                icon: 'error',
                title: 'Error',
                text: "No se pudieron obtener los datos del servidor",
                timer: "5000",
                confirmButtonColor: '#016390',
                confirmButtonText: 'Okey',
                allowEscapeKey: true,
                timerProgressBar: true,
            }).then(()=>{
                callback([]);
            });
            callback([]);
                    
        }
    }).catch((error) => {
        swal2.fire({
            icon: 'error',
            title: 'Error',
            text: "Error en el servidor\n" + error,
            timer: "5000",
            confirmButtonColor: '#016390',
            confirmButtonText: 'Okey',
            allowEscapeKey: true,
            timerProgressBar: true,
        }).then(()=>{
            //window.location.href="/";
        });
        
    });    

}

export const validateAccess = (IdUsuario, callback) =>{
    
    if(IdUsuario == null ){
        swal2.fire({
            icon: 'error',
            title: 'Error',
            text: "Acceso denegado, debes iniciar sesion",
            timer: "5000",
            confirmButtonColor: '#016390',
            confirmButtonText: 'Okey',
            allowEscapeKey: true,
            timerProgressBar: true,
        }).then(()=>{
            callback(true);
        });
        //callback(true);
    }else{
        //window.location.href = "/";
        callback(false);
    }
}

export const deleteUser = (IdUsuario, callback) => {

    //console.log("Obtenidno usuario desde funcion");
    axios({
        method: "DELETE",
        url: API + "/user/delete_user/"+IdUsuario,
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        
        if (data.status === 200) {    
            callback(true);
        } else {
            swal2.fire({
                icon: 'error',
                title: 'Error',
                text: "El servidor no pudo procesar la peticion",
                timer: "5000",
                confirmButtonColor: '#016390',
                confirmButtonText: 'Okey',
                allowEscapeKey: true,
                timerProgressBar: true,
            }).then(()=>{
                callback(false);
            });
            callback(false);
                    
        }
    }).catch((error) => {
        swal2.fire({
            icon: 'error',
            title: 'Error',
            text: "Error en el servidor\n" + error,
            timer: "5000",
            confirmButtonColor: '#016390',
            confirmButtonText: 'Okey',
            allowEscapeKey: true,
            timerProgressBar: true,
        }).then(()=>{
            window.location.href="/";
        });
        
    });    

}

export const createUser = (user, callback) => {

    //console.log("Obtenidno usuario desde funcion");
    console.log(user);
    user = {
        ...user,
        password : md5(user.password)
    }
    axios({
        method: "POST",
        url: API + "/user/create_user",    
        data:user,
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        
        if (data.status === 200) {    
            callback(true);
        } else {
            swal2.fire({
                icon: 'error',
                title: 'Error',
                text: "El servidor no pudo procesar la peticion",
                timer: "5000",
                confirmButtonColor: '#016390',
                confirmButtonText: 'Okey',
                allowEscapeKey: true,
                timerProgressBar: true,
            }).then(()=>{
                callback(false);
            });
            callback(false);
                    
        }
    }).catch((error) => {
        swal2.fire({
            icon: 'error',
            title: 'Error',
            text: "Error en el servidor\n" + error,
            timer: "5000",
            confirmButtonColor: '#016390',
            confirmButtonText: 'Okey',
            allowEscapeKey: true,
            timerProgressBar: true,
        }).then(()=>{
            window.location.href="/";
        });
        
    });    

}


export const updateUser = (user, callback) => {

    //console.log("Obtenidno usuario desde funcion");
    axios({
        method: "PUT",
        url: API + "/user/update_user",    
        data:user,
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        
        if (data.status === 200) {    
            callback(true);
        } else {
            swal2.fire({
                icon: 'error',
                title: 'Error',
                text: "El servidor no pudo procesar la peticion",
                timer: "5000",
                confirmButtonColor: '#016390',
                confirmButtonText: 'Okey',
                allowEscapeKey: true,
                timerProgressBar: true,
            }).then(()=>{
                callback(false);
            });
            callback(false);
                    
        }
    }).catch((error) => {
        swal2.fire({
            icon: 'error',
            title: 'Error',
            text: "Error en la peticion" + error,
            timer: "5000",
            confirmButtonColor: '#016390',
            confirmButtonText: 'Okey',
            allowEscapeKey: true,
            timerProgressBar: true,
        }).then(()=>{
            //window.location.href="/";
        });
        
    });    

}



