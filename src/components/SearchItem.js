import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendRequest } from "../store"
import emptyPoster from "../img/poster.png"

export const SearchItem = (props) => {
    const navigate = useNavigate()
    
    function handleClick() {
        navigate('/film')
        props.send(props.item.imdbID)
    }

    return (
        <div className="list-item">
            <img className="list-poster" src={props.item.Poster === "N/A" ? emptyPoster : props.item.Poster} alt=""></img>
            <div className="list-text">
                <h2><span className="link" onClick={handleClick}>{props.item.Title}</span></h2>
                <p>{props.item.Year}</p>
                <span className="type">{props.item.Type}</span>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        send: (id) => dispatch(sendRequest("i", id)),
    }
};

export default connect(null, mapDispatchToProps)(SearchItem)