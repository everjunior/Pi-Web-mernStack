import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'

const GroupActions = ({group}) => {
    return (
        <Fragment>  {group === null  ? <Spinner></Spinner> : <Fragment>

        <Link to={`/group-details/${group._id}`} className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i>Stream </Link>
        <Link to="/team-work" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Team Work </Link>
        
        <Link to="/vote-history" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Vote History </Link>
        <Link to="/group-mem" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Membres </Link>
          </Fragment>}</Fragment>
    )
}

GroupActions.propTypes = {

}

export default GroupActions
