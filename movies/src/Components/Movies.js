import React, { Component } from "react";
import axios from "axios"; 

export default class Movies extends Component {
  constructor() {
    super();

    this.state = {
      parr: [1],
      currPage: 1,
      movies: [], 
      watchlist:[]
    };
  }
  // Api key ea1bfc09076ec13dc3d682b81cc8b8ec
  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=ea1bfc09076ec13dc3d682b81cc8b8ec&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }

  changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=ea1bfc09076ec13dc3d682b81cc8b8ec&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };
  // onclicking next button
  handleRight = () => {
    let tempArr = [];
    // adding pages in pagination
    for (let i = 0; i < this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }
    // re-render as to change state
    this.setState(
      {
        parr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
    // the function may be called before
    // changing the state as it is asynchronous
    // this.changeMovies(); // pass this as second arguement
    // to setState
  }; 

  handleLeft = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  }; 
  
  // if user directly clicks on page number
  handleClick = (value) => {
      if(value != this.state.currPage){
          this.setState({
              currPage : value
          },this.changeMovies)
      }
  }; 

   handleWatchlist = (movie)=>{
      let oldData = JSON.parse(localStorage.getItem('movies') || "[]" )

      if(this.state.watchlist.includes(movie.id)){
        // removing - it is already present in oldDtat
        oldData = oldData.filter((m)=> m.id != movie.id )
      }else{ 
        // not in watchlist
          oldData.push(movie)
      }
      localStorage.setItem("movies",JSON.stringify(oldData));
      this.handleWatchlistState();
    }

    handleWatchlistState = () => {
      let oldData = JSON.parse(localStorage.getItem('movies') || "[]" );
      let temp = oldData.map((movies)=>movies.id);
      this.setState({
        watchlist : [...temp]
      })
    } 

  render() {
    // let movie = movies.results;
    return (
      <div>
        <h2 style={{ color: "white", display: "block", alignItems: "center" }}>
          Trending
        </h2>
        <div className="Movies">
          {this.state.movies.map((movie) => {
            return (
              <div className="movie-div">
                <img
                  //     style={{width :"30vw" ,
                  //    height :"40vh"}
                  // }
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="card-img-top banner-image"
                  alt="movie.title"
                />

                <div className="movie-info">
                  <h4>{movie.original_title}</h4>
                </div>
                {/* <button className='btn btn-primary' >Details</button> */}
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="button">
                    Watch
                  </button>

                  <a className="btn btn-primary" onClick={() => this.handleWatchlist(movie) } >
                    {this.state.watchlist.includes(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                  </a>
                </div>
                {/* <div className='overview' > <h3>Overview</h3>  {movie.overview} </div> */}
              </div>
            );
          })}
        </div>
        {/* {Pagination} */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={this.handleLeft}>
                  Previous
                </a>
              </li>
              {this.state.parr.map((value) => {
                return (
                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={() => this.handleClick(value)}
                    >
                      {value}
                    </a>
                  </li>
                );
              })}
              <li className="page-item">
                <a className="page-link" onClick={this.handleRight}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
