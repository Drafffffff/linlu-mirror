import Sketch from "react-p5";

export default function P5Auido() {

    const setup = (p5) => {
        const ele = p5.createAudio(require("/public/audio/count.mp3").default.src);
        ele.autoplay()
        ele.play()
    };

    return <Sketch setup={setup}/>;
};