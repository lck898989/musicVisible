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
    private wa: Uint8Array;
    private waveWidth: number;
    private waveHeight: number;


    onLoad () {
        this.waveWidth = this.node.width;
        this.waveHeight = this.node.height;
        this.initWaveABArray();
        this.wa = new Uint8Array(this.waveHeight);
        // console.log("wa is ",this.wa);
        this.uvOffsetTexture = new cc.Texture2D();
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
        // 鼠标点击时间改变waveA的数据
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
    // 计算波形
    private calculateWave(): void {
        for(let i = 1; i < this.waveHeight - 1; i++) {
            for(let j = 1; j < this.waveWidth - 1; j++) {
                this.waveB[i][j] = (this.waveA[i-1][j-1] + this.waveA[i-1][j] + this.waveA[i-1][j+1] + this[i][j-1]+
                                    this.waveA[i][j + 1] + this.waveA[i+1][j-1] + this.waveA[i+1][j] + this.waveA[i+1][j+1]) / 4 - this.waveB[i][j];
                // this.uvOffsetTexture.initWithData(this.waveB,)
            }
        }
        // 衰减uv值
        

    }
    update (dt) {
        this.calculateWave();
    }
}
