
let dateInfo;
const baseUrl="http://127.0.0.1:1337";









function test() {
    fetch(baseUrl+"/api/recipes?populate=*")
        .then(function (response) {
            response.json().then(function (response) {
                dateInfo= response.data[0].attributes;
                console.log(dateInfo);
                buildRecipe();
                buildStage();
                document.querySelector("#thumbnail").setAttribute("src",baseUrl+dateInfo.thumbnail.data.attributes.url);



            });
        })
}

function buildRecipe(){
   document.querySelector("#title").innerHTML=dateInfo.title;
   document.querySelector("#description").innerHTML=dateInfo.description;
   dateInfo.ingredients.data.map((ingredient)=>{
       let li = document.createElement("li");
       li.innerHTML=ingredient.attributes.name + " " + ingredient.attributes.quantite + " " + ingredient.attributes.unity ;
       document.querySelector("#ingredients").append(li);
   })
}
function buildStage(){
    for (let index = 0; index < dateInfo.stages.data.length; index++) {
        const stage = dateInfo.stages.data[index].attributes;
        let p = document.createElement("p");
        p.innerHTML="Etapes : "+ (index +1) + " </br> " + stage.content;
       document.querySelector("#stages").append(p);
    }

}


test();