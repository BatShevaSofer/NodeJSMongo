// 10
import CakeClass from "./cakeClass.js";
import { decalreFormEvent } from "./formEvent.js";

const init = () => {
  doApi();
  decalreFormEvent(doApi);
}

const doApi = async() => {
  let url = "http://localhost:3000/cakes?perPage=8&reverse=yes";
  try{
    let resp = await axios.get(url);
    console.log(resp);
    console.log(resp.data);
    createTable(resp.data)
  }
  catch(err){
    console.log(err);
    alert("There problem, come back later")
  }
}


const createTable = (_ar) =>{
  document.querySelector("#tbody").innerHTML = "";
  _ar.forEach((item,i) => {
    let tr = new CakeClass("#tbody",item,i,doApi);
    tr.render();
  })
}

init();