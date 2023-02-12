
//Empty Array to be filled
const catPics = [];

//Get Elements from memory.html
const board = document.getElementById("board");
const startButton = document.getElementById("startButton");
const headline = document.getElementById("headline");
const div = document.getElementsByTagName("div");
const solvedElems = document.getElementsByClassName("solved");
const scoreElem = document.getElementById("score");
const elem = document.getElementsByClassName("element");
const victory = document.getElementById("finalscore");
const vicScreen = document.getElementById("vicscreen");

//Score + "X" from assignment
let score = 0;
const X = 10;

//Start/reset game
startButton.addEventListener("click", setRandomImages);

//Fill array with random cat pics from CatAPI; shuffle array
async function getImages() 
{
    let response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=8&hasBreeds=1",
      {
        headers: {
          "x-api-key": "live_RxPo1U4zzD9xyp316z6wAlBJ3T2sOmCCZGofSv2SssT2EXUXbxEETC8FiPNrMavA",
        },
      }
    );

    let img = await response.json();

    for (i = 0; i < 8; i++)
    {
        catPics.push(img[i]);
    }

    shuffle(img);

    for (i = 0; i < 8; i++)
    {
        catPics.push(img[i]);
    }
}


//Game initializer; async since has to wait for getImages()
async function setRandomImages() 
{
    //clears array on restart
    if(catPics.length > 15)
    {
      catPics.length = 0;
      await getImages();
    } else {await getImages();}
    
    //set score to 0 and initialize board on (re-)start
    score = 0;
    scoreElem.innerText = `Score: ${score}`;
    startButton.style.transform = "translateX(-700px) translateY(10px)";
    startButton.style.display = "inline-block";
    headline.style.display = "none";
    board.style.display = "";
    startButton.value = "Restart";
    scoreElem.style.display = "block";
    vicScreen.style.display = "none";

    
    shuffle(catPics);

    //create div parent nodes with img children
    const fragment = document.createDocumentFragment();
    for (i = 0; i < 16; i++)
    {
        const div = document.createElement("div");
        div.className = "element";
        div.addEventListener("click", flipCards);
        const img = document.createElement("img");
        div.id = catPics[i].id;
        fragment.appendChild(div);
        img.src = catPics[i].url;
        div.appendChild(img);
    }
    board.innerHTML = "";
    board.appendChild(fragment);
    console.log(catPics);
}

//Fisher-Yates Algorithm
function shuffle(a) 
{
    var j, x, i;
    for (i = a.length - 1; i > 0; i--)
    {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function flipCards(event)
{
  const activeElements = document.getElementsByClassName("active");

  //allow 2 active selected elements at a time
  if(activeElements.length < 2)
  {
    event.target.classList.add("active");
  }

  if(activeElements.length == 2)
  {
    if(activeElements[0].id == activeElements[1].id)
    {
      //reassign class name to cleared cards, disable eventListener

      activeElements[0].classList.add("solved");
      activeElements[1].classList.add("solved");

      activeElements[0].removeEventListener("click", flipCards);
      activeElements[1].removeEventListener("click", flipCards);


      activeElements[1].classList.remove("active");
      activeElements[0].classList.remove("active");

      score += X;
    } else
    {
      setTimeout(function(){
        activeElements[1].classList.remove("active");
        activeElements[0].classList.remove("active");
      },3000)

      //if score value is below 0, replace with 0 (Math.max -> return higher number)
      score = Math.max(score - X/2, 0);
      

      
    }
    scoreElem.innerText = `Score: ${score}`;
  }

  if(solvedElems.length == 16)
  {
    victory.innerText = score;
    vicScreen.style.display = "flex";
  }
}