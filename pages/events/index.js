import Link from "next/link"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import EventItem from "@/components/EventItem"

export default function Events({events}) {
  
  return (
    <Layout>
     <h1>Upcoming Events</h1>
     {/* <Link href="/about">About</Link> */}
     {events.length===0&&<h3>No events to show.</h3>}
     {events.map(evt=>(
       <EventItem key={evt.id} evt={evt}></EventItem>
     ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events =  await res.json()

  return {
    props: {events:events.slice(0,3)},
    revalidate: 1
  }
}