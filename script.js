//Lade Bilder in ein Array

const catPics = [];
const board = document.getElementById("board");
const startButton = document.getElementById("startButton");

async function getImage() 
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

getImage();
console.log(catPics);

function setRandomImages() 
{
    shuffle(catPics);
    const fragment = document.createDocumentFragment();
    for (i = 0; i < 16; i++)
    {
        const div = document.createElement("div");
        div.id = "column";
        const img = document.createElement("img");
        fragment.appendChild(div);
        img.src = catPics[i].url;
        div.appendChild(img);
    }
    board.innerHTML = "";
    board.appendChild(fragment);
}


  startButton.addEventListener("click", setRandomImages)

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