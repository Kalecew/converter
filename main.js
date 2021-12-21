// Способ 1
// fetch('https://www.cbr-xml-daily.ru/daily_json.js') //Promise with Response
// 	.then(function(result){ //Response
// 		return result.json() //Promise with Object
// 	})
// 	.then(function(obj){ //Object
// 		console.log(obj.Valute.USD.Value)
// 	})

// Способ 1 сокращённый
// fetch('https://www.cbr-xml-daily.ru/daily_json.js') //Promise with Response
// 	.then(result => result.json()) //Promise with Object
// 	.then(obj => console.log(obj.Valute.USD.Value))

// Способ не работающий
// const response = fetch('https://www.cbr-xml-daily.ru/daily_json.js') //Promise with Response
// const obj = response.json() //Error




const ratesList = {}
const ratesWrap = document.querySelector('#rates')
const input = document.querySelector('#input')
const result = document.querySelector('#result')
const selectResult = document.querySelector('#selectResult')
const maxLengtText = 20
const trend = (current, previous) => {
	if (current > previous) return '▲';
	if (current < previous) return '▼';
	return '';
}
const trendColor = (current, previous) => {
	if (current > previous) return ' top';
	if (current < previous) return ' bottom';
	return '';
}
const shorten = (text) => {
    if (text.length > maxLengtText) {
        text = text.substr(0,maxLengtText) + "...";
    }
    return text;
}
const rateMarkup = valute => {
	return `
		<div class="col-12 col-sm-4">
			<div class="course-item card card-body">
				<div class="course-item-title">Курс ${valute.CharCode}</div>
				<div class="course-item-value ${trendColor(valute.Value,valute.Previous)}">
					${valute.Value.toFixed(2)}
					<span class="triangle">${trend(valute.Value,valute.Previous)}</span>
				</div>
			</div>
		</div>
	`
}
const selectResultMarkup = valute => {
	return `
		<option class="option" value="${valute.CharCode}">
			${valute.CharCode} — ${shorten(valute.Name)}
		</option>`
}
const printMurkup = () => {
	for(valute in ratesList){
		ratesWrap.innerHTML += rateMarkup(ratesList[valute])
		selectResult.innerHTML += selectResultMarkup(ratesList[valute])
	}
}
const getCurrencies = async () => {
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js') //Response
	const obj = await response.json() //Object
	ratesList.USD = obj.Valute.USD
	ratesList.EUR = obj.Valute.EUR
	ratesList.GBP = obj.Valute.GBP		
}
const convert = () => {
	result.value = (parseFloat(input.value) / ratesList[selectResult.value].Value).toFixed(2)
}
const init = async () => {
	await getCurrencies()
	printMurkup()
	convert()
}
input.oninput = convert
selectResult.oninput = convert


init()



// console.log(ratesList)