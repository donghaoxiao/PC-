window.onload=function () {
    headerContent();
     function headerContent() {
         var headerlistNodes=document.querySelectorAll('.nav li');
         var arrowNode=document.querySelector('.arrow');
         var headerdownNodes=document.querySelectorAll('.down');
         //初始化时小箭头来到第一个li的下边
         arrowNode.style.left=headerlistNodes[0].getBoundingClientRect().left+headerlistNodes[0].offsetWidth/2-arrowNode.offsetWidth/2+'px';
         headerdownNodes[0].style.width='100%';
         for (var i = 0; i < headerlistNodes.length; i++) {
             headerlistNodes[i].index=i;
             headerlistNodes[i].onclick=function () {
                 for (var j = 0; j <headerdownNodes .length; j++) {
                     //默认清空所有的width都为0
                     headerdownNodes[j].style.width='';
                 }
                 //点击哪个哪个拥有小箭头
                 headerdownNodes[this.index].style.width='100%';
                 //白色箭头跟随li进行移动
                 arrowNode.style.left=this.getBoundingClientRect().left+this.offsetWidth/2-arrowNode.offsetWidth/2+'px';
             };
         };
     };


    //滚轮事件
    document.onmousewheel=wheel;
    document.addEventListener('DOMMouseScroll',wheel);

     function wheel(event) {
        event = event || window.event;

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

                break;
            case 'down' :

                break;
        }

        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }

};
