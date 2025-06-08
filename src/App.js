import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


export default class App extends Component {
    pagesize=15
    apikey=process.env.REACT_APP_API_NEWS_API_KEY
    state={
      progress:0
    }
    setProgress=(progress)=>{
      this.setState({progress:progress})
    }
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
           <LoadingBar
        color="#f11946"
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
      
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress}    key='general' pagesize={this.pagesize} apikey={this.apikey} country='us' category='general' />} />
            <Route exact  path='/business' element={<News setProgress={this.setProgress}    key='business' pagesize={this.pagesize} apikey={this.apikey} country='us' category='business' />} />
            <Route exact  path='/entertainment' element={<News setProgress={this.setProgress}   key='entertainment' pagesize={this.pagesize} apikey={this.apikey} country='us' category='entertainment' />} />
            <Route exact  path='/health' element={<News setProgress={this.setProgress}   key='health' pagesize={this.pagesize} country='us' apikey={this.apikey} category='health' />} />
            <Route exact  path='/science' element={<News setProgress={this.setProgress}   key='science' pagesize={this.pagesize} country='us' apikey={this.apikey} category='science' />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress}    key='sports' pagesize={this.pagesize} country='us' apikey={this.apikey} category='sports' />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress}   key='technology' pagesize={this.pagesize} country='us' apikey={this.apikey}  category='technology' />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
