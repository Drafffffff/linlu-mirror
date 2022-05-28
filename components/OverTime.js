import {useEffect} from "react";
import {useRouter} from "next/router";
import mqtt from "mqtt";

export default function OverTime() {
    const router = useRouter();
    useEffect(() => {
        console.log("createTimeout ")
        const options = {
            // Clean session
            clean: true,
            clientId: 'emqx_test',
            username: 'admin',
            password: 'pubilc',
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
        }
        const client = mqtt.connect('ws://127.0.0.1:8083/mqtt', options)

        const timeOut = setTimeout(() => {
            router.push("/video")
        }, 900000)

        client.subscribe("stretch", {qos: 0})
        client.on('message', (topic, message) => {
            console.log(topic, message.toString())
            if (topic === "stretch" && message.toString() === "0") {
                router.push("/stretch/info")
            } else if (topic === "stretch" && message.toString() === "100") {
                router.push("/danger")
            } else if (topic === "stretch" && message.toString() === "111") {
                router.push("/")
            }
        })


        return () => {
            console.log("cleantimeout")
            clearTimeout(timeOut)
            client.end()
        }
    }, [])
    return null
}