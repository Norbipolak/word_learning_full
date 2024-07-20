import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

function Lessons() {
    const [lessons, setLessons] = useState([]);

    const getLessons = ()=> {
        try {
            const json = require("../lessons.json");
            setLessons(json.lessons);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        getLessons();
    }, []);

    return(
        <div className="container text-center">
            <h1>Lessons</h1>

            <div className="row">
                 {
                    lessons.map((l, i)=> 
                        <div  key={i} className="col-lg-3 p-md box-primary">
                            <h3 className="color-white">{l.title}</h3>
                            <p className="color-white">
                                {l.description}
                            </p>
                            <div>
                                <Link to={"/lesson/" + i} >
                                    <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square"/>
                                </Link>
                            </div>
                        </div>
                    )
                 }
            </div>
        </div>
    );
}

/*
Hozzáfértünk a json file-hoz, hogy require-vel leentettük egy változóba az elérési útvonalat, ez olyan mintha egy képet tettünk volna be 
const json = require("../lessons.json")

lértehoztunk egy useState-s változót, amibe set-eltük a json-t, amit megkaptunk setLessons(json.lessons)

a return-be csináltunk egy container-t text-center-vel 
ebbe beleraktunk egy h1-es tag-et, amibe kiírtuk, hogy lessons 
és fontos, hogyha bootstrap-es grid-rendszert csinálunk, akkor csinálunk egy div-et, aminek megadjuk class-ként a row-t 
utána végigmegyünk a lessons-ön egy map-vel és utána csinálunk egy div-et, aminek megadjuk, hogy col-lg-3 vagy valamilyen hasonlót 
megjelenítjük a dolgokat, amiket kaptunk (h3, p)

Nagyon fontos, hogy csinálunk egy Link-et, aminek megadjuk a to-t, hogy hiva vigyen minket to={"/lesson/" + i}
és bele a fontAwesome-os ikont 

<Route path="/lesson/:lessonID" element={<Lesson/>}/
és a lessonID, ami egy dinamikusan változó url lesz, arra majd az i-t, mint index-et fogjuk felhasználni 

és a Lesson.js-ben pedig a useParams-val, megszerezzük ennek az értékét const {lessonId} = useParams()
*/

export default Lessons;