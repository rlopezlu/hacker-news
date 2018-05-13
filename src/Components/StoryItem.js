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

  function handleStoryRedirect(){
    window.open(props.story.url, '_blank')
  }

  function numberOfComments(){
    return props.story.descendants || '0'
  }

  return(
      <div className="StoryItem">
        <div className="clickable" onClick={handleStoryRedirect}>
          <div className="title">
            <p >{props.story.title}</p>
          </div>
        </div>
        <div className="subContent">
          <div className="leftSide">
            <div className="votesAndAuthor">
              <span className="votes">{props.story.score}</span> <span> votes • </span>
              <span>by {props.story.by}</span>
            </div>

            <div className="timeAndSite">
              <span>{getShortURL() + " •"}</span>
              <span> {calculateTime()}</span>
            </div>
          </div>
          <div className="rightSide">
            <div className="comments">
              {props.showCommentsButton &&
                <Link className="linkButton" to={'/hacker-news/story/'+props.story.id}
                  onClick={handleClick}>
                  <button>
                    {numberOfComments()} comments
                  </button>
                </Link>
              }
            </div>
          </div>

        </div>
      </div>
        )
        }
