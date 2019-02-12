var ECG = (function () {
    function drawgrid(ctx, width, height) {
        var D = 25;         //一整大格的宽度
        //var C = 25;         //一整大格的高度
        var x = 0;          //当前横坐标
        var y = 0;          //当前纵坐标
        var W = width;      //整个Canvas的宽度
        var H = height;     //整个Canvas的高度
        var F = D / 5;      //分每个大格分成5份

        ctx.strokeStyle = "#ffbebe";
        ctx.lineWidth = 2;
        ctx.beginPath();

        //顶部横线
        ctx.moveTo(W, y);
        ctx.lineTo(x, y);
        //画左边纵线
        ctx.lineTo(x, H);
        ctx.stroke();

        //画横线
        while (y < H) {
            for (var i = 0; i < 4; i++) {
                y = y + F;
                ctx.beginPath();
                ctx.lineWidth = y%25==0?2:1;
                ctx.moveTo(x, y - 0.5);
                ctx.lineTo(W, y - 0.5);
                ctx.stroke();
            }
        }

        //画纵线
        x = 0;
        y = 0;
        while (x < W) {
            for (var i = 0; i < 4; i++) {
                x = x + F;
                ctx.beginPath();
                ctx.lineWidth = x%25==0?2:1;
                ctx.moveTo(x - 0.5, y);
                ctx.lineTo(x - 0.5, H);
                ctx.stroke();
            }
        }

    }

    //draw(y_starts, baseineval, adu, samplingrate, max_times, points_one_times, linectx, draw_lines_index);
    /**
     * 
     * @param {* 初始y坐标轴} y_starts 
     * @param {*基准 128} baseineval 
     * @param {*adu 52} P 
     * @param {*采样频率 128} samplingrate 
     * @param {*max_times 135} max_times 
     * @param {*points_one_times 8} H 
     * @param {*画布} ctx 
     */
    function draw(current_times,y_starts, baseineval, adu, samplingrate, max_times, H, ctx) {

        y_starts = 200;
        baseineval = 128;
        adu = 52;
        samplingrate = 128;
        max_times = 135;
        points_one_times = 8;

        var gride_width = 25;
        //var current_times = 0;
        var ecg_scope = 1;
        var x_start = 25;
        var last_points = [25, 100]


        current_times = current_times % max_times;

        //TODO: clearcanvans(current_times, H, samplingrate, ctx);

        var DV1 = [134.5,132.5,135,136,134.5,136,133.5,133,134.5,132,132,131,128.5,130,128,129,129,128,130,128,129,130,128,130,128,129,130,128,129.5,129,128,129.5,128,130,129,128,130,128,129,130,128,129.5,128,129,129.5,128,129.5,129,129,129.5,128,130,129,128,129.5,128.5,129.5,129.5,128,130.5,128,130,130,128,129.5,128,129,129.5,128,129.5,128.5,129,130,128,129.5,129,128,130.5,128,131,131,130.5,132,130.5,131,132,132,132,130,131,129.5,128,129.5,129,129,129.5,128,129.5,128.5,130.5,138.5,145.5,155.5,158,144,129,116.5,116,121,124,128,129,129,129.5,128,130.5,131,131,132,130.5,132,131,131,132,132,133.5,133.5,132.5,134.5,132.5,136,136,134.5,137,133.5,132.5,134.5,132,132,131.5,129,130.5,128,130,129,128,130,128,129,130,128,129.5,128,129,130,128,129.5,129,129,130,128,130,129,129,129.5,128,129.5,129.5,128,130,128,129,130,128,129.5,128,129,130,128,130,128.5,128.5,129.5,128,130,129,128,129.5,128,130,129.5,128,129.5,128,129,129.5,128,129.5,129,129,129.5,128,129.5,129,129,130.5,128,132,131,130,132,130.5,131,132,132,132,130.5,131,129.5,128,129.5,129,129,129.5,128,129.5,128.5,131,139.5,145.5,156,157,143.5,129,116.5,117,121.5,123.5,129,128.5,129,130,128,130.5,131.5,131,132,130.5,132,131,130,132,132,133.5,133.5,132.5,134.5,132.5,136,136,134.5,137,132.5,133,133.5,132,132,131,129,130.5,128,130,129,128,130,128,130,129,128,130,128,129,130,128,130,128,129,130,128,130,129,129,129.5,128,130,128.5,128.5,129.5,128,129.5,128.5,128,129.5,128,129,130,128,130,128,129,129.5,128,130,129,129,130,128,130,129,128,129.5,128,130,130,128,129.5,128,129,130,128,129.5,129,129,130.5,128,132,131,131.5,132,130.5,132,132,132,132,130.5,131,129.5,128,129.5,128,129,129.5,128,129.5,129,131,139.5,146,157,157,143.5,128.5,116.5,117,121,124.5,129,128,129,130,128,130.5,130,131,132,130.5,132,131,131,132,132,134.5,133.5,132.5,134.5,132.5,136,136,135,137,132.5,133.5,133.5,132,132,130.5,129,129.5,128,130,129,129,130,128,130,129,128,130,128,130,129,128,130,128,129,129.5,127.5,130.5,128.5,129,130,128,130,129,129,129.5,128,130,129,128,129.5,128,130,130,128,130,128,129,129.5,128,130,129,129,129.5,128,129.5,129,129,129.5,128,130,129,128,129.5,128,130,130,128,129.5,128,129,130,129,133,130,131,132,130,132,131,132,132,130.5,132,129.5,128,129.5,128,129.5,129.5,128,129.5,128,131,139.5,146.5,157,156,142.5,127.5,115.5,117,121,124.5,129,128,130,129,128,130.5,130.5,131,132,130,132,130,131,132,132,134.5,132.5,132.5,134.5,132.5,136,135,135,137,132.5,133.5,133.5,132,132,130.5,129.5,130,128,129.5,128,129,129.5,128,130,129,129,129.5,128,130,128.5,128.5,130,128,130,129,128,129.5,128,129,130,128,130,129,129,129.5,128,130,129,129,129.5,128,130,129,128,130,128,130,129.5,128,129.5,128,129,129.5,128,129.5,129,129,129.5,128,130,129,129,129.5,128,129.5,129,128,130.5,128,130,130,128,132,130.5,131,132,130.5,132,131,132,132,130.5,132,129,128.5,129.5,128,130,129,128,129.5,128,132,139.5,146.5,157,155.5,142.5,126.5,115.5,118,121,125.5,129,128,129.5,129,129,130.5,130.5,132,131,130.5,132,130.5,131,131,132,134.5,132.5,133.5,133.5,132.5,137,135,135,136,132.5,133.5,132.5,132,132,130.5,130,129.5,128,129.5,128,129,130,128,130,128.5,129.5,130,128,130,129,129,130,128,130,129,128,129.5,128,130,129,128,130,128,129,130,128,130,128,129,129.5,128,130,129,129,129.5,128,130,129,129,129.5,128,129.5,129,128,129.5,128,129,130,128,129.5,129,129,129.5,128,129.5,129,129,129.5,128,130,129,128.5,133,131,132,131,130,132,131,132,132,130.5,132,129,129,129.5,128,129.5,129,129,129.5,128,132,139.5,147,157,155.5,142.5,126.5,116,117.5,120.5,125.5,129,128,129.5,129,129,130.5,130.5,132,131,130,132,130.5,132,131,132,134.5,132.5,133.5,133.5,132.5,137,135,135,136,132.5,134.5,132.5,132.5,132,130,129.5,129,128,129.5,128,130,129,128,129.5,128,129,130,128,130,128,129,130,128,130,129,129,129.5,128,130,129,128,130,128,130,129,128,130,128,129,129.5,128,129.5,128,129,129.5,128,129.5,129,129,130,128,129.5,128.5,128,129.5,128,129.5,130,128,129.5,128.5,129.5,129.5,127.5,129.5,129,129,129.5,128,129.5,129,129,132,130.5,132,131,130,132,131,133,131,130.5,132,128,129,129.5,128,129.5,129,129,129.5,128,133,139.5,147,158,154.5,142,125.5,116,117.5,120.5,125.5,128,128,129.5,128,129,130.5,130,132,131,131,132,130.5,132,131,133,134.5,132.5,133.5,133.5,133.5,137,135,136,136,132.5,134.5,133,132,132,130.5,130,128.5,129,129.5,128,130,129,129,130,128,129.5,128.5,128,130,128,129,130,128,130,128,129,130,128,130,129,129,130,128,130,129,128,129.5,128,130,129.5,128,129.5,128,129,130,128,130,129,129,129.5,128,130.5,129.5,129,130.5,128,130,129,128,130,128,130,130,128,129.5,128,129,129.5,128,129.5,128.5,129,132,130,132,131,130,132,131,133,131,130,132,128,129.5,130,128,129.5,129,129,129.5,128,133,139,148,158,154.5,142,125,116,117.5,121,126.5,128,128,129.5,128,129,130.5,130,132,130,131,132.5,130,132,131,133,134.5,132.5,134.5,133.5,133.5,137,134,136,136,132.5,134.5,133,133,131,130.5,129.5,128.5,129,130,128,130,129,129,130,128,130,129,128,129.5,128,130,129,128,130,128,129,129.5,128,130,128,129,129.5,128,129.5,128.5,129,129.5,128,129.5,129,128,129.5,128,130,129.5,128.5,129.5,128.5,129,130,128,130,129,129,129.5,128,129.5,129,129,129.5,128,129.5,129,128,129.5,128,130,130,128,129.5,128.5,129,132,130.5,132,131,131,132,131,133,131,130.5,132,128,129.5,128.5,128,130,128,130,129.5,128,133,139,149,158,153.5,141,124,116,117.5,120.5,126.5,128,129,130.5,127.5,129.5,130.5,130,132,130,131,132,130.5,132,130,132.5,134.5,132.5,134.5,132.5,133.5,137,134,136,135,132.5,134.5,132,133,131,130.5,130,128.5,129,129.5,128,130,128,128.5,130,128,130,129,129,130,128,130,129,129,130,128,130,129,128,130,128,129,130,128,130,128,129,130,128,130,129,129,130,128.5,129.5,129,128,130,128,129.5,129,128,130,128,129,130,128,129.5,128,129,130,128,130,129,129,130,128,130,129,129,130,128.5,129.5,131,130,132,130,131,132,131,133,131,131,132,128,130,129,129,129.5,128,129.5,129,128.5,133,139,149,158,153.5,141.5,123,117,118.5,121.5,126.5,128,129,130,128,130,129.5,130,132,130,132,131,130,132,130,133.5,133.5,132.5,134.5,132.5,134.5,136,134,137,135,132.5,133.5,131.5,133,131,130.5,130,128.5,129,129,128,130,128,129,129,128,130,128,129,130,128,129.5,129,129,129.5,128,130,129,128,130,128,129.5,129.5,128,130,128,129,130,128,129.5,128,129,130,128,130,129,129,129.5,128,130,129,129,130,128,130,129,128,130,128,129,129.5,128,130,129,129,130,128,130,129,128.5,129.5,128.5,130,131,130,132,130,131,131,132,133,130,131,132,128,130,129,129,130,127.5,129.5,128.5,128.5,134,139,149.5,157.5,154,140.5,123,117,117.5,120.5,127.5,128,129,130,128,129.5,129.5,131,132,130,132,131,130,132,130,133.5,133.5,132.5,134.5,132.5,134.5,136,135,136,135,133,133.5,132,133,130.5,130,130,127.5,130,129,128,130,128,130,129,128,130,128,129,130,127.5,130,128,129,129.5,127.5,130,129,129,130,128,130,129,128,130,128,130,129,128,130,128,129,130,128,130,129,129,129.5,128,130,129,129,130,128,130,129,128,130,128,130,130,128,129.5,128,129,129.5,128,130,129,129,129.5,128.5,129.5,131,131,132,130,132,131,132,132.5,130,131,131,127.5,130.5,129,129,130,128,130,129,128.5,134,140,149.5,158,153,139.5,122.5,117,117.5,121.5,127.5,128,129,130,128,130,129.5,131,132,130,132,131,131,132,130,133.5,133.5,132.5,134.5,132.5,135.5,136,135.5,137,134,133.5,133.5,132,133,130.5,131,130,128.5,130,129,129,130,128,129.5,128.5,128.5,130,128,129.5,129,128,130,128,129,130,128,130,129,129,130,128,130,129,129,130,128,130,129,128,130,128,130,130,128,130,128,129,130,128,130,129,129,130,128,130,129,129,130,128,130,129,128,129.5,128,130,130,128,130,129,129,130,128.5,129.5,131,131,132,130,132,131,132,133,130,131,131,128,130,128,129,130,128,130,129,129.5,134,140,150.5,157.5,153,139.5,122.5,117,117.5,121.5,127.5,127,129,129,128,129.5,129.5,131,132,130,132,130.5,131,132,130.5,133.5,132.5,132.5,134.5,131.5,135.5,136,135,137,134,133.5,134,133,133,130.5,131,129.5,127.5,130.5,128,129,130,128,130,129,128,130,128,130,129,128,130,128,129,129,128,130,128,129,130,128,130,129,129,130,128,130,129,128,129.5,128,130,129,128,130,128,129,130,128,130,128,129,130,128,130,129,129,130,128,130,129,128,130,128,130,129.5,128.5,130.5,128,129,130,128.5,130.5,131,131,132,130,132,131,132,132,130,132,131.5,128,130,128,130,130,128,130,128,129.5,134,140,150.5,157.5,153,139,121.5,117,117.5,121.5,127.5,128,129.5,129,128,130,129.5,131,131,130,132,130,131,132,130,134.5,132.5,132.5,134.5,132,135.5,135,135,137,134,134.5,133.5,132.5,133,130,131,130,128.5,130,128,129,130,128,130,129,129,130,128,130,129,128,130,128,129,129,128,130,128,129,130,128,130,129,129,130,128,129.5,129,129,129.5,128,130,129,128,129.5,128,129,130,128,130,128,129,130,128,129.5,129,129,130,127.5,129.5,128.5,128.5,129.5,128,130,130,128,129.5,128,129,130,128,130.5,131,131,132,130,132,131,133,133,130.5,132,131.5,128,130,128,130,130,128,129.5,128,129.5,133.5,141,151.5,157.5,152,138,121.5,117,117.5,121.5,127.5,127,130,129,128,130,129.5,131,132,130.5,132,130,131,132,130.5,134.5,133.5,133.5,134.5,132,135.5,135,135,136,134.5,133.5,133.5,133,133,130.5,131.5,129,128.5,129.5,128,129,130,128,130,128,129,130,128,130,129,128,130,128,129,129,128,130,128,129,130,128,130,128,129,130,128,130,129,129,130,128,130,129,129,129.5,128,130,130,128,130,128.5,128.5,129.5,128,129.5,128.5,129,130,128,130,129,128.5,129.5,128,130,129,128,129.5,128,130,130,128.5,130.5,130,131,132,130.5,132,130.5,133,132,130,132,130.5,128,129.5,128,130,129,128,129.5,128,129.5,133.5,140.5,151.5,157.5,152.5,138,120.5,117,117.5,122.5,127.5,128,130,129,129,130,129.5,132,132,130,132,130.5,131,132,130.5,134.5,132.5,133.5,134.5,132,136.5,135,135,136,134.5,134.5,132.5,133,133,130,131,129,128.5,130,128,129,130,128,130,128,129,130,128,130,129,128,129.5,128,130,129,128,130,128,129,129,128,129.5,128,129,130,128,130,129,129,130,128,129.5,128.5,129,129.5,128,129.5,128.5,128,129.5,128,130,129.5,128,129.5,128,129,129.5,128,129.5,129,129,129.5,128,129.5,129,129,129.5,128,129.5,129,128.5,130.5,130,131,132,130,132,130.5,133,132,130.5,132,130.5,129,129.5,128,129.5,129,129,129.5,128,130.5,133.5,141.5,152.5,157.5,152.5,137,121,117,117.5,122.5,127,127.5,129.5,129,129,129.5,129.5,132,131,130,132,130.5,131,131,130,134.5,132.5,133.5,133.5,132,136.5,135,135,136,134.5,133.5,132.5,132.5,133,130,131,129,128.5,130,128,129,130,128,129.5,128,129,130,128,130,129,129,130,128,130,129,128,130,128,130,129,128,130,128,129,130,127.5,129.5,128,129,130,128,129.5,129,129,129.5,128,130,129,128,129.5,128,130,129,128,129.5,128,129,129.5,128,129.5,129,129,129.5,128,129.5,129,129,129.5,128,130,129,129,131.5,131,132,131,130,132,130.5,133,132,130.5,132,129.5,129,129.5,128,130,129,129,129.5,128,130.5,134,142,152,157.5,151.5,136,120.5,117,117.5,123.5,127.5,128,130,129,129,129.5,129.5,132,131,130,132,130.5,132,131,130.5,134.5,132.5,133.5,133.5,133,136,135,135,136,133.5,133.5,133,133,132,129.5,131.5,129,129,130,128,129,129,128,130,128,129,129.5,128,130,128,129,130,128,130,129,129,130,128,129.5,128.5,128,129.5,128,130,129,128,130,128,129,130,128,130,128,129,129.5,128,130,129,129,130,128,130,129,128,130,128,130,129,128,129.5,128,129,130,128,130,129,129,129.5,128,130,129,129,130.5,130,132,131,130,132,130.5,133.5,132,130.5,132,129.5,129,130,128.5,129.5,128.5,128.5,129.5,128,130.5,133.5,142.5,152.5,157.5,151.5,135.5,120,117,117.5,123,127.5,128,130,128,129,130,129.5,132,130,131,132,130,132,131.5,130,134.5,132.5,133.5,133.5,133,136.5,135,136,136,133.5,134.5,132.5,133,132,129.5,131.5,128,128.5,130,128,130,129,128,130,128,130,129.5,128,130,127.5,129.5,129.5,128,130,128,129,130,128,130,129,129,130,128,130,129,128,130,128,130,129,128,130,128,129,129.5,128,130,129,129,130,128,130,129,129,129.5,128,130,129,128,129.5,128,129,130,128,129.5,128,129,129.5,128,129.5,129,129.5,131.5,130,132,131,131,132,130,133.5,131,131,132,129.5,130,130,128,129.5,129,129,130,128,131.5,133.5,142.5,152,157.5,151.5,134.5,120,116,117.5,123,126.5,128,130,128,129,130,130.5,132,130,131,132,130.5,132,131,131,134.5,132.5,133.5,133.5,132.5,136,135,136,136,133.5,135,132.5,133.5,132,130.5,131.5,128,129.5,130,128.5,130,129,129,129.5,127.5,130,129,128,130,128,129,129,128,130,128,129,130,128,130,128,129,130,128,130,129,129,130,128,130,129,128,130,128,129,130,128,130,128,129,130,128,130,129,129,129.5,128,130,129,129,130,128,130,129,128,129.5,127.5,129,129.5,128,130,128.5,128.5,131.5,130,132,131,131,132,130,133.5,131,130,132,129.5,130,129,128,129.5,128,129,129.5,128,131.5,133.5,143.5,153,157.5,150.5,134,120,116,117.5,124,126.5,128.5,130,128,129.5,128.5,130.5,132,130,131,131,130.5,132,130,131,134.5,132.5,134.5,132.5,132.5,136,134,136,135,134.5,134.5,132.5,133.5,132,130.5,132,128.5,129.5,130,128,130,128,129,130,128,130,129,128,130,128,130,129,128,130,128,129,129,128,130,128,129,130,128,130,129,129,130,128,130,129,129,130,128,130,129,128,130,128,129,130,128,130,128,129,130,128,130,129,129,129.5,128,130,129,128.5,129.5,128,130,129.5,128.5,129.5,128,129.5,130.5,130.5,132,130,131.5,132,130,133.5,131,131.5,132,129.5,130,129,129,130,128,130,130,128,131.5,133.5,143,153,157.5,151,133,120,116,117.5,124,126.5,129,130,128,130,129,130.5,132,130,131.5,131,130.5,132,130,131,134.5,132.5,134.5,132.5,132.5,136,134,136,135.5,134.5,134.5,132.5,133.5,131,130.5,131.5,128,129.5,129.5,128,130,128,129,130,128,130,129,129,130,128,129.5,129,128,129.5,128,129,129,128,130,128,129,130,128,130,128,129,130,128,130,129,129,130,128,130,129,128,130,128,130,129];

        ctx.beginPath();

        for (var K = 0; K < DV1.length; K++) {
            var C = DV1[K] - baseineval;
            var I = K * parseFloat((gride_width * 5 / samplingrate));
            var M;
            if (ecg_scope != 0) {
                M = parseFloat((Math.abs(C)) * (adu / (gride_width * 2)) * ecg_scope)
            } else {
                M = parseFloat((Math.abs(C)) * (adu / (gride_width * 2)) / 2)
            }
            var L = parseFloat(x_start + current_times * H * (gride_width * 5 / samplingrate));
            if (K == 0) {
                if (current_times != 0) {
                    ctx.moveTo(last_points[0], last_points[1]);
                    var D = parseFloat(C >= 0 ? y_starts - M: y_starts + M);
                    ctx.lineTo(last_points[0], D);
                    last_points[0] = last_points[0];
                    last_points[1] = D
                } else {
                    var D = parseFloat(C >= 0 ? y_starts - M: y_starts + M);
                    ctx.moveTo(x_start, D);
                    last_points[0] = x_start;
                    last_points[1] = D
                }
            } else {
                var D = parseFloat(C >= 0 ? y_starts - M: y_starts + M);
                ctx.lineTo(L + I, D);
                last_points[0] = L + I;
                last_points[1] = D
            }
        }
    
        ctx.stroke();
        current_times++
    }

    //测试入口
    function UT_test() {
        document.body.appendChild(this.GetDom());
        drawgrid(this.GetBGCTX(), this.W, this.H);

        draw(0,0,0,0,0,0,0,this.GetLiCTX());
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

        //var pen = new Pen()


        this.Test = UT_test.bind(this);
        this.GetBGCTX = function () { return ctx_bg; }
        this.GetLiCTX = function () { return ctx_line; }


        //TODO://取得整个心电图的根元素 临时，待完成
        this.GetDom = function () { return line; }
    };
})();

