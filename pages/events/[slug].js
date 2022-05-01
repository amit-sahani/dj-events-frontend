import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from '@/styles//Event.module.css'
import Link from "next/link"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Image from "next/image"

export default function EventPage({evt}){

    const deleteEvent = (e) => {
        console.log('delete')
    }
   
    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`} >
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete}
                    onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>
                <span>
                {evt.date} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image} width={960} height={600} alt='event'/>
                    </div>
                )}
                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>

                <Link href='/events'>
                    <a className={styles.back}>{'<'} Go Back to Events</a>
                </Link>
                
            </div>
            
        </Layout>
    )
}


//Below example is not the correct way of using getStaticProps and getStaticPaths because the nextjs's api is not present at build time
// Due to this build will fail
// So instead of calling next's api we can directly call external api inside these functions
// or we can use static data
// or we can write aur server code inside it (like querying DB)

export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()
    const paths  = events.map(evt=>({params: {slug: evt.slug}}))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params:{slug}}){
    const res = await fetch(`${API_URL}/api/events/${slug}`)
    const events = await res.json()

    return {
        props:{evt:events[0]},
        revalidate: 1
    }
}


// Below code is for server side rendering (dynamic routing)
// Page for every event gets generated at server side for each request
// export async function getServerSideProps({query:{slug}}){
//     const res = await fetch(`${API_URL}/api/events/${slug}`)
//     const events = await res.json()

//     return {
//         props:{evt:events[0]}
//     }
// }