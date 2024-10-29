import {AlertCircle} from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

const AuthError = ({message}: { message: string | undefined }) => {
    if(!message) return ;
    return (
        <Alert variant="destructive" className='bg-red-100/20'>
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {
                    message
                }
            </AlertDescription>
        </Alert>
    )
}

export default AuthError;