import { addDoc, collection, deleteDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase/config";
export function createContactMessage(data){return addDoc(collection(db,"contactMessages"),{...data,status:"new",createdAt:serverTimestamp(),updatedAt:serverTimestamp()})}
export async function getContactMessages(){const snapshot=await getDocs(query(collection(db,"contactMessages"),orderBy("createdAt","desc")));return snapshot.docs.map(x=>({id:x.id,...x.data()}))}
export function updateContactStatus(id,status){return updateDoc(doc(db,"contactMessages",id),{status,updatedAt:serverTimestamp()})}
export function deleteContactMessage(id){return deleteDoc(doc(db,"contactMessages",id))}
