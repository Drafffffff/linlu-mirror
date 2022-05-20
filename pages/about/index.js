import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/community.module.scss'

export default function Home() {

    return (
        <div className={styles.container}>
            <Head>
                <title>漾</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"/>
            </Head>
        </div>
    )
}
