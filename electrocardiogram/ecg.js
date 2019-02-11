var ECG = (function () {
    function drawgrid(ctx, width, height) {
        var D = 25;         //一整大格的宽度
        var C = 25;         //一整大格的高度
        var x = 0;          //当前横坐标
        var y = 0;          //当前纵坐标
        var W = width;      //整个Canvas的宽度
        var H = height;     //整个Canvas的高度
        var F = D / 5;      //分每个大格分成5份

        ctx.strokeStyle = "#ffbebe";
        ctx.lineWidth = 2;
        //顶部横线
        ctx.moveTo(x, y);
        ctx.lineTo(W, y);

        //画粗横线
        while (y < H) {
            y = y + C;
            ctx.moveTo(x, y - 1);
            ctx.lineTo(W, y - 1);
        }

        //画左边纵线
        y = 0;
        ctx.moveTo(x, y);
        ctx.lineTo(x, H);
        ctx.stroke();

        //画粗纵线
        while (x < W) {
            x = x + D;
            ctx.moveTo(x - 1, y);
            ctx.lineTo(x - 1, H);
        }

        //换成细线
        ctx.lineWidth = 1;

        //画细横线
        x = 0;
        y = 0;
        while (y < H) {
            for (var A = 0; A < 4; A++) {
                y = y + F;
                ctx.moveTo(x, y - 0.5);
                ctx.lineTo(W, y - 0.5);
            }
        }

        //画细纵线
        x = 0;
        y = 0;
        while (x < W) {
            for (var A = 0; A < 4; A++) {
                x = x + F;
                ctx.moveTo(x - 0.5, y);
                ctx.lineTo(x - 0.5, H);
            }
        }

        //画到画布上
        ctx.stroke();
    }

    //测试入口
    function UT_test() {
        document.body.appendChild(this.GetDom());
        drawgrid(this.GetBGCTX(), this.W, this.H);

    }


    return function (width, height) {
        if (!width || !height) console.warn("创建ECG对象需要指定画布尺寸，如new ECG(100,100) //创建100px*100px的心电图对象");
        var w = this.W = width;
        var h = this.H = height;

        var bg = document.createElement("canvas");
        bg.setAttribute("width", w);
        bg.setAttribute("height", h);
        var line = document.createElement("canvas");
        line.setAttribute("width", w);
        line.setAttribute("height", h);
        var ctx_bg = bg.getContext("2d");
        var ctx_line = line.getContext("2d");


        this.Test = UT_test.bind(this);
        this.GetBGCTX = function () { return ctx_bg; }

        //TODO://取得整个心电图的根元素 临时，待完成
        this.GetDom = function () { return bg; }
    };
})();

