
import { Link,useLocation } from 'react-router-dom';
import HeaderButton from '../HeaderButton/HeaderButton';
import Navbar from '../Navbar/Navbar';
import './Header.css';
import logo from '../../assets/logo.png';
import Login from '../Login/Login';


const Header = () => {
    const location = useLocation();
    const isBlogPage = location.pathname.includes('/blog');

    return (
        <header className="header">


            {/* Estado de sesión en esquina superior derecha */}
  {/*     <Login/>  */}
            
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="JAI Logo" className="logo" />
                </Link>
            </div>

            {/* Menu de opciones */}                          
            <Navbar/>

            {!isBlogPage && (
                    <HeaderButton/>
            )}

        </header>
    );
};

export default Header;