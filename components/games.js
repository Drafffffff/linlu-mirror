import Sketch from "react-p5";
import {useEffect} from "react";
import mqtt from "mqtt";

let t = 0;
let noiseMax = 0.3;
let tr = 200;
let sr = 200;
let er = 400;
let mr = 300;
let transflag = 0;
export default ({addone}) => {

    useEffect(() => {
        // const client = mqttConnect();
        const options = {
            // Clean session
            clean: true,
            clientId: 'stretch',
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
            if (topic === "stretch" && message.toString() === "1") {
                transflag = 1;
            } else if (topic === "stretch" && message.toString() === "2") {
                transflag = 2;
            } else if (topic === "stretch" && message.toString() === "3") {
                transflag = 3;
                addone();
            }
        })
        return ()=>{
            client.end()
        }
    }, [])
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(984, 984).parent(canvasParentRef);
    };

    const draw = (p5) => {
        p5.translate(p5.width / 2, p5.height / 2);
        p5.background(0)
        p5.stroke('#fff');
        p5.strokeWeight(3);
        p5.noFill();
        p5.beginShape();
        if (transflag === 1) {
            sr += (tr - sr) * 0.05
            if (p5.abs(tr - sr) < 0.0001) {
                transflag = 0;
            }
        } else if (transflag === 2) {

            sr += (mr - sr) * 0.2
            if (p5.abs(mr - sr) < 0.0001) {
                transflag = -1;
            }
        } else if (transflag === 3) {

            sr += (er - sr) * 0.2
            if (p5.abs(er - sr) < 0.0001) {
                transflag = -1;
            }
        }
        for (let a = 0; a < p5.TWO_PI; a += 0.01) {
            let xoff = p5.map(p5.cos(a + t), -1, 1, 0, noiseMax);
            let yoff = p5.map(p5.sin(a + t), -1, 1, 0, noiseMax);
            let zoff = 300 + t;
            const r = p5.map(p5.noise(xoff, yoff, zoff), 0, 1, sr / 3 - 50, sr / 3 + 50);
            let x = r * p5.cos(a);
            let y = r * p5.sin(a);
            p5.vertex(x, y);
        }
        p5.endShape(p5.CLOSE);

        p5.beginShape();
        for (let a = 0; a < p5.TWO_PI; a += 0.01) {
            let xoff = p5.map(p5.cos(a + t) + 100, -1, 1, 0, noiseMax);
            let yoff = p5.map(p5.sin(a + t) + 100, -1, 1, 0, noiseMax);
            let zoff = 300 + t;
            const r = p5.map(p5.noise(xoff, yoff, zoff), 0, 1, sr - 50, sr + 50);
            let x = r * p5.cos(a);
            let y = r * p5.sin(a);
            p5.vertex(x, y);
        }
        p5.endShape(p5.CLOSE);
        t += 0.006;
    };
    const mouseClicked = (p5) => {
        transflag = 1;
    }

    return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} style={{marginTop: "8rem"}}/>;
};