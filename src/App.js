import React, { Component } from 'react';
import './App.css';
import StoryList from './Components/StoryList'
import StoryPage from './Components/StoryPage'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

// TODO: add filter for best, new, and top topstories
// TODO: add link to github
// TODO: add recursive comments
// TODO: option to hide comments
// TODO: add loading indicator for home and comments
// TODO: load 20 articles, then load when button is pressed
// TODO: add reload button
// TODO: create date component to avoid repeating code in post / comment
// TODO: Home page stories are loaded for entire app, only load for home page
// TODO: load comments with HTML formatting instead of just removing it
// TODO: clicking Hacker News story links to comments page instead


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loadedIDList: false,
      loadedDetailedList:false,
      storyDetailList:[],
      currentStory:null,
    }
  }

  incrementCounter = () =>{
    console.log("incrementCounter");
    this.setState({
      counter: this.state.counter + 1
    })
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
            storyList: myJson.slice(0,50)
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

  getStoryInfo = (story)=>{
    console.log("succesfully passed to parent");
    console.log(story);
    this.setState({
      currentStory:story
    })
  }

  render() {
    return (
      <div className="App">
        <Router >
          <div className="routerWrapper">
            <header className="App-header">
              <Link to='/hacker-news'>
                <h1 className="App-title">Hacker News Reader</h1>
              </Link>
            </header>
            <Switch>
              <Route path='/hacker-news/story/:storyId' render={(props)=>
                <StoryPage
                  currentTime={this.state.currentTime}
                  story={this.state.currentStory}
                  {...props}
                />}
              />
              <Route path='/hacker-news' render={()=>
                <StoryList
                  loadedDetailedList = {this.state.loadedDetailedList}
                  storyList={this.state.storyDetailList}
                  getStoryInfo={this.getStoryInfo}
                  currentTime={parseInt(this.state.currentTime, 10)}
                />}/>

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
