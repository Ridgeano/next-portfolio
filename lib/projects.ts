import { StaticImageData } from "next/image"
import gazetteer from '../public/gazetteer.png'
import nextjs_port from '../public/nextjs-port.png'
import company_dirt from '../public/companyDirectory.png'

export interface Project {
  title: string
  subtitle: string
  image: StaticImageData
  url: string  // Added url property to the interface
}

export const projects: Project[] = [
  {
    title: "gazetteer",
    subtitle: "Web App",
    image: gazetteer,
    url: "/gazetteer"  // Replace with actual project URL
  },
  {
    title: "company directory",
    subtitle: "Web App",
    image: company_dirt,
    url: "/company-directory"  // Replace with actual project URL
  },
  {
    title: "portfolio",
    subtitle: "next.js",
    image: nextjs_port,
    url: "/portfolio"  // Replace with actual project URL
  },
]