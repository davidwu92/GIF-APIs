//TOPICS/BUTTONS ARRAY
let topics = [`Onepunchman`, `Dragonball`, `Akame Ga Kill`, `Hunter X Hunter`, `Angel Beats`, `Princess Mononoke`, `Spirited Away`, `Howl's Moving Castle`];

//buttons in div#topics
const addBtns = function() {
    document.getElementById(`topics`).innerHTML = "";
  for(i=0; i<topics.length; i++){
    let topicBtn = document.createElement("A");
    topicBtn.innerHTML = `${topics[i]}`;
    topicBtn.setAttribute(`id`, `${topics[i]}`);
    topicBtn.setAttribute(`class`, `waves-effect red waves-dark btn`); //topic button's id = topics array string
    document.getElementById(`topics`).appendChild(topicBtn);
  }
}
addBtns()

//Listening for activity on page.
document.addEventListener(`click`, e =>{
   if(topics.includes(e.target.id)){ //if a topic button is clicked...
      document.getElementById('gifs').innerHTML = ""; //clear div#gif space
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=Oiwj5WLnirsZVzxbEhCft4iCBsjmGgEO&q=anime+${e.target.id}&limit=30&offset=z&rating=R&lang=en`)
      .then(r => r.json())
      .then(data => {
//Space for me to grab the right things from the API
   //Checking the data.data array:
      console.log(data.data[1])
         for (let i = 0; i<30; i++) { //creates 30 cards in which we'll put gifs
            if(data.data[i].rating !== "r") {
               let gifcard = document.createElement("div");
               let cardtitle = `Rating: ${data.data[i].rating}`;
               gifcard.innerHTML = `
                  <div class = "col s4">
                     <div class = "card">
                        <span class="card-title">${cardtitle}</span>
                        <img src="${data.data[i].images.original_still.url}" id="${data.data[i].id}">
                     </div>
                  </div>`; //gifs are still until clicked.
               document.getElementById('gifs').appendChild(gifcard);
               //Listen for click on each <img> and toggle animation
               let isMoving = false;
               document.getElementById(`${data.data[i].id}`).addEventListener('click', e => {
                  if (isMoving === false) {
                     e.target.setAttribute(`src`, `${data.data[i].images.original.url}`);
                     isMoving = true;
                  } else {
                     e.target.setAttribute(`src`, `${data.data[i].images.original_still.url}`);
                     isMoving = false;
                  }
               })
            }
         }
      })
      .catch(e => console.log(e));
   }
   else if (e.target.id === "submit"){ //clicking Submit Button
      e.preventDefault();
      if (document.getElementById("newTopic").value){ //checking if input has anything.
         if (!(topics.includes(document.getElementById("newTopic").value))){
            console.log("input working");
            let newTopic = document.getElementById("newTopic").value;
            topics.push(newTopic);
            addBtns();
         }
         else {
            alert(`${document.getElementById("newTopic").value} already exists in the buttons menu.`)
            document.getElementById("newTopic").value = ``;
         }
      }
      else { //if the input was empty.
        alert(`I was expecting the title of an anime series before you hit "submit!"`)
      }
  }
})