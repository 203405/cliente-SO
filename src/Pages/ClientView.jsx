import { Component } from "react";
import NavBar from "../Components/NavBar";
import { getUserById, validateAccess } from '../Models/User.js';
import { getClientById, client_update, client_new, getAllGeneros, getAllEstadosCiviles, getAllEstudios, getAllTiposVivienda } from '../Models/Client.js';
import { getAllStates } from '../Models/State.js';
import { getMunicipalityByIdState } from '../Models/municipality.js';
import "../CSS/ClienView.css";
import swal2 from 'sweetalert2';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

let contClickEstadoEntidadNacimientoCliente = 0;
let contClickTipoPersonaCliente = 0;
let contClickGeneroCliente = 0;
let contClickEstadosCiviles = 0;
let contClickEstudios = 0;
let contClickEstadoDomicilioCliente = 0;
let contClickMunicipioCliente = 0;
let contClickTipoViviendaCliente = 0;
let contClickEstadoNegocioCLiente = 0;
let contClickMunicipioNegocioCLiente = 0;

class Clients extends Component {

    state = {
        user: {
            IdUsuario: 0,
            direccion: "",
            fechaNacimiento: "",
            materno: "",
            nombre: "",
            password: "",
            paterno: "",
            username: "",
        },
        tipoVivienda:[],
        estudios: [],
        estadosCiviles: [],
        generos: [],
        estadosDomicilio: [],
        estadosNegocio:[],
        municipiosDomicilio: [],
        municipiosNegocio:[],
        client: {
            IdCliente: 0,
            sucursalCliente: " ",
            IdTipoPersonaCliente: 1,
            tipoPersonaCliente: " ",
            nombreCliente: " ",
            paternoCliente: " ",
            maternoCliente: " ",
            fechaNacimientoCliente: " ",
            IdEstadoEntidadNacimientoCliente: 0,
            estadoEntidadNacimientoCliente: " ",
            lugarNacimientoCliente: " ",
            tipoGeneroCliente: " ",
            IdTipoGeneroCliente: 0,
            IdEstadoCivilCliente: 0,
            estadoCivilCliente: " ",
            IdEstudioCliente: 0,
            estucioCliente: " ",
            IFENumeroCliente: " ",
            IFEFolioCliente: " ",
            IFEclaveCliente: " ",
            CURPCliente: " ",
            RFCCliente: " ",
            telefonoCliente: " ",
            celularCliente: " ",
            emailCliente: " ",
            IdNacionalidadCliente: 0,
            paisOrigenCliente: " ",
            nombrePaisOrigenCliente: " ",
            IdPaisDomicilioCliente: 0,
            paisDomicilioCliente: " ",
            IdEstadoDomicilioCliente: 0,
            estadoDomicilioCliente: " ",
            IdMunicipioDomicilioCliente: 0,
            municipoDomicilioCliente: " ",
            localidadNegocioCliente: " ",
            domicilioCliente: " ",
            CodigoPostalDomicilioCliente: " ",
            IdTipoViviendaCliente: 1,
            tipoViviendaCliente: " ",
            ubicacionGPSCliente: " ",
            nombreConyugueCliente: " ",
            paternoConyugueCliente: " ",
            maternoConyugueCliente: " ",
            lugarTrabajoConyugueCliente: " ",
            puestoConyugueCliente: " ",
            antiguedadConyugueCliente: " ",
            anosConyugueCliente: 0,
            mesesConyugueCliente: 0,
            descripcionNegocioCliente: " ",
            expreienciaNegocioCliente: " ",
            antigudadNegocioCliente: " ",
            pagoDiarioCliente: 0.0,
            abreLunes: 0,
            abreMartes: 0,
            abreMiercoles: 0,
            abreJueves: 0,
            abreViernes: 0,
            abreSabado: 0,
            abreDomingo: 0,
            telefonoNegocioCliente: " ",
            horaAperturaCliente: " ",
            horaCierreCliente: " ",
            lugarNegocioCliente: " ",
            nombrePropietarioCliente: " ",
            IdPaisNegocioCliente: 0,
            paisNegocioCliente: " ",
            IdEstadoNegocioCliente: 0,
            estadoNegocioCliente: " ",
            IdMunicipioNegocioCliente: 0,
            municipioNegocioCliente: " ",
            localidadDomicilioCliente: " ",
            codigoPostalNegocioCliente: " ",
            domicilioNegocioCliente: 0,
            numeroTelefonoNegocioCliente: " "
        }
    };

