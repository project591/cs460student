Robot = function(x, y, z) {

  // create head, neck, and, torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ];
  this.root.position.set(x, y, z);

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;
  this.torso = bones[ 3 ];
  this.torso.position.y = -30;
  this.body_mesh = mesh;


  // create left arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.neck.add(bones[ 0 ]);

  this.left_upperarm = bones[ 1 ];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;
  this.left_lowerarm = bones[ 2 ];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;
  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;
  this.leftarm_mesh = mesh;



  // create right arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.neck.add(bones[ 0 ]);

  this.right_upperarm = bones[ 1 ];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;
  this.right_lowerarm = bones[ 2 ];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;
  this.right_hand = bones[ 3 ];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;
  this.rightarm_mesh = mesh;


  // create left leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.torso.add(bones[ 0 ]);

  this.left_upperleg = bones[ 1 ];
  this.left_upperleg.position.y = -5;
  this.left_upperleg.position.x = 5;
  this.left_lowerleg = bones[ 2 ];
  this.left_lowerleg.position.y = -15;
  this.left_lowerleg.position.x = 5;
  this.left_foot = bones[ 3 ];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
  this.leftleg_mesh = mesh;

  // create right leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'black')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.torso.add(bones[ 0 ]);

  this.right_upperleg = bones[ 1 ];
  this.right_upperleg.position.y = -5;
  this.right_upperleg.position.x = -5;
  this.right_lowerleg = bones[ 2 ];
  this.right_lowerleg.position.y = -15;
  this.right_lowerleg.position.x = -5;
  this.right_foot = bones[ 3 ];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;
  this.rightleg_mesh = mesh;


  this.movement = null;

};


Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);

};

Robot.prototype.raise_left_arm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.dance = function() {

  this.movement = 'dance';

};

//part1
Robot.prototype.walk = function(){
	this.movement = 'walk';	
};

// part 6 - watch lecture for rest of this part
// still need to finish function definition.
Robot.prototype.onStep = function(){
	
	// parts 7 and 8 below	
	for( var a in all_robots ) {

    a = all_robots[a];

    if( a.root.position.equals( this.root.position )) {
      continue;
    }

    if( a.root.position.distanceTo( this.root.position ) < 10 ) {
      this.root.rotateY( Math.PI/2 );
    }
  }

  if( this.root.position.z > 200 || this.root.position.z < -200 ) {
    this.root.rotateY( Math.PI/2 ); // rotate 180 DEGREES
  } else if( this.root.position.x > 200 || this.root.position.x < -200  ) {
    this.root.rotateY( Math.PI/2 );
  }	
  
    // part 6
  	this.root.translateZ(10); 

};

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );

  } else if (this.movement == 'kick') {
  
    if (this.right_upperleg.quaternion.w < 0.72) {
  
      this.movement = 'kick done';
  
    } else {
  
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
  
    }
  
  } else if (this.movement == 'kick done') {
  
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  } else if (this.movement == 'walk') {

     if (this.right_upperleg.quaternion.w < 0.93) {
       this.movement = 'walk2';
     };

     this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );

     var T = -Math.PI/4;
     this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin(T/2),0,0,Math.cos(T/2)), 0.1);

     this.onStep();


   } else if (this.movement == 'walk2') {

     if (this.left_upperleg.quaternion.w < 0.93) {
       this.movement = 'walk';
     };

     this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.5 );

     var T = -Math.PI/4;
     this.left_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T/2),0,0,Math.cos(T/2)),0.1);

     this.onStep();


    } else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function() {

        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.root.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }

};