import {useEffect} from "react";
import {useRouter} from "next/router";

export default function OverTime() {
    const router = useRouter();
    useEffect(() => {
        console.log("createTimeout ")

        const timeOut = setTimeout(() => {
            router.push("/video")
        }, 900000)

        return () => {
            console.log("cleantimeout")
            clearTimeout(timeOut)
        }
    }, [])
    return null
}