import React from 'react'
import '../Styles/StoryItem.css'
import {Link} from 'react-router-dom'
var parse = require('url-parse')

export default function StoryItem(props){

  function calculateTime(){
    // console.log(props);
    let minutes =  Math.floor((props.currentTime - parseInt(props.story.time, 10)*1000) / 1000/60)
    if (minutes < 60){
      return minutes + " minutes ago"
    }
     return Math.floor(minutes / 60) + " hours ago"
  }

  function getShortURL(){
    if(props.story.url){
      return parse(props.story.url, true).hostname
    }
    return 'Hacker News'

  }

  function handleClick(){
    console.log("data passed up to parent");
    props.getStoryInfo(props.story)
  }

  function numberOfComments(){
    return props.story.descendants || '0'
  }

  return(
    // <div className="StoryItem">
      <a className="linkWrapper StoryItem" href={props.story.url}>
        <span className="votes">{props.story.score} <br/> votes </span>
        <div className="storyContent">
          <div>
            <p className="title">{props.story.title}</p>
            <span>{getShortURL()}</span>
          </div>
          <div className="subContent">
            {/* <p>{getShortURL()}</p> */}
            <p>{calculateTime()} by {props.story.by}</p>
            {props.showCommentsButton &&
              <Link to={'/hacker-news/story/'+props.story.id}
                onClick={handleClick}>
                <button>
                  <p>{numberOfComments()} comments </p>
                </button>
              </Link>
            }
          </div>
        </div>
        </a>
    // </div>
  )
}
