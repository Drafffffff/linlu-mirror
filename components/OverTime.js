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
2
        client.subscribe("stretch", {qos: 0})
        client.on('message', (topic, message) => {
            console.log(topic, message.toString())
            if (topic === "stretch" && message.toString() === "0") {
                router.push("/stretch/index2")
            } else if (topic === "stretch" && message.toString() === "100") {
                router.push("/danger")
                console.log(message)
            } else if (topic === "stretch" && message.toString() === "111") {
                router.push("/")
            } else if (topic === "stretch" && message.toString() === "222") {
                router.push("/video")
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