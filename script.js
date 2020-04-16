var canvar = document.querySelector("#game");
var context = canvar.getContext("2d");

// var x=20, y=40,z=0
// var dx=20,dy=5
// var r =20
var isGameOver=false

var ball={
    x:40,
    y:700,
    z:0,
    dx:8,
    dy:5,
    r:10
}

var thanhchan ={
    x:0,
    y:canvar.height-25,
    width:200,
    height:25,
    speed:20,
    isright:false,
    isleft:false
}

var gach={
    offset:100,
    margin:25,
    width:40,
    height:20,
    isRow:7,
    isColumn:12
}

var listsogach=[]
for (let index = 0; index < gach.isRow; index++) {
    for (let index1 = 0; index1 < gach.isColumn; index1++) {
        listsogach.push({
            offset:gach.offset+index1*(gach.width+gach.margin),
            y:100+gach.height+index*(gach.height+gach.margin),
            width:gach.width,
            height:gach.height,
            isBranks:false
        })
    }
   
 }

// vẽ ball
function draWBall(){
    context.beginPath()
    context.arc(ball.x,ball.y,ball.r,ball.z,Math.PI*2)
    
    context.fillStyle="red"
    context.fill()
    context.closePath()
}

// va đập của ball với lề
function setVadap(){
    if(ball.x < ball.r || ball.x > canvar.width-ball.r){
        ball.dx=-ball.dx
    }
    if(ball.y < ball.r || ball.y > canvar.height-ball.r){
        ball.dy=-ball.dy
    }
}
//cập nhật giá trị đường đi của ball
function updateBall(){
    ball.x+=ball.dx
    ball.y+=ball.dy
}
//vẽ thanh trượt
function contro(){
    context.beginPath()
    context.rect(thanhchan.x,thanhchan.y,thanhchan.width,thanhchan.height)
    
    context.fillStyle="red"
    context.fill()
    context.closePath()
}
// xử lý di chuyển mượt
document.addEventListener("keyup",function(even){
    if(even.key=="ArrowRight"){
       thanhchan.isright=false
    }
    if(even.key=="ArrowLeft"){
        thanhchan.isleft=false     
    }
})

document.addEventListener("keydown",function(even){
 
    if(even.key=="ArrowRight"){
        thanhchan.isright=true
    }
    if(even.key=="ArrowLeft"){
        thanhchan.isleft=true
        
    }
})

// di chuyển trái phải của thanh trượt
function setControright(){
    if(thanhchan.isright){
    thanhchan.x+=thanhchan.speed
    }
}
function setControleft(){
    if(thanhchan.isleft){
    thanhchan.x-=thanhchan.speed
    }
}
// xử lý va chạm của thanh trượt và bóng
function vaCham(){
    if(thanhchan.x <= ball.x && thanhchan.x+thanhchan.width>= ball.x && ball.y + ball.r >=canvar.height-thanhchan.height
        ){
        ball.dy=-ball.dy
    }
}
// vẽ list gạch
// 2*offset + 5*width + 4*margin =500
//offset = margin =25=> width =70
//rows =3,column=5
console.log(listsogach)
function listgach(){
for (let index = 0; index<listsogach.length; index++) {
    if(!listsogach[index].isBranks){
        context.beginPath()
        context.rect(listsogach[index].offset,listsogach[index].y,listsogach[index].width,listsogach[index].height)
        
        context.fillStyle="red"
        context.fill()
        context.closePath()
    }
 }
}
function setVadapGach(){
    listsogach.forEach(function(b){
        if(!b.isBranks){
            // console.log(ball.y + ball.r)
            // console.log(b.y)
            if(b.offset < ball.x && b.offset+b.width> ball.x && ball.y + ball.r <= b.y+2*b.height+gach.margin
                && ball.y + ball.r >= b.y
                ){
                ball.dy=-ball.dy
                b.isBranks=true
                console.log("thành công")
            }
        }
    })


}
// xử lý khi game over
function hasGameover(){
    console.log("Game Over")
}

function draw(){
    if(!isGameOver){
        context.clearRect(0,0,canvar.width,canvar.height);
        draWBall()
        contro()
        listgach()
        vaCham()
        if(thanhchan.x+thanhchan.width<canvar.width){
            setControright()
        }
        if(thanhchan.x>0){
            setControleft()
        }
        setVadap()
        setVadapGach()
        updateBall()        
        if(ball.y==canvar.height-ball.r){
            isGameOver=true
        }
        requestAnimationFrame(draw)
    }
    else{
       hasGameover()
    }
}
draw()






