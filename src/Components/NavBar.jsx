import "../CSS/NavBar.css"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const NavBar = (props) => {

    const logOut = () => {
        cookies.remove('IdUsuario', { path: "/" });
        //cookies.remove('token', {path: "/"});
        window.location.href = "/";
    }

    const newClient = () => {
        cookies.remove('IdCliente', { path: "/" });
        //cookies.remove('token', {path: "/"});
        window.location.href = "/clients-view";
    }




    return (
        <>
            <nav className="navbar">
                {/* <a href="/home" className="brand">{props.username}</a> */}
                <a href="/home"><img className="logo" alt="" src={"https://1000marcas.net/wp-content/uploads/2020/01/Domino’s-logo.jpg"} /></a>
                <input type="checkbox" id="menu-toggle" />
                <label className="toggle" htmlFor="menu-toggle">☰</label>
                <ul className="menu-items">
                    <li><a href="/users">Usuarios</a></li>
                    {/* <li>
                        <a>Clientes</a>
                        <ul>
                            
                            <li><a href="/clients">Listar clientes</a></li>                            
                            <li><a ><button onClick={()=>newClient()}  className="btnA">Agregar Cliente</button></a></li>
                        </ul>
                    </li> */}
                    <li><a><button className="btnCerrarsesion" onClick={() => logOut()} >Cerrar sesion</button></a></li>

                </ul>
            </nav>

        </>
    );

}

export default NavBar;
