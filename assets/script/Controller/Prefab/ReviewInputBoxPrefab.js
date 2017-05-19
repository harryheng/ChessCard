cc.Class({
    extends: cc.Component,

    properties: {
        number: [cc.Label],
    },

    onLoad: function() {
        this.roomNumber = '';
    },

    init(fromScene) {
        this.fromScene = fromScene;
    },

    numberButtonOnClick(evt, data) {
        window.SoundEffect.playEffect(window.PX258Config.audioUrl.effect.buttonClick);
        if (this.roomNumber.length !== 6) {
            this.roomNumber += data;
            this.number[this.roomNumber.length - 1].string = data;
        }

        if (this.roomNumber.length === 6) {
            if (this.fromScene === 'Lobby') {
                this._getHttpRoomEnterData();
            }
            else if (this.fromScene === 'GameRecordList') {
                var parentNode = cc.director.getScene().getChildByName('Canvas');
                var node = cc.instantiate(this.gameRecordStep);
                node.getComponent('GameRecordStepPrefab').init(this.roomId);
                Animation.openDialog(node, parentNode, () => {
                    cc.log('downloader success');
                });
            }
        }
    },

    clearNumberOnClick() {
        window.SoundEffect.playEffect(window.PX258Config.audioUrl.effect.buttonClick);
        if (this.roomNumber.length !== 0) {
            for (let i = 0; i < this.number.length; i += 1) {
                this.number[i].string = '';
            }
            this.roomNumber = '';
        }
    },

    deleteNumberOnClick() {
        window.SoundEffect.playEffect(window.PX258Config.audioUrl.effect.buttonClick);
        cc.log(this.roomNumber);
        if (this.roomNumber.length !== 0) {
            this.number[this.roomNumber.length - 1].string = '';
            this.roomNumber = this.roomNumber.substr(0, this.roomNumber.length - 1);
        }
    },

    /**
     * 关闭本窗口
     */
    closeOnClick() {
        window.SoundEffect.playEffect(window.PX258Config.audioUrl.effect.buttonClick);
        Animation.closeDialog(this.node);
    },

    _getHttpRoomEnterData() {
        window.Dialog.openLoading();

        const parameters = { roomId: this.roomNumber };
        HttpRequestManager.httpRequest('roomEnter', parameters, (event, result) => {
            window.Dialog.close();

            if (result.code === 1) {
                window.Dialog.close();
                GlobalConfig.tempCache = result;
                cc.director.loadScene('GameRoom');
            }
            else if (result.code === 1041) {
                window.Dialog.openMessageBox('房间号不存在', function() {
                    cc.log('window.Dialog.openMessageBox.callback');
                });
            }
        });
    },
});
