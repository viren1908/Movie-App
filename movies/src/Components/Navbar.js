

import React, { Component } from 'react'

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
             <h1 style  ={{marginLeft:'0.5rem'}}>AmazeFlix</h1>  
             <h2 style  ={{marginRight:'0.5rem'}} >Your Watchlist</h2> 
            </div>
        )
    }
}
