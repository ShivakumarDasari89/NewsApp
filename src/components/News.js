
import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Newsdata from '../Newsdata.json'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
  static defaultProps={
    country:'us',
    pagesize:8,
    category:'general'
  }

  static propTypes={
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string

  }
    constructor(){
        super();
        this.state={
            loading:false,
            pagesize:30,
            articles:[],
            totalResults:0,
            page:1
        }
    }

   async componentDidMount(){
    try {
      this.props.setProgress(10)
        this.setState({loading:true})
      let  url=` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        let data=await fetch(url)
        let parsedata=await data.json()
        if (Array.isArray(parsedata.articles)) {
                this.props.setProgress(50)

            this.setState({
                articles: parsedata.articles,totalResults:parsedata.totalResults,loading:false
            });
            this.props.setProgress(80)

          } else {
            console.log('Invalid response. No articles array.',parsedata.articles);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
              this.props.setProgress(100)
    }




 capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
fetchMoreData = async () => {
  if (this.state.articles.length >= this.state.totalResults) return;

  try {
    const nextPage = this.state.page + 1;

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}=${nextPage}&pagesize=${this.props.pagesize}`;

    this.setState({ loading: true });

    const data = await fetch(url);
    const parsedData = await data.json();

    if (Array.isArray(parsedData.articles)) {
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        page: nextPage,
        totalResults: parsedData.totalResults,
        loading: false
      });
    } else {
      console.log('Invalid response. No articles array.', parsedData);
      this.setState({ loading: false });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    this.setState({ loading: false });
  }
};



  render() {
    return (
        <>
      <div key={this.state.page} className='container my-3 ' >
        <h1 className="text-center">News Monkey {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading&&<Spinner/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={ this.state.loading&&<Spinner/>}
        >
        <div className="row">
        { this.state.articles.map((item, index) => (
    item.title && item.title.trim().length > 0 &&
    item.description &&
    item.description.trim().toLowerCase() !== 'no description' &&
    item.description.trim().length > 0 &&
    item.urlToImage &&
    item.url ? (
        <div className="col-md-4" key={index}>
            <NewsItem
                title={item.title.slice(0, 45)}
                description={item.description.slice(0, 88)}
                imageUrl={item.urlToImage}
                newsUrl={item.url} author={item.author} publishedAt={item.publishedAt}
            />
        </div>
    ) : null
))}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.hadlePrevClick}> &larr; Previous</button>
            <button type='button' disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)} className='btn btn-dark' onClick={this.hadleNextClick}> Next &rarr; </button>

        </div> */}    </div>
      </>
    )
  }
}


