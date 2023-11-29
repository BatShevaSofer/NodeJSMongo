// 11
const init = () => {
  doApi();
}

const doApi = async() => {
  let myurl = "https://test-5zy4.onrender.com/users/myInfo";
  let resp = await axios({
    url:myurl,
    method:"GET",
    // בהידר אני מוסף את הקיי של הטוקן מהלוקאל
    headers:{
      'content-type': "application/json",
      "x-api-key": localStorage["tok"]
    }
  })
  console.log(resp.data);
  if(resp.data._id){
    let item = resp.data;
    document.querySelector("#id_name").innerHTML = item.name;
    document.querySelector("#id_email").innerHTML = item.email;
    document.querySelector("#id_role").innerHTML = item.role;
  }
}

init();