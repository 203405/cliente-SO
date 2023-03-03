import DataTable from "react-data-table-component";
//import React from "react";
import DataTableExtensions from "react-data-table-component-extensions";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "react-data-table-component-extensions/dist/index.css";
import { useState, useEffect, useRef } from 'react';
import "../CSS/UserTable.css"
import swal2 from 'sweetalert2';
import Update from "@material-ui/icons/UpdateSharp";
import Description from "@material-ui/icons/Description";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Print from "@material-ui/icons/Print";
import { getAllUsers } from "../Models/User";
import { castDate } from "../Models/Date";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { validateAccess, deleteUser, createUser, updateUser } from '../Models/User.js';
import Cookies from 'universal-cookie';
import { CSVLink } from 'react-csv';
//import { JsonToTable } from "react-json-to-table";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';



const cookies = new Cookies();


const UserTable = () => {

    const inputNombre = useRef(null);
    const inputPaterno = useRef(null);
    const inputMaterno = useRef(null);
    const inputUsername = useRef(null);
    const inputPassword = useRef(null);
    const inputFechaNacimiento = useRef(null);
    const inputDireccion = useRef(null);
    const inputBtnGuardar = useRef(null);

    const handleOpen = () => inputNombre.current.focus();
    
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        IdUsuario: "",
        nombre: "",
        paterno: "",
        materno: "",
        fechaNacimiento: "",
        tempFechaNacimiento: "",
        username: "",
        password: "",
        direccion: "",
        status: false,
    })

    const [openModal, setOpenModal] = useState(false)
    const [openModalD, setOpenModalD] = useState(false)

    const modalStyles = {
        top: '1%',
    }
    const modalStylesD = {
        top: '25%',
    }


    const handleChange = async (e) => {
        console.log(e.target.value);
        
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })   

    }

    const showData = async (icon, title) => {
        getAllUsers((data) => {
            for (let i = 0; i < data.length; i++) {
                data[i].fechaNacimiento = data[i].fechaNacimiento.toString().substring(0, 10);
            }

            if (data.length === 0) {
                Toast.fire({
                    icon: 'warning',
                    title: 'No hay usuarios para mostrar'
                })
            }
            setUsers(data);
            Toast.fire({
                icon: icon,
                title: title === '' ? 'Se encontraron ' + data.length + ' usuarios' : 'Usuario actualizado'
            })
        });
    }

    const questionDeleteUser = (row) => {
        swal2.fire({
            title: '¿Eliminar Usuario?',
            text: "Estas seguro de que quieres eliminar al usuario " + row.username + ', "' + row.nombre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E60026',
            timer: "15000",
            timerProgressBar: true,
            reverseButtons: true,
            confirmButtonText: 'Si eliminar',
            footer: '<p style="color:#E60026;">No se podra recuperar el usuario una ves eliminado</p>',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(row.IdUsuario, (data) => {
                    if (data === true) {

                        swal2.fire({
                            title: 'Usuario eliminado',
                            text: "Se elimino al usuario: " + row.username + ', "' + row.nombre + '"',
                            icon: 'success',
                            timer: "3000",
                            confirmButtonColor: '#016390',
                            timerProgressBar: true
                        }).then(() => {
                            showData('success', 'Tabla actualizada');
                        });

                    }
                });
            } else {

            }
        })
    }

    const validateInput = () => {

        let message = "";

        let vnombre = false;
        let vpaterno = false;
        let vmaterno = false;
        let vusername = false;
        let vpassword = false;
        let vdireccion = false;

        let caracterIvalids = "";

        for (let i = 0; i < user.nombre.length; i++) {
            //console.log(user.nombre.charAt(i));
            if (user.nombre.charAt(i) === '"'/* || user.nombre.charAt(i)==='#' || user.nombre.charAt(i)==='@' || user.nombre.charAt(i)==='$' || user.nombre.charAt(i)==="'" || user.nombre.charAt(i)==='%' */) {
                vnombre = true;
                caracterIvalids = caracterIvalids + user.nombre.charAt(i)
            }

        }
        if (vnombre) {
            message = message + 'Caracter no permitido para nombre ' //+ caracterIvalids
        }

        for (let i = 0; i < user.paterno.length; i++) {
            if (user.paterno.charAt(i) === '"' /*|| user.paterno.charAt(i)==='#' || user.paterno.charAt(i)==='@' || user.paterno.charAt(i)==='$' || user.paterno.charAt(i)==="'" || user.paterno.charAt(i)==='%'*/) {
                vpaterno = true;
                caracterIvalids = caracterIvalids + user.paterno.charAt(i)
            }

        }
        if (vnombre && vpaterno) {
            message = message + ', Caracter no permitido para apellido paterno ' //+ caracterIvalids;            
        } else {
            if (vpaterno) {
                message = message + 'Caracter no permitido para apellido paterno '//+ caracterIvalids; 
            }
        }

        for (let i = 0; i < user.materno.length; i++) {
            if (user.materno.charAt(i) === '"' /*|| user.materno.charAt(i)==='#' || user.materno.charAt(i)==='@' || user.materno.charAt(i)==='$' || user.materno.charAt(i)==="'" || user.materno.charAt(i)==='%' */) {
                vmaterno = true;
                caracterIvalids = caracterIvalids + user.paterno.charAt(i)
            }

        }
        if (vmaterno && vpaterno) {
            message = message + ', Caracter no permitido para apellido materno ' //+ caracterIvalids;            
        } else {
            if (vmaterno) {
                message = message + 'Caracter no permitido para apellido materno ' //+ caracterIvalids; 
            }
        }

        for (let i = 0; i < user.username.length; i++) {
            if (user.username.charAt(i) === '"' /*|| user.username.charAt(i)==="'"*/) {
                vusername = true;
                caracterIvalids = caracterIvalids + user.username.charAt(i)
            }

        }
        if (vpaterno && vusername) {
            message = message + ', Caracter no permitido para nombre de usuario ' //+ caracterIvalids;            
        } else {
            if (vusername) {
                message = message + 'Caracter no permitido para nombre de usuario ' //+ caracterIvalids; 
            }
        }

        for (let i = 0; i < user.password.length; i++) {
            if (user.password.charAt(i) === '"' /*|| user.password.charAt(i)==="'" */) {
                vpassword = true;
                caracterIvalids = caracterIvalids + user.password.charAt(i)
            }

        }
        if (vusername && vpassword) {
            message = message + ', Caracter no permitido para contraseña ' //+ caracterIvalids;            
        } else {
            if (vusername) {
                message = message + 'Caracter no permitido para contraseña ' //+ caracterIvalids; 
            }
        }

        for (let i = 0; i < user.direccion.length; i++) {
            if (user.direccion.charAt(i) === '"' /*|| user.password.charAt(i)==="'" */) {
                vdireccion = true;
                caracterIvalids = caracterIvalids + user.direccion.charAt(i)
            }

        }
        if (vpassword && vdireccion) {
            message = message + ', Caracter no permitido para contraseña ' //+ caracterIvalids;            
        } else {
            if (vdireccion) {
                message = message + 'Caracter no permitido para contraseña ' //+ caracterIvalids; 
            }
        }

        if (vnombre || vpaterno || vmaterno || vusername || vpassword || vdireccion) {
            swal2.fire({
                icon: 'warning',
                title: 'Atencion',
                text: message,
                timer: "20000",
                confirmButtonColor: '#016390',
                confirmButtonText: 'Okey',
                allowEscapeKey: true,
                timerProgressBar: true,
                footer: '<p>Caractere no permitidos " (doble comilla) </p>'
            });
            return false
        } else {
            return true
        }



    }

    const saveUser = () => {
        console.log(user);
        if (!validateInput()) return;

        if (user.IdUsuario === 0) {
            createUser(user, (data) => {
                if (data === true) {
                    showData('success', 'Tabla actualizada');
                }
            });
        } else {
            updateUser(user, (data) => {
                if (data === true) {
                    showData('success', 'Tabla actualizada');
                }
            });
        }
        setOpenModal(!openModal)
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

    const tableData = {
        columns: [
            {
                name: "Nombres",
                selector: row => row.nombre,
                sortable: true
            },
            {
                name: "Apellido Paterno",
                selector: "paterno",
                sortable: true
            },
            {
                name: "Apellido Materno",
                selector: "materno",
                sortable: true
            },
            {
                name: "Fecha de Nacimiento",
                selector: row => castDate(row.fechaNacimiento).toString(),
                sortable: true
            },
            {
                name: "Nombre de Usuario",
                selector: "username",
                sortable: true

            },
            {
                name: "Direccion",
                selector: "direccion",
                sortable: true
            },
            {
                name: "Estatus",
                selector: row => row.status === 1 ? "Activo" : "Inactivo",
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
                            onClick={() => _openModal(row)}

                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                )
            }
        ],
        data: users
    };

    const __openModal = () => {
        setOpenModal(!openModal)
    }

    const _openModal = (row) => {
        //console.log(row)
        if (row != null) {
            setUser({
                IdUsuario: row.IdUsuario,
                nombre: row.nombre,
                paterno: row.paterno,
                materno: row.materno,
                fechaNacimiento: row.fechaNacimiento,
                username: row.username,
                password: "",
                direccion: row.direccion,
                status: row.status
            })
        } else {
            setUser({
                IdUsuario: 0,
                nombre: "",
                paterno: "",
                materno: "",
                fechaNacimiento: "",
                username: "",
                password: "",
                direccion: "",
            })
        }

        setOpenModal(!openModal)


    }

    const onKeyDown = (e) => {

        if (e.key === 'Enter' && e.target.name === 'nombre') {
            inputPaterno.current.focus();
        }
        if (e.key === 'Enter' && e.target.name === 'paterno') {
            inputMaterno.current.focus();
        }
        if (e.key === 'Enter' && e.target.name === 'materno') {
            inputUsername.current.focus();
        }
        if (e.key === 'Enter' && e.target.name === 'username') {
            try {
                inputPassword.current.focus();
            } catch (error) {
                inputFechaNacimiento.current.focus();
            }
        }
        if (e.key === 'Enter' && e.target.name === 'password') {
            inputFechaNacimiento.current.focus();
        }
        if (e.key === 'Enter' && e.target.name === 'fechaNacimiento') {
            inputDireccion.current.focus();
            let direccion = user.direccion;
            for (let i = 0; i < direccion.length; i++) {
                if (direccion.charAt(i) === "\n") {
                    setUser({
                        direccion: ""
                    });
                }
            }
        }

        if (e.key === 'Enter' && e.target.name === 'direccion') {
            inputBtnGuardar.current.focus();
        }
        if (e.key === 'Escape') {
            __openModal()
        }
    }

    const check = (e) =>{
        setUser({
            IdUsuario: user.IdUsuario,
            nombre: user.nombre,
            paterno: user.paterno,
            materno: user.materno,
            fechaNacimiento: user.fechaNacimiento,
            tempFechaNacimiento: user.tempFechaNacimiento,
            username: user.username,
            password: user.password,
            direccion: user.direccion,
            status: !user.status,
        })
    }

    const jsonTOPdf = () => {
        //const doc = new jsPDF();
        const doc = new jsPDF('l', 'mm', 'a3');
        doc.text("Lista de Usuarios", 20, 10);

        // doc.text("\n");
        //doc.table();
        let data = []
        for (let i = 0; i < users.length; i++) {
            console.log(users[i]);
            data.push([users[i].IdUsuario, users[i].nombre, users[i].paterno, users[i].materno, users[i].fechaNacimiento, users[i].username, users[i].direccion, users[i].status === 1 ? "Activo" : "Inactivo"]);
        }
        autoTable(doc, {
            horizontalPageBreak: false,

            head: [['Id', 'Nombre', 'Apellido Paterno', 'Apellido Materno', 'Fecha de nacimiento', 'Nombre Usuario', 'Direccion', 'Estatus']],
            body: data
        })
        doc.save("Lista Usuarios");

    }

    const messageDowload = (typeFile) => {
        setOpenModalD(!openModalD);
        swal2.fire({
            title: 'Archivo descargado',
            text: `Se descargo el archivo en ${typeFile}`,
            footer: '<p>Encontraras el archivo en tu carpeta de descargas</p>',
            icon: 'success',
            timer: "15000",
            confirmButtonColor: '#016390',
            timerProgressBar: true
        }).then(() => {

        });
    }


    return (
        <>
            <div className="main">
                <div className="divBtn">
                    <p className="" align="right">
                        <button type="submit" className="btnAgregarUsuario" onClick={() => _openModal(null)} ><Add /></button>
                        <button type="submit" className="btnActualizarTabla" onClick={() => showData('success', '')} ><Update /></button>
                        <button type="submit" className="btnDescargar" onClick={() => setOpenModalD(!openModalD)} ><CloudDownload /></button>
                    </p>
                </div>
                <div className="divTabla">
                    <DataTableExtensions {...tableData}>
                        <DataTable
                            title="Tabla Usuarios"
                            columns={tableData.columns}
                            data={users}
                            defaultSortField="IdUsuario"
                            sortIcon={<SortIcon />}
                            defaultSortAsc={true}
                            pagination
                            highlightOnHover
                            dense
                        />
                    </DataTableExtensions>
                </div>

                <Modal isOpen={openModal} style={modalStyles} onOpened={handleOpen}>

                    <ModalHeader>
                        {user.IdUsuario === 0 ? "Nuevo Usuario" : "Guardar Usuario"}
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label >Identificador del Usuario</Label>
                            <Input type="text" readOnly name="IdUsuario" value={user.IdUsuario === 0 ? 'El Id se generara cuando crea al usuario' : user.IdUsuario} />

                            <Label >Nombre</Label>
                            <Input innerRef={inputNombre} onKeyDown={onKeyDown} type="text" name="nombre" onChange={handleChange} value={user.nombre} />

                            <Label >Apellidos Paerno</Label>
                            <Input innerRef={inputPaterno} onKeyDown={onKeyDown} type="text" name="paterno" onChange={handleChange} value={user.paterno} />

                            <Label >Apellido Materno</Label>
                            <Input innerRef={inputMaterno} onKeyDown={onKeyDown} type="text" name="materno" onChange={handleChange} value={user.materno} />

                            <Label >Nombre de usuario</Label>
                            <Input innerRef={inputUsername} onKeyDown={onKeyDown} type="text" name="username" onChange={handleChange} value={user.username} />

                            {user.IdUsuario === 0 ? <Label >Contraseña</Label> : null}
                            {user.IdUsuario === 0 ? <Input innerRef={inputPassword} onKeyDown={onKeyDown} type="password" name="password" onChange={handleChange} /> : null}

                            <Label >Fecha de Nacimiento</Label>
                            <Input innerRef={inputFechaNacimiento} onKeyDown={onKeyDown} type="date" name="fechaNacimiento" onChange={handleChange} value={user.fechaNacimiento} />

                            <Label >Direccion</Label>
                            <Input innerRef={inputDireccion} onKeyDown={onKeyDown} type="text" name="direccion" onChange={handleChange} value={user.direccion} />
                            <br/>                            
                            <Label >Estatus</Label>
                            <Input style={{marginLeft: "10px"}}   type="checkbox" checked={user.status}  onClick={check} /> 
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>

                        <Button color="secundary" className="btnCancelar" onClick={() => __openModal()} >Cancelar</Button>
                        <Button innerRef={inputBtnGuardar} color="primary" className="" onClick={() => saveUser()}>{user.IdUsuario === 0 ? "Guardar" : "Actualizar"}</Button>

                    </ModalFooter>

                </Modal>
                <Modal isOpen={openModalD} style={modalStylesD} >

                    <ModalHeader>
                        ¿Como quieres descargar la informacion?
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <CSVLink
                                onClick={() => messageDowload("CSV")}
                                headers={[
                                    { label: "Id", key: "IdUsuario" },
                                    { label: "Nombre(s)", key: "nombre" },
                                    { label: "Apellido Paterno", key: "paterno" },
                                    { label: "Apellido Materno", key: "materno" },
                                    { label: "Nombre de usuario", key: "username" },
                                    { label: "Fecha de naciomiento", key: "fechaNacimiento" },
                                    { label: "Direccion", key: "direccion" },
                                    { label: "Estatus", key: "status" },
                                ]}
                                data={users}
                                onPasteCapture
                                autoSave="C:\Users\doney\OneDrive\Documentos"
                                target="_blank"
                                filename={"Lista Usuarios"}
                                style={{ "textDecoration": "none", "color": "#016390" }}
                            >
                                <button type="submit" className="btnDescargtarCSV"  >
                                    <Description style={{ color: "#fff" }} />
                                    <br />
                                    CSV
                                </button>

                            </CSVLink>
                            <button type="submit" className="btnDescargtarPDF" onClick={() => jsonTOPdf()}>
                                <Print style={{ color: "#fff" }} />
                                <br />
                                PDF
                            </button>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secundary" className="btnCancelar" onClick={() => setOpenModalD(!openModalD)} >Cancelar</Button>
                    </ModalFooter>

                </Modal>
            </div>
        </>
    );
}

export default UserTable;