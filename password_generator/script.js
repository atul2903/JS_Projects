let up = document.getElementById("up");
let lc = document.getElementById("lc");
let num = document.getElementById("num");
let sym = document.getElementById("sym");
let custom = document.querySelector("data-demo");
let passwordLength = document.getElementById("pword-length");
let rangeSlider = document.getElementById("myRange");
let inputField = document.getElementById("text-area");
let copyBtn = document.getElementById("copy-btn");
let pwordBtn = document.getElementById("btn");
let indicator = document.getElementById("indicator");
let upper, lower, numb, symb;
let passwordFlag = false;

const cap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const small = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "";
let password = "";
passwordLength.innerHTML = rangeSlider.value;
up.addEventListener("change", (e) => {
  console.log("value", e.target.checked);
  upper = e.target.checked;
});

lc.addEventListener("change", (e) => {
  console.log("value", e.target.checked);
  lower = e.target.checked;
});
num.addEventListener("change", (e) => {
  console.log("value", e.target.checked);
  numb = e.target.checked;
});
sym.addEventListener("change", (e) => {
  console.log("value", e.target.checked);
  symb = e.target.checked;
});

rangeSlider.addEventListener("input", (e) => {
  console.log(e.target.value);
  passwordLength.innerHTML = e.target.value;
});

inputField.addEventListener("change", (e) => {
  inputField.value = e.target.value;
});
const copyHandler = async () => {
  if (!passwordFlag) {
    alert("please generate password before copying");
    return;
  }
  try {
    await navigator.clipboard.writeText(inputField.value);
    alert("copied to clipboard->" + inputField.value);
  } catch (error) {
    alert(error);
  }
};

copyBtn.addEventListener("click", () => copyHandler());

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.border = `2px solid ${color}`;
  indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

// Default Indicator
setIndicator("#ccc");
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;

  if (upper) hasUpper = true;
  if (lower) hasLower = true;
  if (numb) hasNumber = true;
  if (symb) hasSymbol = true;

  if (
    hasUpper &&
    hasLower &&
    (hasNumber || hasSymbol) &&
    passwordLength.innerText >= 8
  ) {
    setIndicator("red");
  } else if (
    (hasLower || hasUpper) &&
    (hasNumber || hasSymbol) &&
    passwordLength.innerText >= 6
  ) {
    setIndicator("green");
  } else {
    setIndicator("blue");
  }
}

function getRndIneteger(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomNumber() {
  return getRndIneteger(0, 9);
}

function getUpperCaseLetter() {
  let res = getRndIneteger(65, 90);
  return String.fromCharCode(res);
}

function getLowerCaseLetter() {
  let res = getRndIneteger(97, 122);
  return String.fromCharCode(res);
}

function getSymbols() {
  let res = getRndIneteger(33, 64);
  return String.fromCharCode(res);
}

function generatePassword() {
  passwordFlag=true;
  let passwordArray = [];

  if (upper) passwordArray.push(getUpperCaseLetter);
  if (lower) passwordArray.push(getLowerCaseLetter);
  if (numb) passwordArray.push(getRandomNumber);
  if (symb) passwordArray.push(getSymbols);
  if (passwordArray.length === 0) {
    alert("please select any field");
    return;
  }

  console.log(passwordArray);
  password = "";
  inputField.value = password;
  console.log("btn clicked");
  for (let i = 0; i < Number(passwordLength.innerText); i++) {
    let ind = getRndIneteger(0, passwordArray.length);
    password = password + passwordArray[ind]();
  }
  calcStrength();
  inputField.value = password;
}

pwordBtn.addEventListener("click", () => generatePassword());
