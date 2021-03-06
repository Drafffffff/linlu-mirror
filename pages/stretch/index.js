import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/stretch.module.scss'
import TopBar from "../../components/topbar";
import {mqttConnect} from "../../components/utils";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import mqtt from "mqtt";
import OverTime from "../../components/OverTime";

export default function Home() {
    const [state, setState] = useState("0")
    const router = useRouter()
    const [c, setc] = useState(2);
    useEffect(() => {
        // const client = mqttConnect();
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
        client.on('reconnect', (error) => {
            // console.log('正在重连')
        })

        client.on('error', (error) => {
            console.log('连接失败:', error)
        })
        client.subscribe("stretch", {qos: 0})
        client.on('message', (topic, message) => {
            console.log(topic, message.toString())
            if (topic === "stretch" && message.toString() === "0") {
                setState("1")
                setTimeout(() => {
                    router.push("/stretch/info")
                }, 3000)
                client.end()
            }
        })


        return () => {
            client.end()
        }
    }, [])
    return (
        <div className={styles.container}>
            <Head>
                <title>漾</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <TopBar title={"漾-Stretch"}/>
            <div className={styles.connect} onClick={() => {
                setc(c + 1)
                if (c > 5) {
                    router.push("/stretch/info")
                }
            }}>
                {imgDisp(state)}
            </div>
            <OverTime/>

        </div>
    )
}

function imgDisp(a) {
    if (a === "0") {
        return <Image src={require("../../public/img/stretch/connect.png")} alt={"connnect1"}
        />
    } else if (a === "1") {
        return <Image src={require("../../public/img/stretch/connect3.png")} alt={"connect1"}
        />
    }
}