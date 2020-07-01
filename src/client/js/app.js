const key = '2af85d77026a9c00d226ea7dbe247257';

const api = 'http://localhost:8081/';
function mainFunc(event) {
	event.preventDefault();
	// document.getElementById('generate').addEventListener('click', () => {
	let user = document.getElementById('feelings').value;
	const zip = document.getElementById('zip').value;
	console.log(zip);
	const baseurl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}`;
	getData(baseurl, user)
		.then((data) => {
			postData(api + 'add', data);
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

const getData = async (url, usr) => {
	const res = await fetch(url);
	try {
		let data = await res.json();
		data.user = usr;
		let d = new Date();
		let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
		data.date = newDate;
		return data;
	} catch (err) {
		console.log('Error', err);
	}
};

const updateUI = async (url) => {
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	document.getElementById('date').innerText = data.date;
	document.getElementById('temp').innerText = data.temperature;
	document.getElementById('content').innerText = data.user;
};

export { mainFunc, postData, updateUI, getData };
