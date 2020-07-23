//import node modules
import React, { Component } from 'react';
//import router link
import {  Link } from "react-router-dom";
/**
 * This class Header component
 */
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <nav className="navbar navbar-expand-md bg-dark navbar-dark ">
                <a className="navbar-brand" href="">Dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                         <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/table" className="nav-link">Table</Link>
                    </li>
                      
                    </ul>
                </div>  
            </nav>
         );
    }
}
 
export default Header;