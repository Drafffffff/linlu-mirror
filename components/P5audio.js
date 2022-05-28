import Sketch from "react-p5";

export default function P5Auido() {

    const setup = (p5, canvasParentRef) => {
        const ele = p5.createAudio(require("/public/audio/count.mp3").default.src);

        ele.autoplay(true);
    };

    return <Sketch setup={setup}/>;
};