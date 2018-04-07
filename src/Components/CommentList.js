import React, {Component} from 'react'
import Comment from './Comment'
import '../Styles/CommentList.css'

export default class CommentList extends Component{

  constructor(props){
    super(props);
    this.state = {
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
        loadedComments:true
      }))
  }

  componentDidMount(){
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.storyId}.json`)
      .then(resp => resp.json())
      .then(data => {
        console.log("got data for one item");
        console.log(data)
        this.getAllComments(data.kids)
      })
  }

  render(){
    return(
      <div className="CommentList">
        {this.state.loadedComments && this.state.comments.map(comment=>{
          return <Comment comment={comment}/>
        })}
      </div>
    )
  }

}
