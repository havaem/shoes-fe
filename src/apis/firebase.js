import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyBm18wNuD7fOvrizTjPToOT4ub_ODe3CLU",
	authDomain: "shoes-baa04.firebaseapp.com",
	projectId: "shoes-baa04",
	storageBucket: "shoes-baa04.appspot.com",
	messagingSenderId: "420135723598",
	appId: "1:420135723598:web:ddc343e80291993ae4991f",
	measurementId: "G-KJYV26P2PQ",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
