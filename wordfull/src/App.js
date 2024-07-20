import { BrowserRouter, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUpRightFromSquare, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
library.add(
    faArrowUpRightFromSquare, faCircleChevronLeft
);
import Lesson from "./components/Lesson";
import Lessons from "./components/Lessons";
import "./styles/style.scss";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Lessons/>}/>
                <Route path="/lesson/:lessonID" element={<Lesson/>}/>
            </Routes>
        </BrowserRouter>
    );
}

/*
<Route path="/lesson/:lessonID" element={<Lesson/>}/

Ez egy url változó, aminek az a neve, hogy lessonID és ez ugye egy lesson/érték az url-ben és a 
/utána értéket menti lesz azzal a névvel, hogy lessonID useParams() segítségével!!!! 
const { lessonID } = useParams(); lesson.js

És akkor attól függően, hogy melyik id-ű-ra kattintunk rá a lessons.js-en, akkor azt jelenítjük meg
Ez most az indexe lesz az egyes leckéken, mert innen származtatható lessons.map((i)).. to={"lesson/" + i}  
*/

export default App;
