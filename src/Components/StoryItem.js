import React from 'react'
import '../Styles/StoryItem.css'
import {Link} from 'react-router-dom'

export default function StoryItem(props){

  function calculateTime(){
    // console.log(props);
    let minutes =  Math.floor((props.currentTime - parseInt(props.story.time, 10)*1000) / 1000/60)
    if (minutes < 60){
      return minutes + " minutes ago"
    }
     return Math.floor(minutes / 60) + " hours ago"
  }

  function handleClick(){
    console.log("data passed up to parent");
    props.getStoryInfo(props.story)
  }

  return(
    <div className="StoryItem">
      <p className="votes">{props.story.score} <br/> votes </p>
      <div className="storyContent">
        <a href={props.story.url}>
          <p className="title">{props.story.title}</p>
        </a>
        <div className="subContent">
          <p>By: {props.story.by}</p>
          <p> {calculateTime()}</p>
          {props.showCommentsButton &&
            <Link to={'story/'+props.story.id}
              onClick={handleClick}>
              <button>
                <p>{props.story.descendants} comments </p>
              </button>
            </Link>
          }
        </div>
      </div>
    </div>
  )
}
