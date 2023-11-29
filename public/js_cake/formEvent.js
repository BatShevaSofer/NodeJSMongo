// 12
// איסוף המידע דרך אינפוטים
export const decalreFormEvent = (_doApi) => {
  let id_form = document.querySelector("#id_form");
  id_form.addEventListener("submit", (e) => {
    e.preventDefault();
// הכנסתם לאובייקט
    let dataBody = {
      name: document.querySelector("#id_name").value,
      cals: document.querySelector("#id_capital").value,
      price: document.querySelector("#id_pop").value,
    }

    console.log(dataBody);
    addNewCake(dataBody, _doApi);
  })
}

// סקשת פוסט ליצירת רשומה חדשה
const addNewCake = async (_bodyData, _doApi) => {
  let myUrl = "https://test-5zy4.onrender.com/cakes";
  try {
    let resp = await axios({
      url: myUrl,
      // שיטת השיגור אם פוסט, פוט או דיליט
      method: "POST",
      // הבאדי שנרצה לשלוח
      data: JSON.stringify(_bodyData),
      // כדי שהשרת יבין שזה ג'ייסון
      headers: {
        'content-type': "application/json",
        'x-api-key':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU2NmZkZGMyZjc1ODE5ODkwNjYxZDE3IiwiX3JvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTI0ODU3MiwiZXhwIjoxNzAxMjUyMTcyfQ.0Jlmtlv087Kq8wXo9hZj19_WXN4_KwXf71kTVm2RFms"
      }
    })
    // אם הצלחנו אנחנו יודעים שנקבל איי די 
    if (resp.data._id) {
      alert("Cake added");
      _doApi();
      // לקרוא מחדש לדו איי פי איי שנמצא בקובץ אפ
    }
    else {
      alert("there problem , try again")
    }
  }
  catch (err) {
    console.log(err);
    alert("There problem, come back later")
  }
}