import firebase from 'firebase'

export const firebaseConfig = {
	apiKey: "AIzaSyBvVrtUaiUECbf3koWSgFHBB3Ju0lcR5TM", // `${process.env.FIREBASE_API_KEY}`,
	authDomain: "quiz-321.firebaseapp.com", // `${process.env.FIREBASE_AUTH_DOMAIN}`,
	databaseURL: "https://quiz-321.firebaseio.com", // `${process.env.FIREBASE_DATABASE_URL}`,
	projectId: "quiz-321", // `${process.env.FIREBASE_PROJECT_ID}`,
	storageBucket: "quiz-321.appspot.com", // `${process.env.FIREBASE_STORAGE_BUCKET}`,
	messagingSenderId: "406978272049", // `${process.env.FIREBASE_MESSAGGE_SENDER_ID}`,
	appId: "1:406978272049:web:8e911c67675ebe0875ae10", // `${process.env.FIREBASE_APP_ID}`,
}

// Initialize Firebase
if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)
else firebase.app()

export const db = firebase.firestore()

export const addPlayer = async (allPlayers, player) => {
	await db.collection("quiz-321").doc("quiz-players").set({ data: [ ...allPlayers, player ] })
}

export const deletePlayer = async (allPlayers, player) => {
	const updatedPlayers = allPlayers.filter(item => item !== player)
	await db.collection("quiz-321").doc("quiz-players").set({ data: updatedPlayers })
}

export const updatePlayer = async (allPlayers, index, approved) => {
	const players = [...allPlayers]
	players[index].aprovuar = approved
	await db.collection("quiz-321").doc("quiz-players").set({ data: players })
}
