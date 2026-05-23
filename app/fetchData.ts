// "use server"

// //let events: any[] = []
// export type Post = {
//     id: number
//     title: string
//     thumbnail: string
//     images: string[]
//     description: string
// }

// type PostResponse = {
//     products: Post[]
//     total: number
//     skip: number
//     limit: number
// }

// console.log("hello world")

// export async function fetchEvents(): Promise<PostResponse> {
//     // const events = await fetch("https://nobote-proj.onrender.com/event/list", https://dummyjson.com/products?limit=5", "https://dummyjson.com/products/${id}", {
//     const events = await fetch("https://dummyjson.com/products?limit=12", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//     return events.json()
// }

// export async function getEventById(id: number): Promise<Post> {
//      const events = await fetch(`https://dummyjson.com/products/${id}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//     return events.json().then((data) => data as Post)

//     // console.log(a, b)
//     // return b
// }