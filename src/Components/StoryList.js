import React from 'react'
import StoryItem from './StoryItem'
import '../Styles/StoryList.css'

export default function StoryList(props){
  if(props.loadedDetailedList){
    return(
      <div className="StoryList">
        {props.storyList.map(story =>
          <StoryItem
            story={story}
            getStoryInfo={props.getStoryInfo}
            key={story.id}
            showCommentsButton={true}
            currentTime={props.currentTime}
          />)}
      </div>
  )}
  else{
    return <p>Loading Stuff</p>
  }
}
