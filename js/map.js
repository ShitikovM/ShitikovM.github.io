window.addEventListener('DOMContentLoaded', () => {
	mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpdGlrb3YwMDAiLCJhIjoiY2w1ZTliNnRwMGlqZTNqbnR1bnRpcDFiMCJ9.gdU3izpkDihTRDBIovm_Gg';

	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/dark-v10',
		center: [41.6539,41.6460],
		zoom: 11.15
	});

	const language = document.getElementsByTagName('html')[0].getAttribute('lang');

	map.on('load', () => {
		map.addSource('places', {
			'type': 'geojson',
			'data': {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'properties': {
									'description':
										language === 'ru' ? '<p>Наш главный офис</p>' : '<p>Our main office</p>'
							},
							'geometry': {
									'type': 'Point',
									'coordinates': [41.6387 ,41.6481]
							}
						}
					]
			}
		});
	
	map.addLayer({
		'id': 'places',
		'type': 'circle',
		'source': 'places',
		'paint': {
			'circle-color': '#0a0a0b',
			'circle-radius': 6,
			'circle-stroke-width': 2,
			'circle-stroke-color': '#fe7b0c'
		}
	});

	const popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false,
	});

	map.on('mouseenter', 'places', (e) => {
		 
		  map.getCanvas().style.cursor = 'pointer';

		  const coordinates = e.features[0].geometry.coordinates.slice();
		  const description = e.features[0].properties.description;

		  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		  }

		  popup.setLngLat(coordinates).setHTML(description).addTo(map);
	 });

	 map.on('mouseleave', 'places', () => {
		  map.getCanvas().style.cursor = '';
		  popup.remove();
	 });
	});

	const modalElement = document.querySelector('[data-modal="modal"]');
	const modalButton = document.querySelector('[data-modal="button"]');
	const modalButtonText = modalButton.querySelector('.button__link');
	const modalSelect = document.querySelector('[data-modal="select"]');
	const modalText = document.querySelector('[data-modal="text"]');
	const selectContent = document.querySelector('[data-modal="select-content"]');
	modalButtonText.addEventListener('click', () => {
		modalElement.classList.remove('hide');
	});
	modalButton.addEventListener('click', () => {
		modalElement.classList.remove('hide');
	});
	document.addEventListener('click', (e) => {
		console.log(e.target)
		if (e.target != modalElement && e.target != modalButton && e.target != modalButtonText && e.target != modalSelect && e.target != selectContent && e.target != modalText) {
			modalElement.classList.add('hide')
		}
	})
})