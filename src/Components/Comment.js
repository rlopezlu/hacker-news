import React from 'react'
import '../Styles/Comment.css'
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();


export default function Comment(props){
  function calculateTime(){
    // console.log(props);
    let minutes =  Math.floor((props.currentTime - parseInt(props.comment.time, 10)*1000) / 1000/60)
    if (minutes < 60){
      return minutes + " minutes ago"
    }
     return Math.floor(minutes / 60) + " hours ago"
  }

  function checkForKids(){

    if('kids' in props.comment){
      console.log(props.comment.id);
      return props.comment.kids.length
    }
    return 0;
  }

  function CheckForDeleted(){
    if(props.comment.deleted){
      return null
    }
    return (
      <div className="Comment">
        <div className="CommentWrapper">
          <div className="comment-info">
            <span>Author: {props.comment.by}</span>
            <span>Created: {calculateTime()}</span>
          </div>

          {/* Test had HTML entities and even html tags. the following deletes them */}
          <p className="comment-content">{entities.decode(props.comment.text)
            .replace(/<(?:.|\n)*?>/gm, '')}
          </p>
          <p>
            {checkForKids() + " replies"}
          </p>
        </div>
      </div>
    )

  }

  return(
    CheckForDeleted()
  )

}
