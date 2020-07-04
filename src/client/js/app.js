const whetherBitKey = '8875c0c9155b4da19256a4d8d0364a1c';
const pixaKey = '17318612-a143925bdc31ad9c2425397e5';
const api = 'http://localhost:8081/';

let localData = {};

function mainFunc(event) {
	event.preventDefault();
	// document.getElementById('generate').addEventListener('click', () => {
	let postal = document.getElementById('postal').value;
	const countryCode = document.getElementById('country').value.toUpperCase();
	const startDateTemp = document.getElementById('startDate').value;
	const startDate = new Date(startDateTemp);

	let currentDateTemp = new Date();
	// currentDateTemp = currentDateTemp.toISOString().substring(0, 10);
	localData.date = new Date(currentDateTemp);
	console.log(localData.date);
	//get the difference in days to know which index of the array to get according to date
	//and if the day entered is more than 16 days away we will generate a random index as a prediction of the whether
	let dayDiff = Math.ceil((startDate - localData.date) / (1000 * 60 * 60 * 24));
	console.log(dayDiff);
	if (dayDiff > 16) {
		dayDiff = Math.floor(Math.random() * Math.floor(16));
	}
	//chaining the promises to collect the data then add them to the local variable
	//then posting the data in that variable to the server
	//this would be the fastest and most efficient way of doing this task
	const baseurlGeo = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${postal}&country=${countryCode}&username=IShamss`;
	getData(baseurlGeo)
		.then((data) => updateLocalData('first', data.postalcodes[0]))
		.then(() =>
			getData(
				`https://api.weatherbit.io/v2.0/forecast/daily?lat=${localData.first.lat}&lon=${localData.first.lng}&key=${whetherBitKey}`
			)
		)
		.then((data) => updateLocalData('second', data.data[dayDiff]))
		.then(() =>
			getData(
				`https://pixabay.com/api/?key=${pixaKey}&q=${localData.first.adminName2}&image_type=photo`
			)
		)
		//if there is no results use the default picture
		.then((data) => {
			if (!data.totalHits) {
				updateLocalData(
					'third',
					'https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_960_720.png'
				);
			} else {
				// console.log(data);
				// console.log(data.hits[0].webformatURL);
				updateLocalData('third', data.hits[0].webformatURL);
			}
		})
		// .then(() => console.log(localData))
		.then((data) => {
			postData(api + 'add', localData);
		})
		.then(() => {
			updateUI(api + 'all');
		})
		.catch((error) => console.log('Error', error));
	// });
}

const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	try {
		const newData = await res.json();
		return newData;
	} catch (err) {
		console.log('error', err);
	}
};

const getData = async (url) => {
	const res = await fetch(url);
	try {
		let data = await res.json();

		return data;
	} catch (err) {
		console.log('Error', err);
	}
};

const updateUI = async (url) => {
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	document.getElementById('title').innerText = data.first.placeName;
	document.getElementById('lat').innerText = 'Latitude : ' + data.first.lat;
	document.getElementById('long').innerText = 'Longitude : ' + data.first.lng;
	document.getElementById('max_temp').innerText =
		'Maximum Temperature : ' + data.second.max_temp + ' degrees';
	document.getElementById('min_temp').innerText =
		'Minimum Temperature : ' + data.second.min_temp + ' degrees';
	document.getElementById('avg_temp').innerText =
		'Average Temperature : ' + data.second.temp + ' degrees';
	document.getElementById('wind_spd').innerText =
		'Wind Speed : ' + data.second.wind_spd + ' m/s';
	document.getElementById('clouds').innerText =
		'Average total cloud coverage : ' + data.second.clouds + ' %';
	document
		.getElementById('image_container')
		.setAttribute(
			'style',
			`background-image:url('${data.third}');border: 0.5px solid rgba(255, 191, 178, 0.2589986678265056);`
		);
};

const updateLocalData = (localKey, data) => {
	localData[localKey] = data;
	// console.log(localData);
	return localData;
};

export { mainFunc, postData, updateUI, getData };
