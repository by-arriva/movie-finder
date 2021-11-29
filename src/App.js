import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Search } from "./pages/Search"
import Film from "./pages/Film"

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
            <Routes>
                <Route path={"/"} exact element={<Search/>}/>
                <Route path={"/film"} element={<Film/>}/>
            </Routes>
            </div>
        </BrowserRouter>
    );
}