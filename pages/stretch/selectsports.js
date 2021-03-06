import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/stretch.module.scss'
import TopBar from "../../components/topbar";
import {useRouter} from "next/router";
import OverTime from "../../components/OverTime";

// import {getLunar} from "../components/utils";

export default function Home() {
    const router = useRouter()
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
            <div className={styles.selectSport}>
                <Image src={require("/public/img/stretch/info/selectsport.png")} alt={"infoimg"}/>
            </div>
            <div className={styles.sportbtn} onClick={() => {
                router.push("/stretch/start")
            }}/>
            <OverTime/>

        </div>
    )
}
