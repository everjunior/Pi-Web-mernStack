import React,{Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {addLike, removeLike,deletePost,addComment} from '../../../actions/post'
import {connect} from 'react-redux'
import CommentItem from './CommentItem'
const PostItem = ({auth,addComment,post:{_id,text,name,avatar,user,likes,comments,date},addLike,removeLike,deletePost,showActions,groupId}) => {
  const [dispalayComment, toogledisplayComment] = useState(false);
  const [textt,setTextt] = useState('');
  const onSubmit = e =>{
    if (e.key === 'Enter'){e.preventDefault();
          addComment(_id,groupId,{textt});
          setTextt('');
          toogledisplayComment(true);
        }
          
  }
   return(     <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
             {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>

            {showActions &&( <Fragment>
                <button onClick={e=>addLike(_id)}
             type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i> {' '}
            {likes.length > 0 && (  <span>{likes.length}</span>)}
            </button>
            <button onClick={e=>removeLike(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <button onClick={() => toogledisplayComment(!dispalayComment)} className="btn btn-primary">
              Discussion {comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
            </button>
            {!auth.loading && user === auth.user._id && (
                 <button  onClick={e => deletePost(_id)}
                 type="button"
                 className="btn btn-danger"
               >
                 <i className="fas fa-times"></i>
               </button>
            )}
           
  
                </Fragment>)}
                <div>{dispalayComment && <Fragment>
                  {comments.length > 0 ? (<div className="comments">
                      
                          {comments.map(comm => (
                              <CommentItem key={comm._id} comment={comm} postId={_id} groupId={groupId}/>
                          ))}
                          <button onClick={() => toogledisplayComment(!dispalayComment)} className='btn'>CLOSE</button>
                      </div>
                      ) :(<h4> No Comments</h4>) }
                      
                  </Fragment>}
                 </div>
                 <div>
        
                  <form className="form my-1">
                    <textarea
                      name="text"
                      cols="30"
                      rows="2"
                      placeholder="leave a comment.."
                      value={textt}
                      onChange={e => setTextt(e.target.value)}
                      required
                      onKeyPress={(e) => onSubmit(e)}
                    ></textarea>
                  </form>
                </div>
                 {/* <CommentForm postId={_id}></CommentForm> */}


                     </div>
                     
                     
        </div>
   )
}
PostItem.defaultProps ={
    showActions:true  
}
PostItem.propTypes = {
post:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
addLike:PropTypes.func.isRequired,
removeLike:PropTypes.func.isRequired,
deletePost: PropTypes.func.isRequired,
addComment:PropTypes.func.isRequired,
groupId:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps,{addLike,removeLike,deletePost,addComment})(PostItem)
