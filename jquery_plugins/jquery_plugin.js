//$.extend方法推展JQUERY本身的方法，这种方式用来定义一些辅助方法比较方便
$.extend({
    sayHello: function(name) {
        console.log('hey,my name is ' + (name ? name : 'lixiaoyong' + '!'));
    }
});

$.extend({
    log: function(message) {
        var now = new Date();
        y = now.getFullYear();
        m = now.getMonth();
        d = now.getDate();
        h = now.getHours();
        min = now.getMinutes();
        s = now.getSeconds();
        if (s >= 0 && s < 10) {
            s = '0' + s;
        }
        time = y + '/' + m + '/' + d + '/' + h + '/' + min + '/' + s;
        console.log(time + ' My App:' + message);
        //setTimeout(function(){console.clear()},800)
    }
});
//$.fn.pluginName = function(){};用在jquery选择的元素身上
$.fn.myPluginName = function() {
    //在这里面，this指的是用jQuery选中的元素
    //example:this = $('body');
    this.css('color', 'red');
};
//注意this的区别；
$.fn.myPluginName1 = function() {
    this.css('color', 'red'); //这里的this是jquery对象
    return this.each(function() { //要让jquery支持链式调用，只需要return一下就行了
        $(this).append('<em>插入了一个标签</em>'); //这里的this是DOM对象，要使用jquery方法的话，要用‘$’包起来；
    });
};
//让插件接收参数
$.fn.myPluginName2 = function(option) {
    var defaultOpt = {
        color: '#ff5252',
        'fontSize': '14px'
    };
    var settings = $.extend({}, defaultOpt, option); //前置一个空对象是为了防止插件默认的属性（defaultOpt）被覆盖。
    return this.css(settings);
};



//面向对象的插件开发---------------------------------------------------------------------------------------------------------------------
//面向对象插件的步骤：
//第一步，先创建一个构造器，并且添加方法
//obj:需要控制和操作的jquery对象，opt：从外部传进来的由用户设定的参数；
;(function($,window,document,undfined) {
    var Beautifier = function(obj, opt) {
        this.ele = obj;//obj指的是选中的对象
        this.defaults = {
            'color': "red",
            'fontSize': '14px',
            'textDecoration': 'none'
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    Beautifier.prototype = {
        beautify: function() {
            return this.ele.css(this.options);
        }
    };
    $.fn.myPluginName3 = function(opt) {
        //先创建对象实例
        var beauti = new Beautifier(this, opt);//this指的是当前选中的对象
        //返回面向对象的方法;
        return beauti.beautify();
    };
})(jQuery,window,document);
