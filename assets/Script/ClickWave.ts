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

    @property(cc.Node)
    targetSpriteNode: cc.Node = null;
    @property(cc.Node)
    spriteNode: cc.Node = null;
    private time: number = 0;
    private material: cc.Material;        
    onLoad () {
        
        
    }
    // 初始化wave波形数据默认是没有波形的所以数值为0.0的浮点数
    private initWaveABArray(): void {
        this.waveA = [];
        this.waveB = [];
        for(let i = 0; i < this.waveHeight; i++) {
            this.waveB[i] = [];
            this.waveA[i] = [];
            for(let j = 0; j < this.waveWidth; j++) {
                this.waveA[i][j] = 0.8;
                this.waveB[i][j] = 0.0;
            }
        }
    }
    private initWaveA(): void {
        
    }
    start () {
        // 鼠标点击时间改变waveA的数据
        this.node.on("touchstart",this.touchBegin,this);
        this.node.on("touchmove",this.touchBegin,this);
        this.node.on("touchend",this.touchBegin,this);
        // this.calculateWave();
        this.material = this.spriteNode.getComponent(cc.Sprite).sharedMaterials[0];
        // 图片存储数据
        this.wa = new Uint8Array(this.waveWidth * this.waveHeight * 4);
        // console.log("wa is ",this.wa);
        this.uvOffsetTexture = new cc.Texture2D();

        this.waveWidth = this.node.width;
        this.waveHeight = this.node.height;
        // 模拟波形，投掷一个石头激起的波形示例
        this.initWaveABArray();
        this.initWaveA();
        this.initTextureDate();

    }
    private initTextureDate(): void {
        for(let i = 0; i < this.waveHeight * this.waveWidth * 4; i += 4) {
            this.wa[i] = 150;
            this.wa[i + 1] = 200;
            this.wa[i + 2] = 180;
            this.wa[i + 3] = 255; 
        }
        this.uvOffsetTexture.initWithData(this.wa ,cc.Texture2D.PixelFormat.RGBA8888,this.waveWidth,this.waveHeight);
        if(this.material) {
           this.material.setProperty("wave",cc.v2(0.5,0.5));
        }
        
    }
    private touchBegin(e: cc.Event.EventTouch): boolean {
        let localPoint: cc.Vec2 = this.node.convertToNodeSpaceAR(e.getLocation());
        localPoint.x += this.node.width / 2;
        localPoint.y += (-this.node.height / 2);
        localPoint.x = Math.abs(localPoint.x) / this.node.width;
        localPoint.y = Math.abs(localPoint.y) / this.node.height;

        console.log(localPoint);
        if(this.material) {
            this.material.setProperty("wave",localPoint);
        }
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
                this.waveB[i][j] = (this.waveA[i-1][j-1] + this.waveA[i-1][j] + this.waveA[i-1][j+1] + this.waveA[i][j-1]+
                                    this.waveA[i][j + 1] + this.waveA[i+1][j-1] + this.waveA[i+1][j] + this.waveA[i+1][j+1]) / 4 - this.waveB[i][j];
                // this.uvOffsetTexture.initWithData(this.waveB,)
                if(this.waveB[i][j] > 1) {
                    this.waveB[i][j] = 1;
                }
                if(this.waveB[i][j] < -1) {
                    this.waveB[i][j] = -1;
                }
                // 左右偏移纹理数值
                let offsetU: number = (this.waveB[i-1][j]-this.waveB[i-1][j+1]) / 2;
                let m = i * j * 4;
                // 上下偏移纹理
                let offsetV: number = (this.waveB[i-1][j]-this.waveB[i+1][j]) / 2;
                console.log("offsetU is ",offsetU);
                console.log("offsetV is ",offsetV);
                this.wa[m] = Math.floor(offsetU * 255);
                this.wa[m + 1] = Math.floor(offsetV * 255);
                this.wa[m + 2] = 255;
                this.wa[m + 3] = 255;

                // 设置uv偏移纹理
                this.uvOffsetTexture.initWithData(this.wa,cc.Texture2D.PixelFormat.RGBA8888,this.waveWidth,this.waveHeight);
                // 衰减uv值
                this.waveB[i][j] -= 0.03 * this.waveB[i][j];

                this.material.setProperty("uvoffsetTex",this.uvOffsetTexture);
            }
        }
        

    }
    update (dt) {
        this.time += dt;
        // this.calculateWave();
        if(this.material && this.uvOffsetTexture) {
            this.material.setProperty("uvoffsetTex",this.uvOffsetTexture);
        }
        if(this.material) {
            this.material.setProperty("time",this.time);
        }
    }
}
