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
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    spriteNode: cc.Node = null;
    // onLoad () {}
    private spriteComponent: cc.Sprite;
    private mat: cc.Material;
    private time: number = 0;
    start () {
        this.spriteComponent = this.spriteNode.getComponent(cc.Sprite);

    }

    update (dt) {
        this.time += dt;
        this.mat = this.spriteComponent.sharedMaterials[0];
        this.mat.setProperty("iResolution",cc.v2(960,640));
        this.mat.setProperty("time",this.time);
        // this.mat.setProperty("tex",);
    }
}
