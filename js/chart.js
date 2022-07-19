window.addEventListener('DOMContentLoaded', () => {
	
async function fetchCryptocurrency(id) {
	const url = `https://api.coinpaprika.com/v1/tickers/${id}`;
	const response = await fetch(url);
	const datapoints = response.json();
	return datapoints;
}

function updateCryptocurrencyValue () {
	fetchCryptocurrency('sol-solana')
	.then((datapoints) => setCryptocurrencyValues(datapoints, 'SOL'));
	fetchCryptocurrency('bnb-binance-coin')
		.then((datapoints) => setCryptocurrencyValues(datapoints, 'BNB'));
	fetchCryptocurrency('btc-bitcoin')
		.then((datapoints) => setCryptocurrencyValues(datapoints, 'BTC'));
	fetchCryptocurrency('busd-binance-usd')
		.then((datapoints) => setCryptocurrencyValues(datapoints, 'BUSD'));
	fetchCryptocurrency('eth-ethereum')
		.then((datapoints) => setCryptocurrencyValues(datapoints, 'ETH'));
	fetchCryptocurrency('usdc-usd-coin')
		.then((datapoints) => setCryptocurrencyValues(datapoints, 'USDC'));
}

function setCryptocurrencyValues(datapoints, dataAttributeValue) {
	const priceBlock = document.querySelector([`[data-crypto=${dataAttributeValue}-price]`]);
	const price = datapoints.quotes.USD.price;
	priceBlock.innerHTML = price.toFixed(2) + '$';
	const supplyBlock = document.querySelector([`[data-crypto=${dataAttributeValue}-supply]`]);
	const supply = datapoints.total_supply;
	supplyBlock.innerHTML = supply;
	const changeBlock = document.querySelector([`[data-crypto=${dataAttributeValue}-change]`]);
	const change = datapoints.quotes.USD.percent_change_24h;
	const triangle = (change < 0) ? '▽' : '△';
	const color = (change < 0) ? 'rgb(255, 40, 40)' : 'rgb(18, 186, 18)';
	changeBlock.innerHTML = change + '%' + triangle;
	changeBlock.style.color = color;

}

updateCryptocurrencyValue();

})