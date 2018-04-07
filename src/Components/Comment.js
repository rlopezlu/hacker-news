import React from 'react'
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

export default function Comment(props){
  return(
    <div className="Comment">
      <p>Author: {props.comment.by}</p>
      {/* Test had HTML entities and even html tags. the following deletes them */}
      <p>{entities.decode(props.comment.text)
        .replace(/<(?:.|\n)*?>/gm, '')}
      </p>
    </div>
  )
}
