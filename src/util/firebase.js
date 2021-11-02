import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyDnUi-Om5fmOvxVxiFhSesFgI-i3wDnXMw',
	authDomain: 'food-order-app-7cec7.firebaseapp.com',
	databaseURL: 'https://food-order-app-7cec7-default-rtdb.firebaseio.com',
	projectId: 'food-order-app-7cec7',
	storageBucket: 'food-order-app-7cec7.appspot.com',
	messagingSenderId: '107301528371',
	appId: '1:107301528371:web:bd0113159407aace411446'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase