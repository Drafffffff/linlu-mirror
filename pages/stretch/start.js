import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/stretch.module.scss'
import TopBar from "../../components/topbar";
import {useRouter} from "next/router";
import {gsap} from "gsap";
import {useEffect, useRef, useState} from "react";
// import {getLunar} from "../components/utils";

export default function Home() {
    const router = useRouter()
    const [countdown, setcountdown] = useState(3)
    const timeRef = useRef()
    timeRef.current = setInterval(() => {
        if (countdown === 0) {
            clearInterval(timeRef.current);
        } else {
            const a = countdown - 1
            setcountdown(a)
        }
    }, 1000)
    useEffect(() => {
        if (countdown === 0) {
            router.push("/stretch/game")

        }
    }, [countdown])
    return (
        <div className={styles.container}>
            <Head>
                <title>漾</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"/>
            </Head>
            <TopBar title={"S-SRETCHER"}/>
            <div className={styles.readyimg}>
                <Image src={require("/public/img/stretch/ready.png")} alt={"infoimg"}/>
            </div>
            <div className={styles.countdown}>
                {countdown}
            </div>

        </div>
    )
}