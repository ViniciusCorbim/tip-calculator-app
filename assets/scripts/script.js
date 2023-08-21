//--------------------------------Functions--------------------------------\

let bill = 0,
  tipPercentage = 0,
  peoples = 1;

const checkInterval = (input, min, max) => {
  try {
    if (input.value < min && min !== undefined) input.value = min;
    if (input.value > max && max !== undefined) input.value = max;
  } catch (error) {
    return;
  }
};

const removeSelected = () => {
  [...document.querySelectorAll(".selected")].map((cl) => {
    cl.classList.remove("selected");
  });
};

const crtElements = (elem, content, clss) => {
  const element = document.createElement(elem);
  element.innerText = content;
  element.classList.add(clss);
  return element;
};

//--------------------------------End Functions--------------------------------\

//--------------------------------Get Bill--------------------------------\

document.getElementById("bill").addEventListener("input", function (e) {
  checkInterval(e.target, 0);
  bill = Number(e.target.value) ?? 0;

  tipOutput(bill, tipPercentage, peoples);
});

//--------------------------------End Get Bill--------------------------------\\

//---------------------------------Get Tip---------------------------------\\

[...document.querySelectorAll(".selectTip button")].map((i) => {
  i.addEventListener("click", function (e) {
    document.getElementById("tipCustom").value = "";
    removeSelected();
    e.target.classList.add("selected");
    tipPercentage = Number(e.target.innerText.replace("%", "")) / 100;

    tipOutput(bill, tipPercentage, peoples);
  });

  document.getElementById("tipCustom").addEventListener("input", (e) => {
    checkInterval(e.target, 0, 100);
    removeSelected();
    tipPercentage = Number(e.target.value) / 100;

    tipOutput(bill, tipPercentage, peoples);
  });
});

//---------------------------------End Get Tip---------------------------------\\

//---------------------------------Get Peoples---------------------------------\\

//<span class="error">Can't be zero</span>
const spanError = crtElements("span", "Can't be zero", "error");

document.getElementById("peoples").addEventListener("input", function (e) {
  checkInterval(e.target, 0);
  peoples = Number(e.target.value) ?? 1;

  // * "Can't be zero"
  const label = e.target.previousElementSibling;

  if (e.target.value == 0) {
    peoples = 1;

    label.classList.add("error");
    label.appendChild(spanError);
    e.target.classList.add("error");
  } else {
    try {
      label.classList.remove("error");
      label.removeChild(spanError);
      e.target.classList.remove("error");
    } catch (error) {}
  }

  tipOutput(bill, tipPercentage, peoples);
});

//---------------------------------End Get Peoples---------------------------------\\

//------------------------------Output------------------------------\\

function tipOutput(bill = 0, tipPercentage = 0, peoples = 1) {
  const tipAmount = ((bill * tipPercentage) / peoples).toFixed(2);
  const total = ((bill + bill * tipPercentage) / peoples).toFixed(2);

  document.getElementById("outputTipAmount").innerText = "$" + tipAmount;
  document.getElementById("outputTotal").innerText = "$" + total;
}

//------------------------------End Output------------------------------\\

//-----------------------------------Reset-----------------------------------\\

document.getElementById("btnReset").addEventListener("click", function (e) {
  removeSelected();

  document.getElementById("bill").value = "";
  document.getElementById("tipCustom").value = "";
  document.getElementById("peoples").value = "";

  bill = 0;
  tipPercentage = 0;
  peoples = 1;

  tipOutput(bill, tipPercentage, peoples);
});

//-----------------------------------End Reset-----------------------------------\\
