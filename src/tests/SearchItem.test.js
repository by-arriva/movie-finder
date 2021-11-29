import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { render, screen } from "@testing-library/react";
import { SearchItem } from "../components/SearchItem"

describe("SearchItem component", () => {
    const item = {
        Poster: "N/A",
        Title: "Test",
        Year: 2021,
        Type: "test",
    }
    const send = jest.fn()
    const jsx = (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} exact element={<SearchItem item={item} send={send}/>}/>
            </Routes>
        </BrowserRouter>
    )

    it("renders without crashing", () => {
        const div = document.createElement("div")
        ReactDOM.render(jsx, div)
    })

    it("should render Test to title", () => {
        render(jsx)
        expect(screen.getByText("Test")).toBeInTheDocument()
    })
    
    it("renders correctly", () => {
        const tree = render(jsx)
        expect(tree).toMatchSnapshot()
    })
    
    it("calls handleClick method when clicking the title", () => {
        const tree = mount(jsx)
        tree.find(".link").simulate("click")
        expect(send).toHaveBeenCalledTimes(1)
    })
})