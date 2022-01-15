import React, { Component } from "react";
import { movies } from "./getMovies";

export default class Wachlist extends Component {
    constructor(){
        super();
        this.state = {
            genres: [],
            currgen : 'All Genres',
            movies : [],
            currSearch : "" ,
            limit : 5 ,
            currPage : 1 
        }
    }
   
  async componentDidMount(){
       let data = JSON.parse(localStorage.getItem("movies") || "[]")
       let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
       27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
       
     
      let temp = [];
      data.forEach((movieObj) => {
        if(!temp.includes(genreids[movieObj.genre_ids[0]]) ){
            temp.push(genreids[movieObj.genre_ids[0]]);
        }
    })
    temp.unshift('All Genres'); 
   
    this.setState({
       genres : [...temp],
       movies : [...data]
    })
    
      } 

    handleGenreChange = (genre) =>{
      this.setState({
        currgen: genre
      })
    } 

    sortPopularityDesc = ()=> {
      let temp = this.state.movies;
      temp.sort(function(objA,objB){
        return objB.popularity - objA.popularity; 
      }) 
      this.setState({
        movies : [...temp]
      })
    } 

    sortPopularityAsc = ()=> {
      let temp = this.state.movies;
      temp.sort(function(objA,objB){
        return objA.popularity - objB.popularity; 
      }) 
      this.setState({
        movies : [...temp]
      })
    }

    
    sortRatingDesc = ()=> {
      let temp = this.state.movies;
      temp.sort(function(objA,objB){
        return objB.vote_average - objA.vote_average; 
      }) 
      this.setState({
        movies : [...temp]
      })
    } 

    
    sortRatingAsc = ()=> {
      let temp = this.state.movies;
      temp.sort(function(objA,objB){
        return objA.vote_average - objB.vote_average; 
      }) 
      this.setState({
        movies : [...temp]
      })
    } 

    handlePageChange(page){
      this.setState({
         currPage : page
      })
    }
 
    handleDelete = (id) => {
      let newArr = [];
      newArr = this.state.movies.filter((movieObj)=>movieObj.id != id)
      this.setState({
        movies : [...newArr]
      }) 
      localStorage.setItem("movies",JSON.stringify(newArr))
    } 


    render() {  

      let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
      27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
      
      let filterArr = []; 
      if(this.state.currSearch == ""){
        filterArr = this.state.movies;
      }
    else{
       filterArr = this.state.movies.filter((movieObj)=>{
         let title = movieObj.original_title.toLowerCase();
         return title.includes(this.state.currSearch.toLowerCase());

       })
      }
      if(this.state.currgen != 'All Genres'){
        filterArr = this.state.movies.filter((movie)=>genreids[movie.genre_ids[0]] == this.state.currgen)
      }
       
    let pages = Math.ceil(filterArr.length / this.state.limit);
    let pagesarr = [] ;
    for(let i = 1  ; i <= pages ;i++){
      pagesarr.push(i); 
    } 
    // starting index
    let si = (this.state.currPage - 1) * this.state.limit ;
    // end index 
    let ei = si + this.state.limit ;
    filterArr = filterArr.slice(si,ei)

  return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul className="list-group watchlist-genre"> 
                { 
               this.state.genres.map((genre)=>( 
                   this.state.currgen == genre ?
                   <li className="list-group-item" style={{background:'#1C6DD0',color:'white'}} >{genre}</li> : 
                   <li className="list-group-item" style={{background:'#1C4D65',color:'white'}} onClick={() => this.handleGenreChange(genre)} >{genre}</li>
                 ))
                }
                </ul>
              </div>
              <div className="col-9 watchlist-table col-sm-12">
                <div className="row">
                  <input type="text" className="input-group-text col" placeholder="Search"  value={this.state.currSearch} onChange={(e)=>this.setState({currSearch : e.target.value})} />
                  <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e)=>this.setState({limit : e.target.value})} />
                </div>
                <div className="row">
                  <table className="table" style={{color:"white"}} >
                    <thead>
                      <tr>
                          <th></th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col" ><i class="fas fa-sort-up" onClick={this.sortPopularityDesc} ></i>Popularity<i class="fas fa-sort-down"  onClick={this.sortPopularityAsc} ></i></th>
                        <th scope="col"><i class="fas fa-sort-up"  onClick={this.sortRatingDesc}  ></i>Rating<i class="fas fa-sort-down"   onClick={this.sortRatingAsc}></i></th>
                      </tr>
                    </thead>
                    <tbody > 
                       {
                           filterArr.map((movieObj)=>(
                            <tr> 
                            <td> <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt="movie-img" style={{width : "5rem"}} /> </td>
                            <td>{movieObj.original_title}</td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}  </td>
                            <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)} >Remove</button></td>
                          </tr>
                           ))
                       }
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                <ul className="pagination"> 
                {
                  pagesarr.map((page) => (
                    <li className="page-item" onClick={()=>this.handlePageChange(page)} ><a className="page-link" href="#">{page}</a></li>
  ))
                }
                      
                     
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
