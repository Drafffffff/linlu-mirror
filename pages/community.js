import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/community.module.scss'
import {getLunar} from "../components/utils";
import TopBar from "../components/topbar";

export default function Home() {

    return (
        <div className={styles.container}>
            <Head>
                <title>漾</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"/>
            </Head>
            <TopBar title={"社区服务"}/>
            <div className={styles.pos}>
                <Image src={require("../public/img/community/pos.png")} alt={"pos"}/>
            </div>
            <div className={styles.frends}>
                <Image src={require("../public/img/community/frends.png")} alt={"frends"}/>
            </div>
            <div className={styles.news}>
                <Image src={require("../public/img/community/news.png")} alt={"news"}/>
            </div>
        </div>
    )
}
