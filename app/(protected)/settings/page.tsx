import {auth, signOut} from "@/auth";


const SettingsPage = async () => {
    const  session = await auth()

    return (
        <div>
            <h1>{JSON.stringify(session?.user)}</h1>
            <form action={async ()=> {
                'use server'
                await signOut()
            }}>
                <button type='submit'>Sign OUt</button>
            </form>
        </div>
    )
}

export default  SettingsPage;