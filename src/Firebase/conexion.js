//Código obtenido desde la consola de Firebase 
//Uso de parámetros para el funcionamiento de Firebase en el proyecto
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

export const app = firebase.initializeApp({
  //parámetros de configuración de Firebase
  "projectId": "sensores-99f30",
  "appId": "1:914088178863:web:e62210021def48ed3a905a",
  "storageBucket": "sensores-99f30.appspot.com",
  "apiKey": "AIzaSyCFEvMx4ALc2VkhQgzJ1M-S19pKuCxUGTI",
  "authDomain": "sensores-99f30.firebaseapp.com",
  "messagingSenderId": "914088178863"
});

export const auth = getAuth(app); 
export const db = app.firestore();