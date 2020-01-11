// import firebase from "firebase"
import * as firebase from "firebase/app"

// Add the Firebase services that you want to use
import "firebase/auth"
import "firebase/firestore"


export const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: "quiz-321", // This one didn't work when i stored in .env file
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGGE_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
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
