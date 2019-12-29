const {ccclass, property} = cc._decorator;

@ccclass
export default class Index extends cc.Component {

    

    start () {
        // init logic
    }
    clickEvent(e: cc.Event,data: any) {
        switch(data) {
            case "next":
                cc.director.loadScene("music");
                break;
        }
    }
}
