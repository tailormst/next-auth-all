export default function UserProfile({params}: any){
    return(
        <>
            <h1>Hello Profile Page</h1>
            <h1>Welcome : {params.id} </h1>
        </>
    )
}