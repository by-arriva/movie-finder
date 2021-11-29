import React from "react"
import { connect } from "react-redux"
import SearchItem from "./SearchItem"
import { sendRequest } from "../store"

const SearchList = (props) => {
    const clickHandler = (event) => {
        if(event.target.id === "1") {
            props.send(props.page-1)
        } else {
            props.send(props.page+1)
        }
    }
    
    if(!props.list) {
        return <p></p>
    }
    return (
        <div>
            {props.list.Search.map((item, i) => <SearchItem item={item} key={i}/>)}
            <p>
                {props.page>1 && <span id="1" className="link" onClick={clickHandler}>&lt; previous</span>}
                &emsp;
                {props.page<(props.list.totalResults/10) && <span id="2" className="link" onClick={clickHandler}>next &gt;</span>}
            </p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        page: state.page,
        list: state.list,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        send: (p) => dispatch(sendRequest("s", null, p)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)