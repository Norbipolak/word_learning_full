import { useParams } from "react-router-dom";
import { useState } from "react";

function Lesson() {
    //ebbe fogjuk tárolni az egyes lesson-öket 
    const [lesson, setLesson] = useState({});
    //ezzel szerezzük meg az url-böl a lessonID-t, tehát amit megadtuk a lessons-ben az i-vel, így lesznek lesson1, lesson2 
    const { lessonID } = useParams(); 
    //kell egy started, hogy mikor mutassuk meg, hogy mi volt a helyes szó 
    const [started, setStarted] = useState(false);
    //hogy angol szavakat mutassunk meg vagy magyarokat 
    const [mode, setMode] = useState("");
    //csinálunk egy randIndex-et, hogy melyik szót mutassuk majd a lesson-ben lévő words-ek küzöl 
    const [randIndex, setRandIndex] = useState(-1);
    //ezzel megszerezzük a user-nek az answer-ét 
    const [answer, setAnswer] = useState("");

    const [points, setPoints] = useState(0);
    const [rounds, setRounds] = useState(0);
    const [isNext, setIsNext] = useState(false);

    //itt szedjük le majd a megfelelő szavakat a lessons.json-ből és set-eljük vele a lesson useState-s változónkat, lessonID-adikat!!!!!!!!!!!!
    const getLessonByIndex = ()=> {
        const json = require("../lessons.json");
        setLesson(json.lessons[lessonID]);
        //ez itt a legfontosabb, hogy lessonID-adikat, ezért kell nekünk itt a lessonID lementve, hogy tudjuk, hogy melyik 
        //lessonID-ra mit kell majd lehozni!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    /*
    a start, amikor kiválosztottuk a mode-ot és ilyenkor legeneráljuk a randIndex-nek, csinálunk egy randNumber függvényt és majd 
    meghívjuk set-elésnél
    started meg false-ról true lesz 
    ezt egy button-nek fogjuk majd megadni 
    */
    const start = ()=> {
        if(mode === 0) {
            alert("You should select the mode!");
            return;
        }

        setRandIndex(randNumber(0, lesson.words.length - 1));
        setStarted(true);
    }

    const randNumber = (from, to)=> Math.floor(Math.random((to - from) + 1 ) + from);

    /*
    Most csináljuk az összehasonlítást, tehát ha eng-en van a select értéke (mode useState-s), akkor majd mindig az ellentetjével 
    akarjuk majd összehasonlítani amit beírt a user, erre csináljuk a key változót 
    Ha mode az egyenlő eng-vel, akkor hun különben pedig eng 
    const key = mode === "eng" ? "hun" : "eng"
    */
    const send = ()=> {
        const key = mode === "eng" ? "hun" : "eng"; 
        /*
        tehát pont ellenkező irányban és így már ha cat van kiírva és beírjuk, hogy macska akkor mindegyik macska lesz 
        console.log(answer) -> macska 
        console.log(lesson.words[randIndex][key]) -> macska 

        és majd ezeket összehasonlítjuk, hogy egyenlőek-e, fontos, hogy itt kell a toLowerCase is 
        hogy mindegyik lowercase legyen bárhogy is írjuk be ez kicsit hasonló, mint a trim() ahol a whitespace-eket tüntetjük el 
        */
        //összehasonlítás 
        if(lesson.words[randIndex][key].toLowerCase() === answer.toLowerCase()) {
            console.log("jó válasz");
            setPoints(p=>++p);
        }
        setRounds(r=>++r);
        /*
        Ha megadtuk a választ, akkor már nem annak kéne lennie a button-nek, hogy send, hanem next, hogy rákattintva 
        lefusson egy másik függvény amiben majd egy másik randIndex-es szó jön majd ki 
        függetlenül attól, hogy jó volt-e a válasz vagy sem!!! 
        Számoljuk majd a pontokat is!!! szóval ha a feletti az egyenlő és jó volt a válasz, akkor hozzáadunk a useState-s points-hoz egyet 
        const [points, setPoints] = useState(0); -> setPoints(p=>++p);
        és megjelenítjük a pontokat 
        lesz egy rounds is, ami ugyanaz, mint a points
        -> 
            <div className="maxw-500 grid-col-2 margin-x-auto">
                <div className="box-white p-md">
                    Points: {points}
                </div>
                <div className="box-white p-md">
                    Round: {rounds}
                </div>
            </div>
        ************
        most ha beírjuk a helyes választ, akkor és rányomunk a send-re, akkor folyamatosan ugyanaz a szó lesz kiírva, mert nem generáltunk 
        újat, és ahányszor rákattintunk nő majd a points meg a round is, ezért kell, hogy a send átváltozzon egy next-re, hogy 
        generáljunk egy új szót!!!! 
        csinálnuk egy isNext useState-s változót!!!!!, aminek false lesz az értéke
        és ez alapján a button-nél majd, hogy mi legyen kiírva next vagy send meg az is ez alapján lesz ellenőrizve, hogy 
        melyik fügvény fusson majd le!!!!!
        majd ennek az értékét meg ha megadta a választ a user true-ra fogjuk változtatni -> const [isNext, setIsNext] = useState(false);
        ebből
        ->
        <button onClick={send} className="input-md btn-dark-grey mr-md">Send</button>
        ha itt az isNext az true, akkor azt írjuk ki, hogy Next különben, hogy send!!!! 
        és ahol onClick-vel megadtuk, hogy mit hívjunk meg ott ha isNext az true, akkor ezt setRandIndex(randNumber(0, lesson.words.length - 1));
        hogy legenáljuk egy új szót, különben pedig a send függvényt 
        de ezt a setRandIndex(randNumber(0, lesson.words.length - 1))-nek csinálunk egy függvényt és majd azt adjuk meg majd a button-nak!! 
        */
        setIsNext(true);
        //nagyon fontos, hogyha megadott egy választ a user, akkor ki kell majd üriteni az input mezőt -> answer-nek az értéke üres string
        setAnswer("");
        setRandIndex(randNumber(0, lesson.words.length - 1));
    }

    const newRandIndex = ()=> {
        setRandIndex(randNumber(0, lesson.words.length - 1));
        /*
        <button onClick={isNext ? newRandIndex : send} 
        className="input-md btn-dark-grey mr-md">
            {isNext ? "Next" : "Send"}
        </button>

        itt még fontos, hogyha újat kérünk, akkor a setIsNext-et false-ra állítjuk 
        a send végén meg true-ra majd!!!! 
        és akkor így tudjuk váltogatni, hogy újat kérünk-e vagy beküldjük!!!!!!!!!!!!! 
        ha beküldtük akkor új kérés van, ha új kérés van, akkor meg be kell küldeni a választ!!!! 
        */
    };

    /*
    de lehet egyszübben is, mert a round points-ból kiderül, hogy jót írtunk be vagy rosszat!!!! 
    és akkor csak a send végén berakjuk, hogy csináljon egy új szót, és akkor nem kell a newRandIndex sem, mert a button-nél
    is csak a send lesz meghívva meg kiírva!!! 
    -> 
    setRandIndex(randNumber(0, lesson.words.length - 1));
    és akkor ehelyett 
    -> 
    <button onClick={isNext ? newRandIndex : send} 
    className="input-md btn-dark-grey mr-md">
        {isNext ? "Next" : "Send"}
    </button>
    ->
    <button onClick={send} 
    className="input-md btn-dark-grey mr-md">
        Send
    </button>
    és akkor nem is kell az isNext sem!!! 
    **************************************************************************
    */
   /*
   Most a quit-ot kellene megcsinálni mert ha arra rákattintunk, akkor az egészet előlröl kell, hogy kezdje!!!!!! 
   tehát kiíritünk mindent és vissza kell, hogy dobjon oda, ahol kiválasztjuk, hogy milyen mode-ot akarunk!!!! -> setStarted(false)!!
   */
    const quit = ()=> {
        //itt lenullázunk mindent!! 
        setStarted(false);
        setRounds(0);
        setAnswer("");
        setRandIndex(0);
        setPoints(0);
        /*
        <button className="input-md btn-warning"
        onClick={quit}>Quit</button>
        */
    };

    /*
    Nagyon fontos, hogy kell egy visszanyíl, hogy vissza tudjunk menni a főoldalra és ha több lesson van, akkor egy másikat kiválasztani!!!
    ehhez kell majd egy ikon a fontawesome-ról 
    import { faArrowUpRightFromSquare, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
    library.add(
    faArrowUpRightFromSquare, faCircleChevronLeft
    
    a container-be rögtön a tetejére betesszük
            <div className="container text-center box-light-grey p-lg pos-relative">
            <h2 className="pos-absolute">
                <Link to={"/"}>
                    <Fontawesome icon="fa-solid fa-circle-chevron-left" />
                </Link>
            </h2>
    */


    useEffect(()=> {
        getLessonByIndex()
    }, [])

    return(
        <div className="container text-center box-light-grey p-lg pos-relative">
            <h2 className="pos-absolute">
                <Link to={"/"}>
                    <Fontawesome icon="fa-solid fa-circle-chevron-left" />
                </Link>
            </h2>
            <h1>Lesson</h1>
            <div className="maxw-500 grid-col-2 margin-x-auto">
                <div className="box-white p-md">
                    Points: {points}
                </div>
                <div className="box-white p-md">
                    Round: {rounds}
                </div>
            </div>

            {
                !started &&
                <>
                    <h2>Mode</h2>
                    <select onChange={(e)=>setMode(e.target.value)} className="input-md input-primary mr-md" value={mode}> 
                        <option value="">Select the mode!</option>
                        <option value="eng">eng-hun</option>
                        <option value="hun">hun-eng</option>
                    </select>

                    <button onClick={start}></button>
                </>
            }

            {
                started &&
                <div className="box-secondary p-md mt-lg maxw-500 margin-x-auto">
                    <h3 className="color-white">{lesson.words[randIndex][mode]}</h3>
                    <input className="input-seondary input-md mr-md"
                    onChange={(e)=>setAnswer(e.target.value)} value={answer}></input>

                    <button onClick={send} 
                    className="input-md btn-dark-grey mr-md">
                        Send
                    </button>
                    <button className="input-md btn-warning"
                    onClick={quit}>Quit</button>
                </div>
            }

        </div>
    );
}

/*
!started ha nem kezdődött el, akkor visszaadunk egy select-et, ahol a user tud választani, majd egy button-t a start függvénnyel onClick-ben 
ahol megcsináljuk a véletlen index-ű szót és started-ot true-ra tesszük 

utána meg ha a started az true, akkor megjelenítjük a szavunkat és csinálunk egy input-ot, ahova be tudja írni a user, hogy mi a tipp-je 
azt kivesszük majd egy onChange-vel és összehasonlítjuk a szavunk ellentetjével!!!!! tehát ha tree jeleník meg akkor fa-t beír a user, akkor
nem a tree-vel kell összehasonlítani a válaszát, hanem a fa-val!!!!! 

useNavigate() mire való!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Arra szolgál, hogy fel tudunk adatbázisba venni egy új leckét szavakkal!!!!! 
és, akkor ez úgy fog müködni, hogy nem a json-ból szerezzük be, hanem lesz egy lecke felvitele oldal
Amikor készen van a lecke, akkor a szerver visszaküldi a leckének az id-ját és átnavigál automatikusan arra az oldalra
ahol a leckét felülírni tudjuk és nem pedig újat felvinni!!!!!!!!!!
Felülírni az id alapján van egy olyan oldal, hogy createLesson és arra az oldalra navigál át, hogy createLesson/5, ahol az 5 az id-ja 
és ehhez kell ez, hogy automatikusan átírányítson arra az oldalra 

import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    navigate('/success', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      { form fields }
      <button type="submit">Submit</button>
    </form>
  );
};

Menete
1. const navigate = useNavigate();
2. const navigate = useNavigate();
3. navigate('/path-to-navigate', { replace: true, state: { from: '/previous-path' } });


import React, { useState } from 'react';

const CreateLesson = () => {
  const [lessonName, setLessonName] = useState('');
  const [lessonContent, setLessonContent] = useState('');

  const handleCreateLesson = () => {
    // Logic to create a lesson
    console.log('Lesson Created:', { lessonName, lessonContent });
  };

  return (
    <div>
      <h1>Create a New Lesson</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreateLesson();
      }}>
        <div>
          <label>Lesson Name:</label>
          <input type="text" value={lessonName} onChange={(e) => setLessonName(e.target.value)} />
        </div>
        <div>
          <label>Lesson Content:</label>
          <textarea value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} />
        </div>
        <button type="submit">Create Lesson</button>
      </form>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToCreateLesson = () => {
    navigate('/create-lesson');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToCreateLesson}>Create a New Lesson</button>
    </div>
  );
};

**************************************************
Link és a useNavigate közötti különbség 
->

Key Differences

Declarative vs. Programmatic:
- Link is declarative, making it straightforward for static navigation elements in the JSX.
- useNavigate is programmatic, allowing for navigation logic to be embedded in JavaScript functions.

Use Case Scenarios:
- Use Link when you need simple, clickable elements that change the route.
- Use useNavigate when navigation is contingent upon certain actions or conditions within the component.

Link 
<Link to="/create-lesson">Create a New Lesson</Link>

useNavigate
const MyComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/create-lesson');
  };

  return (
    <button onClick={handleNavigation}>Create a New Lesson</button>
  );
};

amikor a függvényen belül szertnénk, hogy átvigyen minket valahova 
és nem csinálunk button-t vagy fontAwesomeIcon-t 
és fontos, hogy a useNavigate-vel mindig oda visz (pl. belépési procedura)
link meg option-el, hogy ha rákattintunk akkor odavisz, amugy meg nem!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

useNavigate: When used in a function, it automatically navigates to the specified route as soon as the function is called. 
This is useful for navigation triggered by events, like form submissions or button clicks.

const navigate = useNavigate();
navigate('/target-route'); // Automatically navigates when called

Link: Creates a clickable element that navigates to the specified route when the user clicks on it. 
Navigation only occurs if the user interacts with the Link.

<Link to="/target-route">Go to Target</Link> // Navigates only when clicked
So, useNavigate is for immediate, programmatic navigation, while Link is for optional, user-triggered navigation!!!! 




*/

export default Lesson;