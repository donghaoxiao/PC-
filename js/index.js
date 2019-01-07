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
    
    var teamPersonNode=document.querySelector('.team-person');
    var teamLisNodes=document.querySelectorAll('.team-person li');

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
    move(4);
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

     //第一屏js事件
    firstCarousel();
    function firstCarousel() {
        var homeCarousel=document.querySelectorAll('.home-carousel li');
        var homePoint=document.querySelectorAll('.home-point li');
        var homeNode=document.querySelector('.home');
        var lastNum=0;
        var nowNum=0;

        var lastTime=0;
        var timer=null;
        for (var i = 0; i < homePoint.length; i++) {
               homePoint[i].index=i;

            homePoint[i].onclick=function () {
                  //函数节流
                  var nowTime=Date.now();
                  if(nowTime-lastTime<=2000) return;
                   lastTime=nowTime;
                  nowNum=this.index;
                  if(nowNum==lastNum) return;
                  if (nowNum>lastNum){
                      homeCarousel[nowNum].className='public right-show';
                      homeCarousel[lastNum].className='public left-hide';
                  }else{
                      homeCarousel[nowNum].className='public left-show';
                      homeCarousel[lastNum].className='public right-hide';
                  }
                         homePoint[lastNum].className='';
                         this.className='active';
                          lastNum=nowNum;
            }


        };
         homeNode.onmouseenter=function () {
             clearInterval(timer)
         };
         homeNode.onmouseleave=autoPlay;
        autoPlay();
        function autoPlay() {
            timer=setInterval(function () {
                nowNum++;
                lastTime = Date.now();
                if (nowNum>=4){
                    nowNum=0;
                }
                homeCarousel[nowNum].className='public right-show';
                homeCarousel[lastNum].className='public left-hide';
                homePoint[lastNum].className='';
                homePoint[nowNum].className='active';
                lastNum=nowNum;
            },2500)
        }

    }

   //第五屏js事件
  lastViewHandle();
  function lastViewHandle() {
    var width = teamLisNodes[0].offsetWidth;
    var height = teamLisNodes[0].offsetHeight;
    var canvas = null;
    var timer1=null;
    var timer2=null;
    for (var i = 0; i <teamLisNodes .length; i++) {
          teamLisNodes[i].index=i;
      teamLisNodes[i].onmouseenter=function () {
        for (var j = 0; j < teamLisNodes.length; j++) {
          teamLisNodes[j].style.opacity=0.5;
        }
        this.style.opacity=1;
        if(!canvas){
          canvas=document.createElement('canvas');
          canvas.width=width;
          canvas.height=height;
          canvas.className='canvas';
          bubble(canvas);
          teamPersonNode.appendChild(canvas);
        }
        //不管添不添加canvas，都得改变left值
        canvas.style.left = this.index * width + 'px';
      };
      
    }
    teamPersonNode.onmouseleave=function () {
      for (var j = 0; j <teamLisNodes .length; j++) {
          teamLisNodes[j].style.opacity=1;
      }
      canvas.remove();
      canvas=null;
      clearInterval(timer1);
      clearInterval(timer2);
    };


    function bubble(canvas) {
      if(canvas.getContext){
        var patting=canvas.getContext('2d');
        var arr=[];
        timer1=setInterval(function () {
          var r=Math.round(Math.random()*255);
          var g=Math.round(Math.random()*255);
          var b=Math.round(Math.random()*255);
          var c_r=Math.round(Math.random()*8+2);
          var y=canvas.height+c_r;
          var x=Math.round(Math.random()*canvas.width);
          var s=Math.round(Math.random()*30+20);
          arr.push({
            r:r,
            g:g,
            b:b,
            c_r:c_r,
            x:x,
            y:y,
            deg:0,
            s:s
          })

        },50);
        timer2=setInterval(function () {
          patting.clearRect(0,0,canvas.width,canvas.height);
          for (var i = 0; i <arr .length; i++) {
            var item=arr[i];
            item.deg+=4;
            var rad=item.deg*Math.PI/180;

            var x=item.x+Math.sin(rad)*item.s;
            var y=item.y-rad*item.s;
            if (y<=-item.c_r){
              arr.splice(i,1);
              continue;
            }
            patting.fillStyle='rgb('+item.r+','+item.g+','+item.b+')';
            patting.beginPath();
            patting.arc(x,y,item.c_r,0,2*Math.PI);
            patting.fill();
          }

        },1000/60)

      }
    }
  }
};
