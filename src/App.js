import React, { Component } from 'react';
import './App.css';
import StoryList from './Components/StoryList'
import CommentList from './Components/CommentList'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loadedIDList: false,
      loadedDetailedList:false,
      storyDetailList:[],
      currentStory:null

    }
  }

  componentDidMount(){

    let d = new Date();
    this.setState({currentTime:d.getTime()})
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(response => response.json())
      .then(myJson => {
          console.log(myJson)
          this.setState({
            loadedIDList: true,
            storyList: myJson.slice(0,10)
          }, this.getAllData)
        })
  }

  getAllData(){
    let arrayOfPromises = this.state.storyList.map( story => {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`)
        .then(resp => resp.json())
    })
    Promise.all(arrayOfPromises)
      .then(data => {
        console.log(data);
        this.setState({
          storyDetailList:data,
          loadedDetailedList:true})
      })
  }

  getStoryInfo(story){
    console.log(story);
    this.setState({currentStory:story})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to='/'>
              <h1 className="App-title">Hacker News Reader</h1>
            </Link>
          </header>
          <Route exact={true} path='/' render={()=>
            <StoryList
              loadedDetailedList = {this.state.loadedDetailedList}
              storyList={this.state.storyDetailList}
              getStoryInfo={this.getStoryInfo}
              currentTime={parseInt(this.state.currentTime, 10)}
            />}/>
          <Route path='/story/:storyId' render={(props)=>
            <CommentList
              story={this.state.currentStory}
              {...props}
            />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
