//Lade Bilder in ein Array

const catPics = [];
const board = document.getElementById("board");
const startButton = document.getElementById("startButton");
const headline = document.getElementById("headline");
const div = document.getElementsByTagName("div");
const solvedElems = document.getElementsByClassName("solved");

let score = document.getElementById("score");
const elem = document.getElementsByClassName("element");
console.log(catPics);

startButton.addEventListener("click", setRandomImages);

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



async function setRandomImages() 
{
    await getImages();
    startButton.style.transform = "translateX(-650px) translateY(10px)";
    startButton.style.display = "inline-block";
    headline.style.display = "none";
    board.style.display = "";
    startButton.value = "Restart";
    
    shuffle(catPics);

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
}

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

  if(activeElements.length < 2)
  {
    event.target.classList.add("active");
  }

  console.log(activeElements.length);

  if(activeElements.length == 2)
  {
    if(activeElements[0].id == activeElements[1].id)
    {
      activeElements[0].classList.add("solved");
      activeElements[1].classList.add("solved");

      activeElements[0].removeEventListener("click", flipCards);
      activeElements[1].removeEventListener("click", flipCards);


      activeElements[1].classList.remove("active");
      activeElements[0].classList.remove("active");

      score.innerText = parseInt(score.innerText) + 100;

      console.log(solvedElems);
    } else
    {
      setTimeout(function(){
        activeElements[1].classList.remove("active");
        activeElements[0].classList.remove("active");
      },2000)



      
    }
  }

}