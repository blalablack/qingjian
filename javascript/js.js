/************banner轮播***************/
var aa = (function lunBo() {
    var i = 0;//负责记录第几个
    var timer;
    function time() {
        var imgs = $("#h3 .banner img");
        var spans = $(".control span");
        var span_active = $(".control span[class='b_active']");
        //前一张图片变为透明之后后一张出现
        $(imgs[i]).animate({"opacity": ".6"}, 500, function () {
            $(this).attr("class", "");//清除样式
            //到第五张时变为第一张
            if (i == 5) {
                i = -1;
            }
            //后一张变化
            $(imgs[i + 1]).attr("class", "on");
            $(imgs[i + 1]).css({"display": "block"});
            $(this).css("display", "none");
            //下边span(控制按钮)的切换
            span_active.attr("class", "");
            $(spans[i + 1]).attr("class", "b_active");
            $(imgs[i + 1]).animate({"opacity": "1"}, 200, function () {
            });
            i++;
        });
    }
    //开始定时器
    function start() {
        timer = setInterval(time, 3000);
    }
    //结束定时器
    function stop() {
        clearInterval(timer);
        timer = null;
    }
    //下面控制按钮的事件
    function spanClick() {
        var spans = $(".control span");
        spans.each(function () {
            //遍历每个按钮绑定click事件
            $(this).click(function () {
                var span_active = $(".control span[class='b_active']");
                var nub = this.innerHTML - 1;
                i = nub;
                //清空目前的样式
                span_active.attr("class", "");
                //给点击的按钮添加样式
                $(spans[nub]).attr("class", "b_active");
                //清除目前图片的样式
                var img_active = $("#h3 .banner .on");
                img_active.css({"display": "none", "opacity": ".6"});
                //给定下一张图片的样式
                var imgs = $("#h3 .banner img");
                $(imgs[nub]).css({"opacity": 1, "display": "block"});
                $(imgs[nub]).attr("class", "on");
            });
        });
    }
    //返回三个方法
    return {
        t: start,
        p: stop,
        c: spanClick,
    }
})();
//鼠标移入banner的开始暂停轮播
function h3Hover() {
    var h3 = $("#h3");
    h3.mouseenter(function () {
        aa.p();
    });
    h3.mouseleave(function () {
        aa.t();
    });
}

/************首页下部滚动*****************/
function gunDong() {

    var tab = $("#demo").get(0);
    var tab1 = $("#demo1").get(0);
    var tab2 = $("#demo2").get(0);
    //复制一份tab1给tab2
    tab2.innerHTML = tab1.innerHTML;
    //定时器函数
    function Marquee() {
        //判定位置关系
        if (tab2.offsetWidth <= tab.scrollLeft) {
            tab.scrollLeft -= tab1.offsetWidth
        } else {
            tab.scrollLeft++;
        }
    }
    //添加定时器
    var MyMar = setInterval(Marquee, 20);
    tab.onmouseover = function () {
        clearInterval(MyMar)
    };
    tab.onmouseout = function () {
        MyMar = setInterval(Marquee, 20)
    };
}
/******网页文字内容弹出隐藏*/
function show(e) {
    var td = $(e).parent();
    var div = td.siblings("td").children(".content");
    var dataHeight = div.attr("data-height");//第一次为undfind
    var height = div.height();//取得内容区的高度，none的也能取到
    //出现内容
    if (div.css("display") == "none") {
        div.css({"height": "0", "display": "block"});
        if (!dataHeight) {
            $(div).animate({"height": height}, 500);
        } else {
            $(div).animate({"height": dataHeight}, 500);
        }
    } else {//隐藏内容
        $(div).attr("data-height", div.height());//第一次隐藏时div.height()为0，用来记录高度。
        $(div).animate({"height": 0}, 500, function () {
            div.css("display", "none");
        });
    }
}

