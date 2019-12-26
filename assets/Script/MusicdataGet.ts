const {ccclass, property} = cc._decorator;

@ccclass
export default class MusicdataGet extends cc.Component {

    @property({type: cc.AudioClip})
    audio: cc.AudioClip = null;
    @property(cc.Node)
    musicTex: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    private audioSource: AudioBufferSourceNode;
    private analyserNode: AnalyserNode;
    private audioContext: AudioContext;
    private backgroundSoundBuffer: Uint8Array;
    // onLoad () {}
    private audioGainNode: GainNode;

    private isCanPlay: boolean = false;

    private musicTexture: cc.Texture2D = null;
    private bg: cc.Node = null;
    start() {
        console.log("this.audio is ",this.audio);
        this.bg = this.node.getChildByName("bg");

    }
    play () {
        if(!this.audio) {
            return;
        }
        if(window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"] || window["msAudioContext"]) {
            if(window["AudioContext"]) {
                this.audioContext = new window.AudioContext();
                
            } else if(window["webkitAudioContext"]) {
                this.audioContext = new window["webkitAudioContext"]();
            } else if(window["mozAudioContext"]) {
                this.audioContext = new window["mozAudioContext"]();
            } else if(window["msAudioContext"]) {
                this.audioContext = new window["msAudioContext"]();
            }
            console.log("audioContext is ",this.audioContext);
            this.musicTexture = new cc.Texture2D();
            // 创建buffersourceNode
            this.audioSource = this.audioContext.createBufferSource();
            // 创建一个分析器
            this.analyserNode = this.audioContext.createAnalyser();
            this.analyserNode.fftSize = 1024;
            // this.analyserNode.getByteFrequencyData();
            // 创建一个音频放大器
            this.audioGainNode = this.audioContext.createGain();
            console.log("analyserNode is ",this.analyserNode);
            console.log("audioSource is ",this.audioSource);
            this.audioSource.loop = true;
            this.audioSource.buffer = this.audio["_audio"];
            this.audioSource.onended = () => {
                console.log("音乐播放完毕");
            }
            if(this.isCanPlay) {
                this.audioSource.start();
            }
            // 音频数据----> 分析解析器 ----> 放大器 ----> 物理设备播放
            this.audioSource.connect(this.analyserNode);
            this.analyserNode.connect(this.audioGainNode);
            this.audioGainNode.connect(this.audioContext.destination);
            // 每30毫秒获取一次数据
            let time = 0;
            setInterval(() => {
                time += 10;
                if(!this.backgroundSoundBuffer) {
                    this.backgroundSoundBuffer = new Uint8Array(this.analyserNode.frequencyBinCount);
                }
                // let buffer: Uint8Array = new Uint8Array(this.analyserNode.frequencyBinCount);
                // 获取音频数据
                this.analyserNode.getByteFrequencyData(this.backgroundSoundBuffer);
                console.log("音域信息是：",this.backgroundSoundBuffer);
                // 跟新texture
                let initSuccess: boolean = this.musicTexture.initWithData(this.backgroundSoundBuffer,cc.Texture2D.PixelFormat.RGBA8888,this.backgroundSoundBuffer.length / 4,1);
                // let spriteF: cc.SpriteFrame = new cc.SpriteFrame();
                // spriteF.setTexture(this.musicTexture);
                // this.musicTex.getComponent(cc.Sprite).spriteFrame = spriteF;
                console.log("initSuccess is ",initSuccess);
                // this.musicTexture.update();
                if(initSuccess) {
                    console.log("tex is ",this.musicTexture);
                    // 设置shader 
                    let m = this.bg.getComponent(cc.Sprite).sharedMaterials[0];
                    console.log("m is ",m);
                    m.setProperty("tex",this.musicTexture);
                    m.setProperty("time",time);
                    m.setProperty("iResolution",cc.v2(750,1334));
                }
                // let m = this.musicTex.getComponent(cc.Sprite).getMaterial(0);
                // m.setProperty("texture",this.musicTexture);
            },30);

        } else {
            console.log("不支持音频播放");
            console.log("AudioContext is ",AudioContext);
            console.log("---> ");
        }
    }
    btnEvent(e: cc.Event,data: any): void {
        switch(data) {
            case "play":
                // cc.audioEngine.play();
                this.isCanPlay = true;
                this.play();
                break;
        }
    }
    update (dt) {

    }
}
