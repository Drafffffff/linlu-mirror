import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/login.module.scss'
import {useRouter} from "next/router";
import OverTime from "../../components/OverTime";


export default function Home() {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <Head>
                <title>漾</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"/>
            </Head>
            <div className={styles.wifiSelect} onClick={()=>{
                router.push("/login/submit")
            }}>
                <Image src={require("/public/img/login/personality.png")} alt={"wifi"}/>
            </div>
            <OverTime/>

        </div>
    )
}
