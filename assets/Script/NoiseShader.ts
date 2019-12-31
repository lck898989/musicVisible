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

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    
    private noiseText: cc.Sprite;
    // LIFE-CYCLE CALLBACKS:
    private time: number = 0;
    // onLoad () {}
    private mat: cc.Material;
    start () {
        // 获取材质

        this.mat = this.node.getComponent(cc.Sprite).sharedMaterials[0];
        cc.loader.loadRes("noise",cc.SpriteFrame,(err: any,res: cc.SpriteFrame) => {
            this.noiseText.spriteFrame = res;
            this.mat.setProperty("noiseTex",this.noiseText.spriteFrame.getTexture());
            this.mat.setProperty("iResolution",cc.v2(this.node.width,this.node.height));
            // 设置时间参数
            this.mat.setProperty("time",this.time);
        })
    }

    update (dt) {
        this.time += dt;
    }
}
