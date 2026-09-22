"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowLeft,ExternalLink,Code2 } from "lucide-react";
import { getProjectBySlug } from "../../../services/projectService";

export default function Detail({params}){
 const [project,setProject]=useState(undefined);

 useEffect(()=>{
  let active=true;
  Promise.resolve(params)
   .then(({slug})=>getProjectBySlug(slug))
   .then(result=>{if(active)setProject(result)})
   .catch(()=>{if(active)setProject(null)});
  return ()=>{active=false};
 },[params]);

 if(project===undefined)return <main className="detail"><Link href="/#projects">← Back to projects</Link><p>Loading project…</p></main>;
 if(!project)return <main className="detail"><Link href="/#projects">← Back to projects</Link><h1>Project not found</h1><p>This project may be unavailable or no longer published.</p></main>;

 return <main className="detail"><Link href="/#projects"><ArrowLeft size={16}/> Back to projects</Link><p className="eyebrow">Case study</p><h1>{project.title}</h1><p>{project.description||project.shortDescription}</p><div>{project.technologies?.map(x=><span key={x} className="tag">{x}</span>)}</div><div className="actions">{project.liveUrl&&<a className="primary" href={project.liveUrl}>Live demo <ExternalLink size={15}/></a>}{project.githubUrl&&<a className="secondary" href={project.githubUrl}><Code2 size={15}/> Source</a>}</div></main>
}
