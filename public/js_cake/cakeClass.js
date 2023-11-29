// 11
export default class CakeClass{
  constructor(_parent,_item,_index,_doApi) {
    this.parent = _parent;
    this.name = _item.name;
    this.cals = _item.cals;
    this.price = _item.price;
    this.index = _index;
    this.id = _item._id;
    this.doApi = _doApi;
  }

  render(){
    let tr = document.createElement("tr");
    document.querySelector(this.parent).append(tr);

    tr.innerHTML = `
    <td>${this.index + 1}</td>
    <td>${this.name}</td>
    <td>${this.price.toLocaleString()}</td>
    <td>${this.cals}</td>
    <td><button class="badge bg-danger del-btn">Del</button></td>
    `

    let delBtn = tr.querySelector(".del-btn");
    delBtn.addEventListener("click" , () => {
      // alert(this.id);
      confirm("Are you sure you want to delete?") && this.delCake()
    })
  }

  async delCake(){
    let url = "https://test-5zy4.onrender.com/cakes/"+this.id;
    try{
      let resp =  await axios({
        url:url,
        method:"DELETE",
        headers:{
          'content-type': "application/json",
          'x-api-key':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU2NmZkZGMyZjc1ODE5ODkwNjYxZDE3IiwiX3JvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTI0ODU3MiwiZXhwIjoxNzAxMjUyMTcyfQ.0Jlmtlv087Kq8wXo9hZj19_WXN4_KwXf71kTVm2RFms"
        }
      })
      if(resp.data.deletedCount == 1){
        // alert("Cake deleted")
        this.doApi();
      }
      else{
        alert("There problem")
      }
    }
    catch(err){
      console.log(err);
      alert("There problem, come back later")
    }
  }
}