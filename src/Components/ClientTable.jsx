import { useState, useEffect } from 'react';
import { validateAccess } from '../Models/User.js';
import swal2 from 'sweetalert2';
import Cookies from 'universal-cookie';
import { getAllClients, deleteClient } from '../Models/Client'
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Visibility";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Update from "@material-ui/icons/UpdateSharp";
import DataTable from "react-data-table-component";
import { castDate } from "../Models/Date";
import DataTableExtensions from "react-data-table-component-extensions";
const cookies = new Cookies();


const ClientTable = () => {

    const [clients, setClients] = useState([]);

    const questionDeleteUser = (row) => {
        swal2.fire({
            title: '¿Eliminar Ciente?',
            text: "Estas seguro de que quieres eliminar al cliente " + row.nombre + ' ' + row.apellidoPaterno+ ' ' + row.apellidoMaterno,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E60026',
            timer:"15000",
            reverseButtons: true,
            timerProgressBar: true,
            confirmButtonText: 'Si eliminar',            
            footer: '<p style="color:#E60026;">No se podra recuperar el cliente una ves eliminado</p>',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteClient(row.IdCliente, (data) => {
                    if (data === true) {
                        swal2.fire({
                            title: 'Cliente eliminado',
                            text: "Se elimino al cliente: " + row.nombre + ' ' + row.apellidoPaterno + ' ' + row.apellidoMaterno,
                            icon: 'success',
                            timer: "3000",
                            confirmButtonColor: '#016390',
                        }).then(() => {
                            showData('success', 'Tabla actualizada');
                        });

                    }
                });
            } else {

            }
        })
    }

    const showData = async (icon, title) => {
        await getAllClients((data) => {
            if (data.length === 0) {
                Toast.fire({
                    icon: 'warning',
                    title: 'No hay clientes para mostrar'
                })
            }
            for (let i = 0; i < data.length; i++) {
                data[i].fechaNacimiento = data[i].fechaNacimientoCliente.toString().substring(0, 10);
            }
            setClients(data);
            Toast.fire({
                icon: icon,
                title: title === '' ? 'Se encontraron ' + data.length + ' clientes' : 'Tabla actualizada'
            })
            console.log(clients);
        });
    }
    const tableData = {
        columns: [
            {
                name: "Nombres",
                selector: row => row.nombreCliente,
                sortable: true
            },
            {
                name: "Apellido Paterno",
                selector: row => row.paternoCliente,
                sortable: true
            },
            {
                name: "Apellido Materno",
                selector: row => row.maternoCliente,
                sortable: true
            },
            {
                name: "Fecha de Nacimiento",
                selector: row => castDate(row.fechaNacimientoCliente).toString(),
                sortable: true
            },
            {
                name: "Genero",
                selector: row => row.tipoGeneroCliente,
                sortable: true
            },  
            {
                name: "Tipo Persona",
                selector: row => row.tipoPersonaCliente,
                sortable: true
            },                        
            {
                name: "Acciones",
                cell: (row) => (
                    <div>
                        <IconButton
                            style={{ color: '#E60026' }}
                            onClick={() => questionDeleteUser(row)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            style={{ color: '#016390' }}
                            onClick={() => viewUser(row)}

                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                )
            }
        ],
        data: clients
    };

    const viewUser = (row) =>{
        console.log(row);
        cookies.set('IdCliente', row.IdCliente, { path: "/" });
        window.location.href = "/clients-view"
    }

    const Toast = swal2.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal2.stopTimer)
            toast.addEventListener('mouseleave', swal2.resumeTimer)
        }
    });

    useEffect(() => {
        let IdUsuario = cookies.get('IdUsuario');
        //let token = cookies.get('token');

        validateAccess(IdUsuario, (data) => {
            if (!data === true) {
                showData('info', '')
            } else {
                window.location.href = "/";
            }
        });


    }, []);

    const newClient = () =>{
        cookies.remove('IdCliente', {path: "/"});
        window.location.href = "/clients-view"
    }
    

    return (
        <>
            <div className="main">
                <div className="divBtn">
                    <p className="" align="right">
                        <button type="submit" className="btnAgregarUsuario" onClick={() => newClient()} ><Add /></button>
                        <button type="submit" className="btnActualizarTabla" onClick={() => showData('success', '')} ><Update /></button>

                    </p>
                </div>
                <div className="divTabla">
                    <DataTableExtensions {...tableData } >
                        <DataTable
                            columns={tableData.columns}
                            data={clients}
                            //selectableRows
                            title="Tabla Clientes"
                            clearSelectedRows
                            //onChangePage
                            // noHeader
                            defaultSortField="IdCliente"
                            sortIcon={<SortIcon />}
                            defaultSortAsc={true}
                            pagination
                            //highlightOnHover
                            dense
                            

                        />
                    </DataTableExtensions>
                </div>
            </div>
        </>
    );

}


export default ClientTable;