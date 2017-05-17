cc.Class({
    extends: cc.Component,

    properties: {
        avatar: cc.Sprite,
        nickname: cc.Label,
        money: cc.Label,
        notice: cc.Node,
        userInfoPrefab: cc.Prefab,
        payOptionsPrefab: cc.Prefab,
        gameRecordPrefab: cc.Prefab,
        settingPrefab: cc.Prefab,
        gameRulesPrefab: cc.Prefab,
        createRoomPrefab: cc.Prefab,
        inputRoomNumberPrefab: cc.Prefab,
        myRoomPrefab: cc.Prefab,
    },

    // use this for initialization
    onLoad() {
        this._userInfo = Tools.getLocalData(GlobalConfig.LSK.userInfo);
        Tools.setWebImage(this.avatar, this._userInfo.headimgurl);
        this.nickname.string = this._userInfo.nickname;
        this.money.string = this._userInfo.gold;
        this.notice.getComponent(cc.Label).string = this._userInfo.notice;
        Animation.openScrollWordAction(this.notice, 50);
    },

    /**
     * 查看用户信息
     */
    openUserInfoPanelOnClick() {
        window.SoundEffect.playEffect(GlobalConfig.audioUrl.effect.buttonClick);
        GlobalConfig.tempCache = Tools.getLocalData(GlobalConfig.LSK.userInfo);
        Animation.openDialog(cc.instantiate(this.userInfoPrefab), this.node, () => {
            cc.log('load success');
        });
    },

    /**
     * 弹出充值信息
     */
    openPayPanelOnClick() {
        var appleReview = window.Tools.getLocalData(GlobalConfig.LSK.appleReview);
        if (!appleReview) {
            window.SoundEffect.playEffect(GlobalConfig.audioUrl.effect.buttonClick);
            Dialog.openMessageBox('请到 ' + GlobalConfig.wxPublic + ' 公众号进行充值');
        }
    },

    /**
     * 游戏记录
     */
    openGameRecordPanelOnClick() {
        window.SoundEffect.playEffect(GlobalConfig.audioUrl.effect.buttonClick);
        // var gameRecordPrefab = this.gameRecordPrefab.getComponent('GameRecordPrefab');
        // gameRecordPrefab.init();
        Animation.openDialog(cc.instantiate(this.gameRecordPrefab), this.node, () => {
            cc.log('load success');
        });
    },

    /**
     * 声音选项
     */
    openSoundPanelOnClick() {
        window.SoundEffect.playEffect(GlobalConfig.audioUrl.effect.buttonClick);
        Animation.openDialog(cc.instantiate(this.settingPrefab), this.node, () => {
            cc.log('load success');
        });
    },

    /**
     * 游戏规则
     */
    openGameRulesPanelOnClick() {
        window.SoundEffect.playEffect(GlobalConfig.audioUrl.effect.buttonClick);
        Animation.openDialog(cc.instantiate(this.gameRulesPrefab), this.node, () => {
            cc.log('load success');
        });
    },

    /**
     * 创建游戏房间
     */
    openCreateRoomPanelOnClick() {
        window.SoundEffect.playEffect(GlobalConfig.audioUrl.effect.buttonClick);
        Animation.openDialog(cc.instantiate(this.createRoomPrefab), this.node, () => {
            cc.log('load success');
        });
    },

    /**
     * 加入游戏房间
     */
    openAddGamePanelOnClick() {
        window.SoundEffect.playEffect(GlobalConfig.audioUrl.effect.buttonClick);
        const node = cc.instantiate(this.inputRoomNumberPrefab);
        node.getComponent('RoomNumberInputBox').init('Lobby');
        Animation.openDialog(node, this.node, () => {
            cc.log('load success');
        });
    },

    /**
     * 我的游戏房间
     */
    openMyRoomPanelOnClick() {
        window.SoundEffect.playEffect(GlobalConfig.audioUrl.effect.buttonClick);
        // cc.director.loadScene('MyRoom');
        Animation.openDialog(cc.instantiate(this.myRoomPrefab), this.node, () => {
            cc.log('load success');
        });
    },

});
