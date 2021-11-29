import React, { useState} from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendRequest, randomId } from "../store"
import logo from "../img/logo.png"

const SearchInput = (props) => {
    const [text, setText] = useState(props.search)
    const navigate = useNavigate()

    const submitHandler = event => {
        event.preventDefault()
        if(!text.trim()) {
            return
        }
        props.send(text)
    }
    
    const inputHandler = event => {
        setText(event.target.value)
    }

    const clickHandler = () => {
        navigate('/film')
        props.random()
    }

    return (
        <form className={(props.inlineSearchInput) ? "inline-search-input" : "center-search-input"} onSubmit = {submitHandler}>
            <img src={logo} alt=""></img>
            <input type="text" onChange={inputHandler} value={text} disabled={props.disabled} autoFocus={!props.inlineSearchInput}/>
            <div>
                <button type="submit" disabled={props.disabled}>Search</button>
                <button type="button" onClick={clickHandler} disabled={props.disabled}>Random Film</button>
            </div>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        disabled: state.loading,
        inlineSearchInput: (state.loading && state.search) || state.list,
		search: state.search,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        send: (text) => dispatch(sendRequest("s", text)),
        random: () => dispatch(sendRequest("i", randomId())),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)