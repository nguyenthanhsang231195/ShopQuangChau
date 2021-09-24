import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import MenuItems from './MenuItems.js';
import './Navbar.css';

class Navbar extends Component{

    state = { clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
<div className="contanier-navbar">
    <label className="logo">
        <Link to="/"> 
            <img src="/Images/Logo.jpg" alt="name" />
        </Link> 
    </label>

    <nav className="NavbarItems">
        <ul className={this.state.clicked ? 
            "nav-menu active" : "nav-menu"}>
            {MenuItems.map((item, index) => 
                    {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    }
                )
            }
        </ul>
    </nav>

    <nav className="NavbarItems-mini">
        <div className="show-panel" onClick={this.handleClick}>
            <i className={this.state.clicked ?
               "fas fa-times" : "fas fa-align-justify"}>
            </i>
        </div>
    </nav>
</div>
        )
    }
}

export default Navbar;