/********加入收藏*******/
function addFav(title, url) {
    if (document.all) {
        window.external.addFavorite(window.location.href, title);
    } else if (false) {
        window.sidebar.makeUp(title, window.location.href, '');
    } else {
        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要用ctrl+D将【" + window.location.href + "】设置为首页。");
    }
}
/**********精品工程禁用滚轮（没用到）**********/
function wheel(e) {
    e.preventDefault();
}
function jinyong(e) {
    var isFF = /FireFox/i.test(navigator.userAgent);
    if (e) {
        if (!isFF) {
            window.onmousewheel = document.onmousewheel = function () {
                return false;
            }
        } else {
            window.addEventListener("DOMMouseScroll", wheel, false);

        }
    } else if (!e) {
        if (!isFF) {
            window.onmousewheel = document.onmousewheel = function () {
                return true;
            }
        } else {
            window.removeEventListener("DOMMouseScroll", wheel, false);
        }
    }
}
/***********精品工程展示恢复图片*************/
function showPicture(num) {
    var title = $("#h8 .title");
    var img = $("#h8 .neirong img");
    var zi = $("#h8 .zi h3");
    var h8 = $("#h8");
    var h7 = $("#h7");
    //发送ajax请求，取到图片地址和文字信息
    $.ajax({
        url: 'https://blalablack.github.io/ajax/3/shuju.jsp',
        dataType: 'json',
        cache: true,//这里因为是简单的ajax请求，一次取到全部的所以允许缓存
        success: function (data) {
            var width = data.datas[num - 1];
            title.text(width.name);
            img.attr({"src": width.imgsrc});
            zi.html(width.text);
            //动画出来
            h7.css({display: "block"});
            //加一个delay防止图片没加载出来
            h8.css({"top": -h8.height() + "px", "display": "block"}).delay(600);
            h8.animate({"top": "20px"}, 500);
        },
        err:function(){
            zi.html("啊呀，网络不好请重新刷新");
        }
    });
}
function huiFu() {
    var h7 = $("#h7");
    var h8 = $("#h8");
    //去到上面隐藏掉
    h8.animate({"top": -h8.height()}, 150, function () {
        h7.css({"display": "none"});
        h8.css({"display": "none"});
    });
}
/**************精品工程图片的hover****************/
function jingpinHover() {
    var skuang = $(".skuang");
    skuang.mouseenter(function () {
        var mask = $(this).children("#mask");
        var bg = mask.children(".bg");
        //结束当前进程开始下一个
        bg.stop();
        mask.stop();
        bg.animate({opacity: .8});
        mask.animate({top: 10}, 300);
    });
    skuang.mouseleave(function () {
        var mask = $(this).children("#mask");
        var bg = mask.children(".bg");
        //结束当前进程开始下一个
        bg.stop();
        mask.stop();
        bg.animate({opacity: 1});
        mask.animate({top: 156}, 300);

    });
}

/***************nav的事件（下拉菜单）*****************/
function inatial() {
    var a = $("#h2 ul a:not('.xuanzhong')");
    //遍历a添加over和out事件
    a.each(function () {
        $(this).mouseenter(function () {
            var height = $(this).attr('data-height');
            $(this).css({"background": "#3D3D3D"});
            $(this).children(".pop").css({"display": "block"});
            $(this).children(".pop").animate({'height': height}, 250);
        })
        $(this).mouseleave(function () {
            $(this).children(".pop").stop(true, true)
            $(this).css({"background": ""});
            $(this).children(".pop").css({"height": "0", "display": "none"});
        });
    })
};
/******************精品工程内容ul的hover，click*******/
$("#h5 ul li").mouseenter(function () {
    $(this).css({borderColor: "#22CCB3"});
});
$("#h5 ul li").mouseleave(function () {
    $(this).css({borderColor: "#aaa"});
});
//click事件点击切换到哪个
$("#h5 ul li").click(function () {
    /*********样式的切换*********/
    $(this).attr("data-class", "visited");
    var lion = $(this).siblings("[data-class=visited]");
    lion.css({borderColor: "#aaa", backgroundColor: "#fff"});
    lion.children("a").css({color: "#333"});
    $(this).css({borderColor: "#22CCB3", backgroundColor: "#22CCB3"});
    $(this).children("a").css({color: "#fff"});
    /*******内容的切换*******/
    var nub = $(this).attr("data-nub");
    $("#h5 .kuang").each(function (i) {
        if (i != nub) {
            $(this).css({display: "none"});
        } else {
            $(this).css({display: "block"});
        }
    });
});
/*******************百度地图***********************/
function creatMap() {
    var map = new BMap.Map("map");//在百度地图容器中创建一个地图
    var point = new BMap.Point(120.332916, 36.081178);//定义一个中心点坐标
    map.centerAndZoom(point, 17);//设定地图的中心点和坐标并将地图显示在地图容器中
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);               // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
}