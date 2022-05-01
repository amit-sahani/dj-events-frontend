import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

export default function EventPage({evt}){
   
    return (
        <Layout>
            <h1>{evt.name}</h1>
           
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