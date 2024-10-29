import {AlertCircle} from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


const AuthSuccess  = ({message}:{message:string | undefined}) => {
    if(!message) return ;
    return (
        <Alert variant="default" className="border-green-500 bg-green-100/20 text-green-500">
            <AlertCircle  className="h-4 w-4 border-green-500" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
                {
                    message
                }
            </AlertDescription>
        </Alert>
    )
}

export default  AuthSuccess;