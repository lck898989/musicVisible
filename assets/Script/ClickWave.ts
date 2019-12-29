const {ccclass, property} = cc._decorator;
// 鼠标移动的时候进行水波的仿真
@ccclass
export default class ClickWave extends cc.Component {

    // 用于发送到shader中的uv偏转贴图
    private uvOffsetTexture: cc.Texture2D = null;
    // 相当于uv坐标中的u
    private waveA: number[][] = [];
    // 相当于uv坐标中的v
    private waveB: number[][] = [];
    private waveWidth: number;
    private waveHeight: number;


    onLoad () {
        this.waveWidth = this.node.width;
        this.waveHeight = this.node.height;
        this.initWaveABArray();
        console.log("waveA is ",this.waveA);
        console.log("waveB is ",this.waveB);

    }
    // 初始化wave波形数据默认是没有波形的所以数值为0.0的浮点数
    private initWaveABArray(): void {
        this.waveA = [];
        this.waveB = [];
        for(let i = 0; i < this.waveHeight; i++) {
            this.waveB[i] = [];
            this.waveA[i] = [];
            for(let j = 0; j < this.waveWidth; j++) {
                this.waveA[i][j] = 0.0;
                this.waveB[i][j] = 0.0;
            }
        }
    }
    start () {
        this.node.on("touchstart",this.touchBegin,this);
        this.node.on("touchmove",this.touchBegin,this);
        this.node.on("touchend",this.touchBegin,this);
    }
    private touchBegin(e: cc.Event.EventTouch): boolean {
        let localPoint = this.node.convertToNodeSpaceAR(e.getLocation());
        console.log(localPoint);
        return true;
        
    }
    private touchMove(e: cc.Event.EventTouch): void {
        let localPoint = this.node.convertToNodeSpaceAR(e.getLocation());
    }
    private touchEnd(e: cc.Event.EventTouch): void {
        let localPoint = this.node.convertToNodeSpaceAR(e.getLocation());

    }
    update (dt) {

    }
}
