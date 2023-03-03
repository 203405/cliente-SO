import axios from 'axios';
import API from '../Network/API';
import swal2 from 'sweetalert2';

import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const getAllStates = (callback) => {

    //console.log("Obtenidno usuario desde funcion");
    axios({
        method: "GET",
        url: API + "/states/states_list",
        headers : {
            token : cookies.get('token')
        },
    }).then(response => {
        let data = response.data;
        
        if (data.status === 200) {    
            callback(data.estados);
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
