import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase/config";
export async function uploadProjectImage(file,projectId){if(!file||!/^image\/(webp|jpeg|png)$/.test(file.type)||file.size>5*1024*1024)throw new Error("Use a JPG, PNG, or WebP under 5MB.");const path=`projects/${projectId}/${Date.now()}-${file.name}`;const upload=await uploadBytes(ref(storage,path),file);return {imageUrl:await getDownloadURL(upload.ref),imagePath:path}}
export function removeProjectImage(path){return path?deleteObject(ref(storage,path)):Promise.resolve()}
