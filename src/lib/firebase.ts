// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB1JNHgXT6l-w3CiYHJCnKMqDVP8V-wRgA",
	authDomain: "book-shop-2d265.firebaseapp.com",
	projectId: "book-shop-2d265",
	storageBucket: "book-shop-2d265.appspot.com",
	messagingSenderId: "1046536461161",
	appId: "1:1046536461161:web:3c8af16f5d6dc732f8bbf8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
