const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns = document.querySelectorAll(".flags select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector(".btn");

for (let select of dropDowns) {
    for (let country in countryList) {
        let option = document.createElement("option");
        option.innerText = country;
        option.value = country;
        if (select.name === "from" && country === "USD") {
            option.selected = "selected";

        } else if (select.name === "to" && country === "INR") {
            option.selected = "selected";

        }

        select.append(option);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);

    })
}

let updateFlag = (element) => {
    let countryCurr = element.value;
    let country = countryList[countryCurr];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let e = element.parentElement.querySelector("img");
    e.src = newSrc
}

const updateRate = async () => {
    let amount = document.querySelector(".inputData");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    let final = document.getElementById("final");
    console.log(final);
    final.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
})

window.addEventListener("load", () => {
    updateRate();
})