const dropDownItems = document.querySelectorAll(
  ".dropdown-menu li a.dropdown-item"
);
const formInput = document.querySelector("input.form-control");

const inputlabel=document.querySelector("#form-input-label");

const units = ["mg", "g", "kg", "t", "oz", "lb"];
document.getElementById("kgdiv").style.display = "none";
document.querySelector(".conversion").style.visibility = "hidden";

// the unit that user will select
let selectedunit="kg";
let weightinkg=0;

// function to break string

function splitSring(string) {
  let string2 = "";
  let breakindex;
  for (let i = 0; i < string.length; i++) {
    if (string[i] == " ") {
      breakindex = i;
      break;
    }
  }
  for (let i = breakindex + 2; i < string.length - 1; i++) {
    string2 = string2 + string[i];
  }

  return string2;
}

// to removeselected unit from container
function removeselectedunitcontainer(selectedunit) {
  for (let i = 0; i < units.length; i++) {
    document.getElementById(`${units[i]}div`).style.display = "";
  }
  const container = document.getElementById(`${selectedunit}div`);
  container.style.display = "none";
}

dropDownItems.forEach((item) => {
  item.addEventListener("click", () => {
    const text = item.innerHTML;
    // formInput.placeholder = `Enter Weight in ${text}`;
    inputlabel.innerHTML=` Enter Weight in ${text}`;
    selectedunit = splitSring(item.innerHTML);
    removeselectedunitcontainer(selectedunit);
    weightinkg=convertweightinkg(formInput.value);
    convertandsetweight(weightinkg);
  });
});

function convertweightinkg(weight)
{
   if(selectedunit=="kg")
   {
     return weight;
   }
   else if(selectedunit=="g")
   {
    return weight/1000;
   }
   else if(selectedunit=="mg")
   {
    return weight/1000000;
   }
   else if(selectedunit=="t")
   {
       return weight/0.001;
   }
   else if(selectedunit=="oz")
   {
    return weight*0.0283495231;
   }
   else
   {
    return weight*0.45359237;
   }
}
function convertandsetweight(weight)
{
   const kg=weight;
   const mg=weight*1000000;
   const g=weight*1000;
   const t=weight/1000;
   const oz=weight*35.2739619;
   const lb=weight*2.2046;
  document.getElementById("kg").textContent=kg;
  document.getElementById("g").textContent=g;
  document.getElementById("mg").textContent=mg;
  document.getElementById("t").textContent=t;
  document.getElementById("oz").textContent=oz;
  document.getElementById("lb").textContent=lb;
}
formInput.addEventListener("input", (e) => {
  if (!isNaN(e.target.value)) {
    if (e.target.value.length !== 0) {
      document.querySelector(".conversion").style.visibility = "visible";
      weightinkg=convertweightinkg(e.target.value);
      convertandsetweight(weightinkg);
    } else {
      document.querySelector(".conversion").style.visibility = "hidden";
    }
  } else {
    if (document.querySelector(".alert") != null) {
      document.querySelector(".alert").remove();
    } else {
      const heading = document.querySelector(".display-3");
      const alert = document.createElement("div");
      alert.className = `alert alert-danger shaking-animation`;
      alert.appendChild(document.createTextNode("Enter Only Number"));
      const container = document.querySelector(".container");
      container.insertBefore(alert, heading);
      const id=setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 3000);
    }
  }
});
