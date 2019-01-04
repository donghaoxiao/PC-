window.onload=function () {
    var headerlistNodes=document.querySelectorAll('.nav li');
    var arrowNode=document.querySelector('.arrow');
    var headerdownNodes=document.querySelectorAll('.down');
    //获取ul
    var contentMain=document.querySelector('.content-main');
    //获取content区域
    var content=document.querySelector('.content');
    //求出content区域的高度
    var contentHeight=content.offsetHeight;
    //定义
    var num=0;
    var timer=null;
    headerContent();
     function headerContent() {

         //初始化时小箭头来到第一个li的下边
         arrowNode.style.left=headerlistNodes[0].getBoundingClientRect().left+headerlistNodes[0].offsetWidth/2-arrowNode.offsetWidth/2+'px';
         headerdownNodes[0].style.width='100%';
         for (var i = 0; i < headerlistNodes.length; i++) {
             headerlistNodes[i].index=i;
             headerlistNodes[i].onclick=function () {
                 num=this.index;
                 move(num);

             };
         };
     };

     function move(num){

             for (var j = 0; j <headerdownNodes .length; j++) {
                 //默认清空所有的width都为0
                 headerdownNodes[j].style.width='';
             }
             //点击哪个哪个拥有小箭头
             headerdownNodes[num].style.width='100%';
             //白色箭头跟随li进行移动
             arrowNode.style.left=headerlistNodes[num].getBoundingClientRect().left+headerlistNodes[num].offsetWidth/2-arrowNode.offsetWidth/2+'px';

               contentMain.style.top=-num*contentHeight+'px';
     }
     contentM();
     function contentM() {
        //滚轮事件
        document.onmousewheel=wheel;
        document.addEventListener('DOMMouseScroll',wheel);

        function wheel(event) {
            event = event || window.event;
            clearTimeout(timer);
            timer=setTimeout(function () {
                var flag = '';
                if (event.wheelDelta) {
                    //ie/chrome
                    if (event.wheelDelta > 0) {
                        flag = 'up';
                    } else {
                        flag = 'down'
                    }
                } else if (event.detail) {
                    //firefox
                    if (event.detail < 0) {
                        flag = 'up';
                    } else {
                        flag = 'down'
                    }
                }

                switch (flag) {
                    case 'up' :
                        if(num>0){
                            num--;
                            move(num);
                        }
                        break;
                    case 'down' :
                        if (num<4){
                            num++;
                            move(num);
                        }
                        break;
                }
            },200);

            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }
    }
//窗口事件
window.onresize=function () {
    //窗口改变小三角的位置
      arrowNode.style.left=headerlistNodes[num].getBoundingClientRect().left+headerlistNodes[num].offsetWidth/2-arrowNode.offsetWidth/2+'px';
    //窗口改变ul位置
      contentMain.style.top=-num*contentHeight+'px';
  }


};