    clientSave = () => {
  
        if(this.state.client.municipoDomicilioCliente === "" || this.state.client.municipioNegocioCliente === ""){
            let message="";
            let ttp=0;
            
            if(this.state.client.municipoDomicilioCliente === ""){
                message = message + "No has seleccionado un municipio en el domicilio del cliente";
                ttp++;
            }
            if(this.state.client.municipioNegocioCliente === "" && ttp >0){
                message = message + ", No has seleccionado un municipio en el domicilio del negocio";
   
            }
            if( this.state.client.municipioNegocioCliente === "" && ttp ===0){
                message = "No has seleccionado un municipio en el domicilio del negocio";
            }
            swal2.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                timer: "15000",
                confirmButtonColor: '#016390',
                timerProgressBar: true
            });
        }else{
            let koop = false;
            for(var i in this.state.client){
                if(this.state.client[i] === 0 || this.state.client[i] === ""){
                    koop = true;
                    console.log("Vacio ",this.state.client[i]);     
                }
                
                // console.log(this.state.client[i]);
                //return;
            }   
            if(koop){

            }   
            if (this.state.client.IdCliente === 0) {

                client_new(this.state.client, (data) => {
                    
                    if (data[0] === true) {
                        getClientById(data[1].IdCliente, (data) => {
                            
                            this.setState({
                                client: data,
                            })
                        });
                        swal2.fire({
                            title: 'Cliente agregado',
                            text: "Se creo el cliente exitosamente",
                            icon: 'success',
                            timer: "3000",
                            confirmButtonColor: '#016390',
                            timerProgressBar: true
                        }).then(() => {
                            // showData('success', 'Tabla actualizada');
                        });
                    }
                });
            } else {
    
                client_update(this.state.client, (data) => {
                  
                    if (data === true) {
                        swal2.fire({
                            title: 'Cliente actualizado',
                            text: "Se actualizaron los datos del cliente exitosamente",
                            icon: 'success',
                            timer: "3000",
                            confirmButtonColor: '#016390',
                            timerProgressBar: true
                        }).then(() => {
                        
                        });
                    }
                });
            }
        }



    }

    componentDidMount() {
        document.body.style.backgroundColor = "#016390";
        window.document.title = 'Ver cliente';
        let IdUsuario = cookies.get('IdUsuario');
        let IdCliente = cookies.get('IdCliente');
        // cookies.remove('IdCliente', { path: "/" });
        //alert(IdCliente);
        //let token = cookies.get('token');
        validateAccess(IdUsuario, (data) => {
            if (!data === true) {
                getUserById(IdUsuario, (data) => {
                    this.setState({
                        user: data
                    });

                    getAllGeneros((data) => {
                        this.setState({
                            generos: data,
                        })
                    });
                    getAllStates((data) => {
                      
                        this.setState({
                            estadosDomicilio: data,
                            estadosNegocio: data
                        })

                    });
                    getAllEstadosCiviles((data) => {
                        this.setState({
                            estadosCiviles: data,
                        })
                    });
                    getAllEstudios((data) => {
                        
                        this.setState({
                            estudios: data,
                        })
                    });                    
                    getAllTiposVivienda((data) => {
                      
                        this.setState({
                            tipoVivienda: data,
                        })
                    });
                    if (!(IdCliente == null)) {
                        getClientById(IdCliente, (data) => {
                         
                            this.setState({
                                client: data,
                            })
                            getMunicipalityByIdState(this.state.client.IdEstadoDomicilioCliente,(data)=> {
                                ;
                                this.setState({
                                    municipiosDomicilio : data
                                });
                            });
                        });
                    }

                    
                });
            } else {
                //window.location.href = "/";
            }
        });
    }
    handleChange = async (e) => {

        await this.setState({
            client: {
                ...this.state.client,
                [e.target.name]: e.target.value
            }
        });

        if (e.target.name === "estadoNegocioCliente") {

            this.setState({
                client: {
                    ...this.state.client,
                    municipioNegocioCliente: "",
                  
                }                
            });

        }

        if (e.target.name === "estadoDomicilioCliente") {

            this.setState({
                client: {
                    ...this.state.client,
                    municipoDomicilioCliente: "",
                    
                }                
            });

        }
        
        if(e.target.name === "municipioNegocioCliente"){
            contClickMunicipioNegocioCLiente++; 
        }
        
        if (e.target.name === "tipoViviendaCliente") {
            contClickTipoViviendaCliente++;
        }

        if (e.target.name === "municipoDomicilioCliente") {
            contClickMunicipioCliente++;
        }
        if (e.target.name === "estadoEntidadNacimientoCliente") {
            contClickEstadoEntidadNacimientoCliente++;
        }

        if (e.target.name === "tipoPersonaCliente") {
            contClickTipoPersonaCliente++;
        }
        if (e.target.name === "IdTipoGeneroCliente") {
            contClickGeneroCliente++;
        }

        if (e.target.name === "estadoCivilCliente") {
            contClickEstadosCiviles++;
        }

        if (e.target.name === "estucioCliente") {
            contClickEstudios++;
        }

        if(e.target.name === "estadoDomicilioCliente"){
            contClickEstadoDomicilioCliente++;
        }
        
        if(e.target.name === "estadoNegocioCliente"){
            contClickEstadoNegocioCLiente++;
        }
        
        



    }


    getIdSelect = (e ) => {
        let Id = e.target.options[e.target.selectedIndex].value;
        Id = Id.split(",");
        Id = Id[0];
        return Id;
    }

    clickStop = 0;

    onClickSelect = async (e) => {
        this.clickStop++
        

        if(e.target.name === "municipioNegocioCliente"){
            

            
           
            this.setState({
                client: {
                    ...this.state.client,
                    IdMunicipioNegocioCliente: this.getIdSelect(e),
                    
                }
            });  

        }
        if(e.target.name === "estadoNegocioCliente"){

           
            this.setState({
                client: {
                    ...this.state.client,
                    estadoNegocioCliente: this.getIdSelect(e),
                   
                }
            });  
            getMunicipalityByIdState(this.getIdSelect(e),(data)=> {
                
                this.setState({
                    municipiosNegocio : data
                });
            });
        }

        if (e.target.name === "estadoNegocioCliente") {
  

           
            this.setState({
                client: {
                    ...this.state.client,
                    IdEstadoNegocioCliente:  this.getIdSelect(e),                    
                }
            });
        }
        
        if (e.target.name === "tipoViviendaCliente") {

            
            this.setState({
                client: {
                    ...this.state.client,
                    IdTipoViviendaCliente:  this.getIdSelect(e),
                    
                }
            });
        }

        if (e.target.name === "municipoDomicilioCliente") {

           
            this.setState({
                client: {
                    ...this.state.client,
                    IdMunicipioDomicilioCliente:  this.getIdSelect(e),
                   
                }
            });
        }

        if (e.target.name === "tipoPersonaCliente") {


 
        
            this.setState({
                client: {
                    ...this.state.client,
                    IdTipoPersonaCliente:  this.getIdSelect(e),
                 
                }
            });

        }

        
        if (e.target.name === "estucioCliente") {
            

          
            this.setState({
                client: {
                    ...this.state.client,
                    IdEstudioCliente:  this.getIdSelect(e),
                    
                }
            });

        }

        if (e.target.name === "estadoEntidadNacimientoCliente") {

           
            this.setState({
                client: {
                    ...this.state.client,
                    IdEstadoEntidadNacimientoCliente:  this.getIdSelect(e),
                   
                }
            });
        }

        if (e.target.name === "IdTipoGeneroCliente") {

            
            this.setState({
                client: {
                    ...this.state.client,
                    IdTipoGeneroCliente:  this.getIdSelect(e),
                 
                }
            });
        }

        if (e.target.name === "estadoCivilCliente") {
            
            this.setState({
                client: {
                    ...this.state.client,
                    IdEstadoCivilCliente:  this.getIdSelect(e),
                    
                }
            });
           
        }

        
        if (e.target.name === "estadoDomicilioCliente") {
          
            this.setState({
                client: {
                    ...this.state.client,
                    IdEstadoDomicilioCliente:  this.getIdSelect(e),
                   
                }                
            });
            getMunicipalityByIdState( this.getIdSelect(e),(data)=> {
                this.setState({
                    municipiosDomicilio : data
                });
            });

        }

    }

    render() {

        return (
            <>


                <NavBar username={this.state.user.nombre + " " + this.state.user.paterno + " " + this.state.user.materno} />
               

                <div className="worko-tabs">
                    <input className="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" defaultChecked />
                    <input className="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />
                    <input className="state" type="radio" title="tab-three" name="tabs-state" id="tab-three" />
                    <input className="state" type="radio" title="tab-four" name="tabs-state" id="tab-four" />
                    <div className="tabs flex-tabs">
                        <label htmlFor="tab-one" id="tab-one-label" className="tab">Datos Generales</label>
                        <label htmlFor="tab-two" id="tab-two-label" className="tab">Datos de Domicilio</label>
                        <label htmlFor="tab-three" id="tab-three-label" className="tab">Datos del Conyugue</label>
                        <label htmlFor="tab-four" id="tab-four-label" className="tab">Datos del Negocio</label>
                        <div id="tab-one-panel" className="panel active" >
                            <div className="container">
                                <header>Datos del cliente</header>
                                <div className="_form">
                                    <div className="form first">
                                        <div className="details personal">
                                            <div className="fields">

                                                <div className="input-field">
                                                    <label>Id del Cliente</label>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.IdCliente === 0 ? "El Id se generara cando crees al usuario" : this.state.client.IdCliente}
                                                        name="IdCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Sucursal</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Sucursal"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.sucursalCliente}
                                                        name="sucursalCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Tipo de Persona</label>
                                                    <select name="tipoPersonaCliente"
                                                        
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.tipoPersonaCliente}
                                                    >
                                                        {contClickTipoPersonaCliente === 0 ? <option value={this.state.client.IdTipoPersonaCliente + "," + this.state.client.tipoPersonaCliente} >{(this.state.client.IdTipoPersonaCliente + "," + this.state.client.tipoPersonaCliente).split(",")[1]}</option> : null}
                                                        <option value={(1 + ", Fisica")}>{"1 ,Fisica".split(",")[1]}</option>
                                                        <option value={(2 + ", Moral")}>{"2, Moral".split(",")[1]}</option>
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Nombre</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nombre(s)"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.nombreCliente}
                                                        name="nombreCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Apellito Paterno</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Apellido Paterno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.paternoCliente}
                                                        name="paternoCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Apellito Materno</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Apellido Materno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.maternoCliente}
                                                        name="maternoCliente"
                                                    />
                                                </div>

                                                <div className="input-field">
                                                    <label>Fecha de Nacimiento </label>
                                                    <input
                                                        type="date"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.fechaNacimientoCliente.substring(0, 10)}
                                                        name="fechaNacimientoCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Entidad de Nacimiento</label>
                                                    <select
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.estadoEntidadNacimientoCliente}
                                                        name="estadoEntidadNacimientoCliente"
                                                    >
                                                        {contClickEstadoEntidadNacimientoCliente === 0 ? <option value={this.state.client.IdEstadoEntidadNacimientoCliente + "," + this.state.client.estadoEntidadNacimientoCliente} >{(this.state.client.IdEstadoEntidadNacimientoCliente + "," + this.state.client.estadoEntidadNacimientoCliente).split(",")[1]}</option> : null}
                                                        {this.state.estadosDomicilio.map((val) => {
                                                            return (
                                                               
                                                                <option value={(val.IdEstado + "," + val.nombreEstado)}>{(val.IdEstado + "," + val.nombreEstado).split(",")[1]}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Lugar de Nacimiento</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Lugar de Nacimiento"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.lugarNacimientoCliente}
                                                        name="lugarNacimientoCliente"


                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Genero</label>
                                                    <select name="IdTipoGeneroCliente"
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.nombreGenero}
                                                    >
                                                        {contClickGeneroCliente === 0 ? <option value={this.state.client.IdTipoGeneroCliente + "," + this.state.client.tipoGeneroCliente} >{(this.state.client.IdTipoGeneroCliente + "," + this.state.client.tipoGeneroCliente).split(",")[1]}</option> : null}
                                                        {this.state.generos.map((val) => {
                                                            return (
                                                                
                                                                <option value={(val.IdTipoGenero + "," + val.nombreGenero)}>{(val.IdTipoGenero + "," + val.nombreGenero).split(",")[1]}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Esado Civil</label>
                                                    <select name="estadoCivilCliente"
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.estadoCivilCliente}
                                                    >
                                                        {contClickEstadosCiviles === 0 ? <option value={this.state.client.IdEstadoCivil + "," + this.state.client.estadoCivilCliente} >{(this.state.client.IdEstadoCivil + "," + this.state.client.estadoCivilCliente).split(",")[1]}</option> : null}
                                                        {this.state.estadosCiviles.map((val) => {
                                                            return (
                                                              
                                                                <option value={(val.IdEstadoCivil + "," + val.nombreEstadoCivil)}>{(val.IdEstadoCivil + "," + val.nombreEstadoCivil).split(",")[1]}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Estudios</label>
                                                    <select name="estucioCliente"
                                                        onChange={(e) => this.handleChange(e)}                                                        
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.estucioCliente}
                                                        >
                                                            
                                                        {contClickEstudios === 0 ? <option value={this.state.client.IdEstudioCliente + "," + this.state.client.estucioCliente} >{(this.state.client.IdEstudioCliente + "," + this.state.client.estucioCliente).split(",")[1]}</option> : null}
                                                        {this.state.estudios.map((val) => {
                                                            return (
                                                               
                                                                <option value={(val.IdEstudio + "," + val.descripcion)}>{(val.IdEstudio + "," + val.descripcion).split(",")[1]}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>IFE Numero</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="IFE Numero"
                                                        value={this.state.client.IFENumeroCliente}
                                                        name="IFENumeroCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>IFE Folio</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="IFE Folio"
                                                        value={this.state.client.IFEFolioCliente}
                                                        name="IFEFolioCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>IFE Clave</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="IFE Clave"
                                                        value={this.state.client.IFEclaveCliente}
                                                        name="IFEclaveCliente"

                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>CURP</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="IFE Clave"
                                                        value={this.state.client.CURPCliente}
                                                        name="CURPCliente"

                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>RFC</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="IFE Clave"
                                                        value={this.state.client.RFCCliente}
                                                        name="RFCCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Telefono</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="RFC"
                                                        value={this.state.client.telefonoCliente}
                                                        name="telefonoCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Celular</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.celularCliente}
                                                        name="celularCliente"

                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Email</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="RFC"
                                                        value={this.state.client.emailCliente}
                                                        name="emailCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Nacionalidad</label>
                                                    <select name=""
                                                    onChange={(e) => this.handleChange(e)}
                                                    >
                                                        
                                                        <option> Mexicana </option>
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Pais de Origen</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.paisOrigenCliente}
                                                        name="paisOrigenCliente"
                                                    />
                                                </div>
                                                <button onClick={() => this.clientSave()} className="nextBtn">
                                                    <span className="btnText">{this.state.client.IdCliente === 0 ? "Crear" : "Guardar"}</span>
                                                    <i className="uil uil-navigator" />
                                                </button>
    
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab-two-panel" className="panel">
                            <div className="container">
                                <header>Datos del cliente</header>
                                <div className="_form">
                                    <div className="form first">
                                        <div className="details personal">

                                            <div className="fields">
                                                <div className="input-field">
                                                    <label>Pias</label>
                                                    <select name="paisDomicilioCliente"
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}                                                        
                                                    >
                                                       
                                                        <option value={(1 + ", Mexico")}>{"1 ,Mexico".split(",")[1]}</option>                                                                                                                
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Estado</label>
                                                    <select name="estadoDomicilioCliente"
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.estadoDomicilioCliente}
                                                        >
                                                        {contClickEstadoDomicilioCliente === 0 ? <option value={this.state.client.IdEstadoDomicilioCliente + "," + this.state.client.estadoDomicilioCliente} >{(this.state.client.IdEstadoDomicilioCliente + "," + this.state.client.estadoDomicilioCliente).split(",")[1]}</option> : null}
                                                        {this.state.estadosDomicilio.map((val) => {
                                                            ;
                                                            return (
                                                                //<option value={(1+", Fisica")}>{"1 ,Fisica".split(",")[1]}</option>
                                                                <option value={(val.IdEstado + "," + val.nombreEstado)}>{(val.IdEstado + "," + val.nombreEstado).split(",")[1]}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Municipio</label>
                                                    <select name="municipoDomicilioCliente"
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.municipoDomicilioCliente}
                                                                                 
                                                        >
                                                        {contClickMunicipioCliente === 0 ? <option value={this.state.client.IdEstadoDomicilioCliente + "," + this.state.client.municipoDomicilioCliente} >{(this.state.client.IdEstadoDomicilioCliente + "," + this.state.client.municipoDomicilioCliente).split(",")[1]}</option> : null}
                                                        {this.state.municipiosDomicilio.map((val) => {                   
                                                            return (
                                                                //<option value={(1+", Fisica")}>{"1 ,Fisica".split(",")[1]}</option>
                                                                <option value={(val.IdMunicipio + "," + val.nombreMunicipio)}>{(val.IdMunicipio + "," + val.nombreMunicipio).split(",")[1]}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Localidad</label>
                                                    <select name="localidad"
                                                        placeholder="Localidad"
                                                        onChange={(e) => this.handleChange(e)}
                                                        value={this.state.client.localidadNegocioCliente}>
                                                        <option>{this.state.client.localidadNegocioCliente}</option>
                                                        <option> localidad 1 </option>
                                                        <option> localidad 2 </option>
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Domicilio</label>
                                                    <input
                                                        type="textarea"
                                                        placeholder="Domicilio"
                                                        name="domicilioCliente"
                                                        value={this.state.client.domicilioCliente}
                                                        onChange={(e) => this.handleChange(e)}
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Codigo Postal</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Codigo Postal"
                                                        name="CodigoPostalDomicilioCliente"
                                                        value={this.state.client.CodigoPostalDomicilioCliente}
                                                        onChange={(e) => this.handleChange(e)}
                                                    />
                                                </div>

                                                <div className="input-field">
                                                    <label>Tipo de Vivienda</label> 
                                                    <select name="tipoViviendaCliente"
                                                        
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.tipoViviendaCliente}>
                                                        {contClickTipoViviendaCliente === 0 ? <option value={this.state.client.IdTipoViviendaCliente + "," + this.state.client.tipoViviendaCliente} >{(this.state.client.IdTipoViviendaCliente + "," + this.state.client.tipoViviendaCliente).split(",")[1]}</option> : null}
                                                        {this.state.tipoVivienda.map((val) => {                   
                                                            return (
                                                                //<option value={(1+", Fisica")}>{"1 ,Fisica".split(",")[1]}</option>
                                                                <option value={(val.IdTipoVivienda + "," + val.nombreTipoVivienda)}>{(val.IdTipoVivienda + "," + val.nombreTipoVivienda).split(",")[1]}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="input-field">
                                                    <label>Ubicacion GPS</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Ubicacion GPS"
                                                        value={this.state.client.ubicacionGPSCliente}
                                                        name="ubicacionGPSCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label></label>
                                                    <input
                                                        type="hidden"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Ubicacion GPS"
                                                        value={this.state.client.ubicacionGPS}
                                                        name="ubicacionGPS"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label></label>
                                                    <input
                                                        type="hidden"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Ubicacion GPS"
                                                        value={this.state.client.ubicacionGPS}
                                                        name="ubicacionGPS"
                                                    />
                                                </div>                                                                                                                                    

                                                <button onClick={() => this.clientSave()} className="nextBtn">
                                                    <span className="btnText">Guardar</span>
                                                    <i className="uil uil-navigator" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab-three-panel" className="panel">
                            <div className="container">
                                <header>Datos del cliente</header>
                                <div className="_form">
                                    <div className="form first">
                                        <div className="details personal">

                                            <div className="fields">
                                                <div className="input-field">
                                                    <label>Nombre</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Nombre del conyugue"
                                                        value={this.state.client.nombreConyugueCliente}
                                                        name="nombreConyugueCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Apellido Paterno</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Apellido Paternop"
                                                        value={this.state.client.paternoConyugueCliente}
                                                        name="paternoConyugueCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Apellido Materno</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Apellido Materno"
                                                        value={this.state.client.maternoConyugueCliente}
                                                        name="maternoConyugueCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Lugar de trabajo</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Ubicacion GPS"
                                                        value={this.state.client.lugarTrabajoConyugueCliente}
                                                        name="lugarTrabajoConyugueCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Puesto</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Puesto"
                                                        value={this.state.client.puestoConyugueCliente}
                                                        name="puestoConyugueCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Antiguedad</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Ubicacion GPS"
                                                        value={this.state.client.antiguedadConyugueCliente}
                                                        name="antiguedadConyugueCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Años</label>
                                                    <input
                                                        type="number"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="Años"
                                                        value={this.state.client.anosConyugueCliente}
                                                        name="anosConyugueCliente"
                                                    />
                                                </div>
                                                <div className="input-field">
                                                    <label>Meses</label>
                                                    <input
                                                        type="number"
                                                        onChange={(e) => this.handleChange(e)}
                                                        placeholder="MEses"
                                                        value={this.state.client.mesesConyugueCliente}
                                                        name="mesesConyugueCliente"
                                                    />
                                                </div>
                                                <div className="input-field"  >
                                                    <label></label>
                                                    <input
                                                        type="hidden"
                                                        placeholder=""
                                                        name=""
                                                    />
                                                </div>
                                                <div className="input-field"  >
                                                    <label></label>
                                                    <input
                                                        type="hidden"
                                                        placeholder=""
                                                        name=""
                                                    />
                                                </div>
                                                <div className="input-field"  >
                                                    <label></label>
                                                    <input
                                                        type="hidden"
                                                        placeholder=""
                                                        name=""
                                                    />
                                                </div>
                                                <button onClick={() => this.clientSave()} className="nextBtn">
                                                    <span className="btnText">{this.state.client.IdCliente === 0 ? "Crear" : "Guardar"}</span>
                                                    <i className="uil uil-navigator" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab-four-panel" className="panel">
                            <div className="container">
                                <header>Datos del cliente</header>
                                <div className="_form">
                                    <div className="details personal">

                                        <div className="fields">
                                            <div className="input-field">
                                                <label>Descripcion del negocio</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Descripcion del negocio"
                                                    value={this.state.client.descripcionNegocioCliente}
                                                    name="descripcionNegocioCliente"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label>Experiencia del Negocio/Actividad</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Experiencia del Negocio/Actividad"
                                                    value={this.state.client.expreienciaNegocioCliente}
                                                    name="expreienciaNegocioCliente"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label>Antigüedad del negocio</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Antigüedad del negocio"
                                                    value={this.state.client.antigudadNegocioCliente}
                                                    name="antigudadNegocioCliente"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label>Cuanto puede pagar diario</label>
                                                <input
                                                    type="number"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Cuanto puede pagar diario"
                                                    value={this.state.client.pagoDiarioCliente}
                                                    name="pagoDiarioCliente"
                                                />
                                            </div>

                                            <div className="input-field">
                                                <label>Num. telefono</label>
                                                <input
                                                    type="tel"
                                                    onChange={(e) => this.handleChange(e)}

                                                    value={this.state.client.numeroTelefonoNegocioCliente}
                                                    name="numeroTelefonoNegocioCliente"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label>Anbre a las</label>
                                                <input
                                                    type="time"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Años"
                                                    value={this.state.client.horaAperturaCliente}
                                                    name="horaAperturaCliente"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label>Cierra a las</label>
                                                <input
                                                    type="time"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Años"
                                                    value={this.state.client.horaCierreCliente}
                                                    name="horaCierreCliente"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label>El lugar del negocio</label>
                                                <input 
                                                    type="text" 
                                                    onChange={(e) => this.handleChange(e)}
                                                    value={this.state.client.lugarNegocioCliente}
                                                    name="lugarNegocioCliente"
                                                    />
                                                {/* <select name="lugarNegocio"
                                                    onChange={(e) => this.handleChange(e)}
                                                    value={this.state.client.lugarNegocio}>
                                                    <option> {this.state.client.lugarNegocioCliente} </option>
                                                    <option> Lugar de negocio 1 </option>
                                                    <option> Lugar de negocio 2 </option>
                                                </select> */}
                                            </div>
                                            <div className="input-field">
                                                <label>Nombre del propietario</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Años"
                                                    value={this.state.client.nombrePropietarioCliente}
                                                    name="nombrePropietarioCliente"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label>Pais</label>
                                                <select
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.paisNegocioCliente}
                                                        name="paisNegocioCliente"
                                                    >
                                                        <option value={this.state.client.IdPaisNegocioCliente + "," + this.state.client.paisNegocioCliente} >{(this.state.client.IdPaisNegocioCliente + "," + this.state.client.paisNegocioCliente).split(",")[1]}</option>
                                                        {/* {this.state.states.map((val) => {
                                                            return (
                                                                //<option value={(1+", Fisica")}>{"1 ,Fisica".split(",")[1]}</option>
                                                                <option value={(val.IdEstado + "," + val.nombreEstado)}>{(val.IdEstado + "," + val.nombreEstado).split(",")[1]}</option>
                                                            );
                                                        })} */}
                                                    </select>
                                            </div>
                                            <div className="input-field">
                                                <label>Estado</label>
                                                <select name="estadoNegocioCliente"
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.estadoNegocioCliente}
                                                        >
                                                        {contClickEstadoNegocioCLiente === 0 ? <option value={this.state.client.IdEstadoNegocioCliente + "," + this.state.client.estadoNegocioCliente} >{(this.state.client.IdEstadoNegocioCliente + "," + this.state.client.estadoNegocioCliente).split(",")[1]}</option> : null}
                                                        {this.state.estadosNegocio.map((val) => {
                                                            return (
                                                                
                                                                <option value={(val.IdEstado + "," + val.nombreEstado)}>{(val.IdEstado + "," + val.nombreEstado).split(",")[1]}</option>
                                                            );
                                                        })}
                                                    </select>
                                            </div>
                                            <div className="input-field">
                                                <label>Municipio *</label>
                                                <select name="municipioNegocioCliente"
                                                        onChange={(e) => this.handleChange(e)}
                                                        onClick={(e) => this.onClickSelect(e)}
                                                        value={this.state.client.municipioNegocioCliente}
                                                                                 
                                                        >
                                                        {contClickMunicipioNegocioCLiente === 0 ? <option value={this.state.client.IdMunicipioNegocioCliente + "," + this.state.client.municipioNegocioCliente} >{(this.state.client.IdMunicipioNegocioCliente + "," + this.state.client.municipioNegocioCliente).split(",")[1]}</option> : null}
                                                        {this.state.municipiosNegocio.map((val) => {                   
                                                            return (
                                                                
                                                                <option value={(val.IdMunicipio + "," + val.nombreMunicipio)}>{(val.IdMunicipio + "," + val.nombreMunicipio).split(",")[1]}</option>
                                                            );
                                                        })}
                                                </select>
                                            </div>
                                            <div className="input-field">
                                                <label>Localidad</label>
                                                <input 
                                                    type="text" 
                                                    onChange={(e) => this.handleChange(e)}
                                                    value={this.state.client.localidadNegocioCliente}
                                                    name="localidadNegocioCliente"
                                                    />

                                                {/* <label>Localidad</label>
                                                <select name="lugarNegocioCliente"
                                                    onChange={(e) => this.handleChange(e)}
                                                    value={this.state.client.lugarNegocioCliente}>
                                                    <option> {this.state.client.lugarNegocioCliente} </option>
                                                    <option> Fisica </option>
                                                    <option> Moral </option>
                                                </select> */}
                                            </div>
                                            <div className="input-field">
                                                <label>Codigo Postal</label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Codigo Postal"
                                                    value={this.state.client.postalNegocio}
                                                    name="postalNegocio"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label>Domicilio </label>
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Años"
                                                    value={this.state.client.domicilioNegocio}
                                                    name="domicilioNegocio"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label></label>
                                                <input
                                                    type="hidden"
                                                    onChange={(e) => this.handleChange(e)}
                                                    placeholder="Num. de Telefono"
                                                    value={this.state.client.numeroTelefonoNegocioCliente}
                                                    name="numeroTelefonoNegocioCliente"
                                                />
                                            </div>
   
                                            <button onClick={() => this.clientSave()} className="nextBtn">
                                                <span className="btnText">{this.state.client.IdCliente === 0 ? "Crear" : "Guardar"}</span>
                                                <i className="uil uil-navigator" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}


export default Clients;