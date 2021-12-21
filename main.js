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
const rateMarkup = function(valute){
	// console.log(valute.USD)
	return `
		<div class="col-12 col-sm-4">
			<div class="course-item card card-body">
				<div class="course-item-title">Курс ${valute.CharCode}</div>
				<div class="course-item-value">${valute.Value}</div>
			</div>
		</div>
	`
}
const getCurrencies = async function(){
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js') //Response
	const obj = await response.json() //Object
	ratesList.USD = obj.Valute.USD
	ratesList.EUR = obj.Valute.EUR
	ratesList.GBP = obj.Valute.GBP	
	printMurkup()
}
const printMurkup = async function(){
	for(valute in ratesList){
		console.dir(ratesList[valute])
		ratesWrap.innerHTML += rateMarkup(ratesList[valute])
	}
}

getCurrencies()


// console.log(ratesList)