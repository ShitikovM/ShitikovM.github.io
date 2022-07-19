window.addEventListener('DOMContentLoaded', () => {
	let language = null;
	function changeLanguage() {
		const languageBlock = document.querySelector('.header-language');
		const languageIcon = document.querySelector('.header-language__icon');
		const nextPageButton = document.querySelector('.main-block-button__link');
		const languageText = document.querySelector('.header-language__text');
		const addressText = document.querySelector('.header-address .header-address__text');
		languageBlock.addEventListener('click', () => {
			if (languageText.textContent === 'RUS') {
				languageIcon.setAttribute('src', 'img/icons/header/english.png');
				nextPageButton.setAttribute('href', 'eng/map.html');
				nextPageButton.textContent = 'EXCHANGE';
				languageText.textContent = 'ENG';
				addressText.textContent = '27 Konstantine Gamsakhurdia St, Batumi, Georgia';
				language = 'eng';
			} else {
				languageIcon.setAttribute('src', 'img/icons/header/russian.png');
				nextPageButton.setAttribute('href', 'ru/map.html');
				languageText.textContent = 'RUS';
				nextPageButton.textContent = 'ОБМЕН';
				addressText.textContent = 'ул. Константина Гамсахурдия 27, Батуми, Грузия';
				console.log(addressText);
				language = 'ru';
			}
		})
	}

	changeLanguage();

	async function fetchCryptocurrency(id) {
		const url = `https://api.coinpaprika.com/v1/tickers/${id}`;
		const response = await fetch(url);
		const datapoints = response.json();
		return datapoints;
	}
	
	function setCryptocurrencyPrice(datapoints, dataAttributeValue) {
		const priceBlock = document.querySelector([`[data-crypto=${dataAttributeValue}parent]`]);
		const price = datapoints.quotes.USD.price;
		priceBlock.innerHTML = `
		<div class="aside-right-text__name price-animation">
			${dataAttributeValue}
		</div>
		<div data-crypto="SOL" class="aside-right-text__price price-animation">
			${price.toFixed(3)}$
		</div>`
	}
	
	function updateCryptocurrencyPrice () {
		fetchCryptocurrency('sol-solana')
		.then((datapoints) => setCryptocurrencyPrice(datapoints, 'SOL'));
		fetchCryptocurrency('bnb-binance-coin')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'BNB'));
		fetchCryptocurrency('btc-bitcoin')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'BTC'));
		fetchCryptocurrency('busd-binance-usd')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'BUSD'));
		fetchCryptocurrency('eth-ethereum')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'ETH'));
		fetchCryptocurrency('usdc-usd-coin')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'USDC'));
	}
	
	function removeElementCryptocurrencyPrice(dataAttributeValue) {
		const priceBlock = document.querySelector(`[data-crypto="${dataAttributeValue}parent"]`);
		while (priceBlock.firstChild) {
			priceBlock.removeChild(priceBlock.firstChild);
	  }
	}

	function removeAllCryptocurrencyPrices() {
		removeElementCryptocurrencyPrice('SOL');
		removeElementCryptocurrencyPrice('BNB');
		removeElementCryptocurrencyPrice('BTC');
		removeElementCryptocurrencyPrice('BUSD');
		removeElementCryptocurrencyPrice('ETH');
		removeElementCryptocurrencyPrice('USDC');
	}

	function setAsideEventListeners() {
		const screenWidth = window.screen.width;
		console.log(screenWidth);
		const asideBlock = document.querySelector('.aside-right');
		if (screenWidth > 991.98) {
			asideBlock.addEventListener('mouseenter', updateCryptocurrencyPrice);
			asideBlock.addEventListener('mouseleave', removeAllCryptocurrencyPrices);
		} else {
			let asideLink = null;
			if (language === 'ru') {
				asideLink = './ru/chart.html';
			} else if (language === 'eng') {
				asideLink = './eng/chart.html';
			} else {
				asideLink = './ru/chart.html';
			}
			asideBlock.addEventListener('click', () => {
				window.location.href = asideLink;
			})
		}
	}

	setAsideEventListeners();
	function setTextAnimationOnHover() {
		const screenWidth = window.screen.width;
		const element = document.querySelector('.main-block-center-center__text');
		const parent = document.querySelector('.main-block');
		const box = document.querySelector('.main-block-center-box');
		const arrowLeft = document.querySelector('.main-block-left-arrow__img');
		const arrowRight = document.querySelector('.main-block-right-arrow__img');

		if (screenWidth > 991.98) {
			parent.addEventListener('mouseenter', () => {
				element.textContent = (language === 'ru' || language == null) ?
					'С помощью сервиса GlobalExchange вы можете перевести цифровые или наличные активы из одной страны, в любую другую точку мира. А также купить или продать любую криптовалюту, в любом объёме.' :
					'With the GlobalExchange service, you can transfer digital or cash assets from one country to any other point in the world. As well as buy or sell any cryptocurrency in any volume.';
				box.style.padding = '0';
				element.classList.add('text-animation');
				arrowLeft.style.right = '0';
				arrowRight.style.left = '0';
			});
			parent.addEventListener('mouseleave', () => {
				element.textContent = '';
				box.style.padding = '80px 0';
				arrowLeft.style.right = '-50px';
				arrowRight.style.left = '-50px';
			})
		}	
	}
	setTextAnimationOnHover();
})

