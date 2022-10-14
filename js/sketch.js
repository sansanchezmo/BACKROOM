var $ = function(prop){
  return document.querySelector(prop);  
};
    var ang = function(a){
        return a*(Math.PI/180);
    };
    var playerSpeed = 3.2;
    var sensitivityX = 0.06;
    var sensitivityY = 0.06;
    var mx = 0, my = 0;
    var keys = [];
    var col = [];
    var cam;
    var yAng = 0;
    var floorTexture, wallTexture;
    document.body.addEventListener("mousemove",function(e){
        mx = e.movementX;
        my = e.movementY;
    });
    var D = {
        cx:0,
        cy:0,
        cz:0,
        x:0,
        y:0,
        z:100,
        r:0,
      r2:0,
    }

    function setup(){
        createCanvas(window.innerWidth,window.innerHeight,WEBGL);
        cam = createCamera();

    
    } 
    function draw(){
        background(0);
        noStroke();
        cam.pan(ang(-D.cx));
        cam.tilt(ang(D.cy));
        D.r-=(mx*sensitivityX);
        yAng-=(my*sensitivityY);
        
        cam.setPosition(D.x,-D.y,D.z);

        for(var i = -2.5; i < 2.5; i++){
          for(var j = -2.5; j < 2.5; j++){
          push();
          translate(i*500,1,j*500);
          rotateY(ang(90));
          fill(228,225,70);

          box(30,120,30);
          pop();
          }
        }
        //pared
        pared(250,0,-500,0,90,0,1500);
        pared(-250,0,-250,0,90,0,1000);
        pared(0,0,250,0,0,0,500);
        pared(-750,0,-750,0,0,0,1000);
        pared(-500,0,-1250,0,0,0,1500);
        pared(-1250,0,-800,0,90,0,200);
        pared(-1250,0,-1200,0,90,0,200);
        //pared(PARED);

        //suelo
        push();
        translate(0,50,0);
        rotateX(ang(90));
        fill(167, 164, 61);
        plane(10000);
        pop();
        push();
        translate(0,100,0);
        rotateX(ang(90));
        fill(167, 164, 61);
        plane(10000);
        pop();
        //techo
        /*
        push();
        translate(0,-55,0);
        rotateX(ang(90));
        fill(150, 145, 49);
        plane(10000);
        pop();*/
        /*
        
        */
        push();
        translate(0,-100,0);
        rotateX(ang(90));
        fill(150, 145, 49);
        plane(10000);
        pop();
        //Luces
        push();
        translate(0,-40,0);
        rotateX(ang(90));
        fill(255);
        plane(10);
        pop();

        D.cx=mx*sensitivityX;
        D.cy=my*sensitivityY;
        //Moviviento adelante
        if(keys[87] && keyIsDown(16)){
          playerSpeed=5;
          D.z-=cos(ang(D.r))*playerSpeed;
          D.x-=sin(ang(D.r))*playerSpeed;
        }
        if(keys[87]){
            D.z-=cos(ang(D.r))*playerSpeed;
            D.x-=sin(ang(D.r))*playerSpeed;  
        }
       //Moviviento atras
        if(keys[83]){
            D.z+=cos(ang(D.r))*(playerSpeed-0.7);
            D.x+=sin(ang(D.r))*(playerSpeed-0.7);  
        }
      //Moviviento izq
        if(keys[65]){
            D.z-=cos(ang(D.r+90))*playerSpeed;
            D.x-=sin(ang(D.r+90))*playerSpeed;  
        }
        //Moviviento derecha
        if(keys[68]){
            D.z+=cos(ang(D.r+90))*playerSpeed;
            D.x+=sin(ang(D.r+90))*playerSpeed;  
        }
        //Saber coordenadas
        if(keys[69]){
            print(D.x,D.y,D.z)  
        }
      
        if(mx > 0){
            mx--;
        }
        if(mx < 0){
            mx++;
        }
        if(my > 0){
            my--;
        }
        if(my < 0){
            my++;
        }
        //Evitar que la camara gire sin control
        if(mx>30 || mx <-30){
          mx=0;
        }
      if(yAng < -30){
          if(my > 0){
              sensitivityY = 0;
          }if(my < 0){
              sensitivityY = 0.15;
          }
      }
      if(yAng > 30){
          if(my < 0){
              sensitivityY = 0;
          }if(my > 0){
              sensitivityY = 0.15;
          }
      }
      //colision alpha (para mejorar usar if en una funcion colidion con los datos de cada pared)
      if(D.z>=230){
        D.z=229
      }
      if(D.x>=230){
        D.x=229
      }
      if(D.z<=-1230){
        D.z= -1229
      }
      if(D.x<=-230 && D.x>=-260 && D.z>=-730 ){
        D.x=-229
      }
      if(D.x<-250 && D.z>=-770 ){
        D.z=-769;
      }
      if(D.x<-1230 ){
        D.x=0;
        D.z=100;
      
      }
      
    }
    function keyPressed(){
        keys[keyCode] = true;
    }
    function keyReleased(){
        keys[keyCode] = false;
    }
    function mouseClicked(){
        //got this stuff from Willard's Minecraft
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    }
  function pared(x,y,z,dx,dy,dz,l){
        push();
        translate(x,y,z);
        rotateX(ang(dx));
        rotateY(ang(dy));
        rotateZ(ang(dz));
        fill(228,225,70);
        plane(l,110);
        pop();
        
        
        /*Arreglar colision aca denrto UwU con un if y and tal vez o if anidado*/
        
      
              
  }