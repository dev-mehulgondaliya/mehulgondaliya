import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase/config";
const clean=s=>s.docs.map(d=>({id:d.id,...d.data()}));
export async function getPublishedProjects(){return clean(await getDocs(query(collection(db,"projects"),where("status","==","published"),orderBy("order","asc"))))}
export async function getAllProjects(){return clean(await getDocs(query(collection(db,"projects"),orderBy("createdAt","desc"))))}
export async function getProject(id){const item=await getDoc(doc(db,"projects",id));return item.exists()?{id:item.id,...item.data()}:null}
export async function getProjectBySlug(slug){const items=clean(await getDocs(query(collection(db,"projects"),where("slug","==",slug))));return items[0]||null}
export function createProject(data){return addDoc(collection(db,"projects"),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp()})}
export function updateProject(id,data){return updateDoc(doc(db,"projects",id),{...data,updatedAt:serverTimestamp()})}
export function deleteProject(id){return deleteDoc(doc(db,"projects",id))}
