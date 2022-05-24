import styles from "./topbar.module.scss"
import Image from "next/image"
import {useRouter} from 'next/router'

export default function TopBar({title}) {
    const router = useRouter()
    return (
        <div className={styles.topbar}>
            <div className={styles.left} >
                <Image src={require("../public/back.png")} alt={"back"} width={92} height={92}/>
            </div>
            <div className={styles.return}  onClick={ ()=>{
                router.back()
            }}/>
            <div className={styles.mid}>
                {title}
            </div>
        </div>
    )
}