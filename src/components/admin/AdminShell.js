"use client";
import "./admin.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { doc,getDoc } from "firebase/firestore";
import { auth,db } from "../../lib/firebase/config";
let cachedAccess="checking";
export default function AdminShell({children}){const [state,setState]=useState(cachedAccess);useEffect(()=>{if(!auth){cachedAccess="missing";setState("missing");return;}const unsubscribe=auth.onAuthStateChanged(async user=>{if(!user){cachedAccess="login";setState("login");return;}try{const profile=await getDoc(doc(db,"users",user.uid));const access=profile.data()?.role==="admin"?"ok":"denied";cachedAccess=access;setState(access);}catch{cachedAccess="denied";setState("denied");}});return unsubscribe;},[]);if(state!=="ok")return <main className="admin-gate"><h1>{state==="checking"?"Checking access…":state==="missing"?"Firebase needs configuration":"Admin access required"}</h1><p>{state==="missing"?"Add Firebase values to .env.local before using the dashboard.":state==="login"?"Please sign in with an approved administrator account.":state==="denied"?"Your Firebase rules or admin role do not allow access.":""}</p><Link className="primary" href="/admin/login">Go to login</Link></main>;return <div className="admin-layout"><aside><Link className="logo" href="/">MG<span>.</span></Link><p>ADMIN PANEL</p><Link href="/admin">Dashboard</Link><Link href="/admin/projects">Projects</Link><Link href="/admin/projects/create">Add project</Link><Link href="/admin/messages">Messages</Link><button onClick={()=>{cachedAccess="login";signOut(auth)}}>Log out</button></aside><div className="admin-main">{children}</div></div>}
