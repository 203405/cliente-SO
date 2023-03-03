import axios from 'axios';
import API from '../Network/API';
import swal2 from 'sweetalert2';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const getAllClients = (callback) => {

    
    axios({
        method: "GET",
        url: API + "/client/client_all",
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        if (data.status === 200) {    
            callback(data.clients);
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
        
        });
        
    });    

}



export const getAllEstadosCiviles = (callback) => {

    
    axios({
        method: "GET",
        url: API + "/client/estados_civiles_list",
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        if (data.status === 200) { 
            //console.log(data.estadosCiviles);   
            callback(data.estadosCiviles);
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
          
        });
        
    });    

}




export const getAllGeneros = (callback) => {

    
    axios({
        method: "GET",
        url: API + "/client/genero_list",
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        if (data.status === 200) {    
            // console.log(data.generos);
            callback(data.generos);
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
            
        });
        
    });    

}

export const getAllEstudios = (callback) => {
    
    axios({
        method: "GET",
        url: API + "/client/estudios_list",
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        if (data.status === 200) {    
            // console.log(data.generos);
            callback(data.estadosCiviles);
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
            
        });
        
    });    

}

export const getAllTiposVivienda = (callback) => {

    
    axios({
        method: "GET",
        url: API + "/client/tipovivienda_list",
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        if (data.status === 200) {    
            // console.log(data.generos);
            callback(data.titposVivienda);
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
            text: "No se pudo procesar la peticion",
            timer: "5000",
            confirmButtonColor: '#016390',
            confirmButtonText: 'Okey',
            allowEscapeKey: true,
            timerProgressBar: true,
        }).then(()=>{
           
        });
        
    });    

}

export const deleteClient = (IdClient, callback) => {

    
    axios({
        method: "DELETE",
        url: API + "/client/delete_client/"+IdClient,
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
            
        });
        
    });    

}

export const getClientById = (IdCliente,callback) => {

    axios({
        method: "GET",
        url: API + "/client/getClientById/"+IdCliente,
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        
        if (data.status === 200) {    
            callback(data.client);
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
            
        });
        
    });    

}


export const client_update = (client,callback) => {
    // console.log(client.IdTipoPersonaCliente);
    axios({
        method: "PUT",
        url: API + "/client/update_client",
        data : client,
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        // console.log(data);
        if (data.status === 200) {    
            callback(true);
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
            
        });
        
    });    

}


export const client_new = (client,callback) => {

    axios({
        method: "POST",
        url: API + "/client/create_client",
        data : client,
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        // console.log(data);
        if (data.status === 200) {    
            callback([true,data.client]);
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
            // window.location.href="/";
        });
        
    });    

}