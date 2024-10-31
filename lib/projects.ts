import { StaticImageData } from "next/legacy/image"
import gazetteer from '../public/gazetteer.png'
import nextjs_port from '../public/nextjs-port.png'
import company_dirt from '../public/companyDirectory.png'

export interface Project {
  title: string
  subtitle: string
  image: StaticImageData
  url: string  
}

export const projects: Project[] = [
  {
    title: "gazetteer",
    subtitle: "Web App",
    image: gazetteer,
    url: "/gazetteer"  
  },
  {
    title: "company directory",
    subtitle: "Web App",
    image: company_dirt,
    url: "/company-directory"  
  },
  {
    title: "portfolio",
    subtitle: "next.js",
    image: nextjs_port,
    url: "/portfolio"  
  },
]