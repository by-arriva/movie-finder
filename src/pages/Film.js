import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { sendRequest } from "../store"
import emptyPoster from "../img/poster.png"

const Film = (props) => {
    const createString = (str) => {
        if(props.film[str] && props.film[str]!=="N/A"){
            return <p key={str}><span className="film-label-name">{str}:</span>{props.film[str]}</p>
        }
    }

    const createSeasonsLinks = () => {
        return (
            [...Array(+props.film.totalSeasons)].map((item, i) => (
                <p key={i}><span className="link" id={i+1} onClick={openSeason}>Season {i+1}</span></p>)
            )
        )
    }

    const createEpisodesLinks = () => {
        return (
            props.film.Episodes.map((item, i) => (
                <p key={i}><span className="link" id={item.imdbID} onClick={openId}>{item.Title}</span></p>)
            )
        )
    }

    const openSeason = (event) => {
        props.send(props.film.imdbID, event.target.id)
    }

    const openId = (event) => {
        props.send(event.target.id)
    }
    
    if(props.redirect) {
        return <Navigate replace to="/" />
    }
    if(props.loading) {
        return <p>Loading from database</p>
    }
    return (
        <div className="film-item">
            <img className="film-poster" src={(!props.film.Poster || props.film.Poster === "N/A") ? emptyPoster : props.film.Poster} alt=""></img>
            <div className="film-text">
                <h2 >{props.film.Year ? `${props.film.Title} (${props.film.Year})` : props.film.Title}</h2>
                {props.film.Plot && props.film.Plot!=="N/A" && <p>{props.film.Plot}</p>}
                {["Country","Genre","Director","Writer","Actors","Awards","Language","BoxOffice","Released","DVD","Runtime","Rated","Season"].map(item => createString(item))}
				{props.film.Type && <p><span className="type">{props.film.Type}</span></p>}
                {props.film.Type === "series" && props.film.totalSeasons && createSeasonsLinks()}
                {props.film.Episodes && createEpisodesLinks()}
                {props.film.seriesID && props.film.seriesID!=="N/A" && <p><span className="link" id={props.film.seriesID} onClick={openId}>To series title</span></p>}
                {props.film.imdbRating && props.film.imdbRating!=="N/A" && <h2><span className="rating">{props.film.imdbRating}</span></h2>}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.loading || !state.film,
        film: state.film,
        redirect: !state.loading && !state.film,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        send: (id, season) => dispatch(sendRequest("i", id, null, season)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Film)