// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    
    
    private noiseText: cc.Sprite;
    // LIFE-CYCLE CALLBACKS:
    private time: number = 0;
    // onLoad () {}
    private mat: cc.Material;
    private startSend: boolean = false;
    start () {
        // 获取材质
        this.noiseText = this.node.getComponent(cc.Sprite);
        this.mat = this.node.getComponent(cc.Sprite).sharedMaterials[0];
        let self = this;
        cc.loader.loadRes("noise",cc.SpriteFrame,(err: any,res: cc.SpriteFrame) => {
            self.noiseText.spriteFrame = res;
            self.mat.setProperty("noiseTex",self.noiseText.spriteFrame.getTexture());
            self.mat.setProperty("iResolution",cc.v2(self.node.width,self.node.height));
            this.startSend = true;
            
        })
    }

    update (dt) {
        let self = this;
        if(this.startSend) {
            this.time += dt;
            // 设置时间参数
            self.mat.setProperty("time",self.time);
        }
    }
}
