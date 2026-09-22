import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase/config";
const clean=s=>s.docs.map(d=>({id:d.id,...d.data()}));
// Keep this query to a single Firestore field. Combining `status` with an
// `orderBy("order")` can require a manually-created composite index; if that
// index is absent Firestore rejects the whole request and the public site has
// no projects to render. Sort the small portfolio collection in the browser.
export async function getPublishedProjects(){
  const projects=clean(await getDocs(query(collection(db,"projects"),where("status","==","published"))));
  return projects.sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
}
export async function getAllProjects(){return clean(await getDocs(query(collection(db,"projects"),orderBy("createdAt","desc"))))}
export async function getProject(id){const item=await getDoc(doc(db,"projects",id));return item.exists()?{id:item.id,...item.data()}:null}
// The public Firestore rule only permits published documents. Include that
// constraint in the query too, otherwise Firestore rejects it because a slug
// query could also return a draft or archived project. Older records may have
// been linked with their title (including spaces) before a normalized slug was
// saved, so retain a published-only title fallback for those URLs.
export async function getProjectBySlug(slug){
  const value=decodeURIComponent(String(slug));
  const bySlug=clean(await getDocs(query(collection(db,"projects"),where("slug","==",value),where("status","==","published"))));
  if(bySlug[0])return bySlug[0];
  const byTitle=clean(await getDocs(query(collection(db,"projects"),where("title","==",value),where("status","==","published"))));
  return byTitle[0]||null;
}
export function createProject(data){return addDoc(collection(db,"projects"),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp()})}
export function updateProject(id,data){return updateDoc(doc(db,"projects",id),{...data,updatedAt:serverTimestamp()})}
export function deleteProject(id){return deleteDoc(doc(db,"projects",id))}
