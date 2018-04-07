import React, {Component} from 'react'
import Comment from './Comment'
import StoryItem from './StoryItem'
import '../Styles/StoryPage.css'

export default class StoryPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      storyData:null,
      loadedComments: false,
      comments: null
    }
  }

  getAllComments(comments){
    console.log(comments);
    let CommentPromises = comments.map(commentID=>{
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json`)
        .then(resp => resp.json())
    })
    Promise.all(CommentPromises)
      .then(values => this.setState({

        comments: values,
        loadedComments:true,
        message:null
      }))
  }

  componentDidMount(){
    if(this.props.story===null){//if directed here directly from link, no app state
      fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.storyId}.json`)
        .then(resp => resp.json())
        .then(data => {
          console.log("fetched data for one item");
          console.log(data)
          this.setState({storyData: data})
          if(data.descendants){
            this.getAllComments(data.kids)
          } else{
            this.setState({message:"No comments for this post"})
          }
        })
    }else{//came here from home page, pass data for story in props
      this.setState({storyData:this.props.story})
      if(this.props.story.descendants){
        this.getAllComments(this.props.story.kids)
      }else{
        this.setState({message:"No comments for this post"})
      }
    }

  }

  render(){
    return(
      <div className="StoryPage">
        {this.state.storyData && <StoryItem
          story={this.state.storyData}
          getStoryInfo={null}
          showCommentsButton={false}
          currentTime={this.props.currentTime}
         />}
        <div className="CommentList">
          {this.state.loadedComments && this.state.comments.map(comment=>{
            return <Comment
              key={comment.id}
              currentTime={this.props.currentTime}
              comment={comment}/>
          })}
          <p>{this.state.message}</p>
        </div>
      </div>
    )
  }

}
