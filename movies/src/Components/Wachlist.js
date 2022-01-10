import React, { Component } from "react";
import { movies } from "./getMovies";

export default class Wachlist extends Component {
    constructor(){
        super();
        this.state = {
            genres: []
        }
    }
 
    render() { 
      const movie  = movies.results;
      let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
      27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
      
      //we have ids for genres so we are making
      // a new array to store the genre list
      let temp = [];
      movie.forEach((movieObj) => {
          if(! temp.includes(genreids[movieObj.genre_ids[0]]) ){
              temp.push(genreids[movieObj.genre_ids[0]]);
          }
      })
      temp.unshift('All Genres')
      return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-3">
                <ul class="list-group watchlist-genre">
                  <li className="list-group-item">All Genres</li>
                  <li className="list-group-item">Action</li>
                  <li className="list-group-item">Comedy</li>
                  <li className="list-group-item">Romance</li>
                  <li className="list-group-item">Science Fiction</li>
                </ul>
              </div>
              <div className="col-9 watchlist-table ">
                <div className="row">
                  <input type="text" className="input-group-text col" />
                  <input type="number" className="input-group-text col" />
                </div>
                <div className="row">
                  <table class="table" style={{color:"white"}} >
                    <thead>
                      <tr>
                          <th></th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Popularity</th>
                        <th scope="col">Rating</th>
                      </tr>
                    </thead>
                    <tbody > 
                       {
                           movie.map((movieObj)=>(
                            <tr> 
                            <td> <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt="movie-img" style={{width : "5rem"}} /> </td>
                            <td>{movieObj.original_title}</td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}  </td>
                            <td><button type="button" className="btn btn-danger">Remove</button></td>
                          </tr>
                           ))
                       }
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                <ul class="pagination">
                      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
