import React, { Component } from 'react'
import {Link} from 'react-router-dom' ;

export default class Navbar extends Component { 

    render() {
        return (
            <div  style={{
                display : 'flex' , 
                alignItems : 'center' ,
                justifyContent : 'space-between' ,
                background: 'rgb(2,0,36)',
background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)' ,
            color : 'white' ,
            padding : '0.5'
            }} > 
            <Link to="/"  style={{textDecoration:"none"}} ><h1 style  ={{marginLeft:'0.5rem'}}>AmazFlix</h1>  </Link>
             <Link to="/wachlist"  style={{textDecoration:"none"}} >  <h2 style  ={{marginRight:'0.5rem'}} >Your Watchlist</h2> </Link>
           
            </div>
        )
    }
}
