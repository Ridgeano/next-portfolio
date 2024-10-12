import { StaticImageData } from "next/image"
import gazetteer from '../public/gazetteer.png'
import nextjs_port from '../public/nextjs-port.png'
import company_dirt from '../public/companyDirectory.png'

export interface Project {
  title: string
  subtitle: string
  image: StaticImageData
}

export const projects: Project[] = [
  {
    title: "gazetteer",
    subtitle: "Web App",
    image: gazetteer
  },
  {
    title: "company directory",
    subtitle: "Web App",
    image: company_dirt
  },
  {
    title: "portfolio",
    subtitle: "next.js",
    image: nextjs_port
  },
]