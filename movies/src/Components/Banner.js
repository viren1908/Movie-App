import {movies} from './getMovies' ;
import React, { Component } from 'react'


export default class Banner extends Component {
    render() { 
     let movie = movies.results[4] ;
 
        return ( 
          <>{
            movie == ' ' ?
            <div className ="d-flex justify-content-center">
            <div className ="spinner-border" role="status">
              <span className ="visually-hidden">Loading...</span>
            </div>
          </div> :
              <div>
               <div className ="card banner-card" >
  <img src= {`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className ="card-img-top banner-image" alt="movie.title" />
  {/* <div className ="card-body  "> */}
    <h2 className ="card-title banner-title">{movie.original_title}</h2>
    <p className ="card-text banner-text">{movie.overview}</p>
    {/* <a href="#" className ="btn btn-primary">Go somewhere</a> */}
  {/* </div> */}
</div> 
            </div>  
 }
            </>
        )
    }
}
