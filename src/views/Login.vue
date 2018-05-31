<template>  
<div class="main_container">
  <div id="canvascontainer" ref='can'></div>
  <div class="demo-ruleForm login-container">
      <span class="login_title">微欣荣 | 渠道管理系统</span>
      <div id="login_container"></div>
  </div>
</div>
</template>


<script>
  import { requestLogin } from '../api';
  import wxLogin from '../../static/wxLogin';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        checked: true
      };
    },
    methods: {

    },
    mounted() {
      container = document.createElement( 'div' );
      this.$refs.can.appendChild( container );  
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.z = 1000;
      scene = new THREE.Scene();
      particles = new Array();
      var PI2 = Math.PI * 2;
      var material = new THREE.ParticleCanvasMaterial( {
        color: 0x0078de,
        program: function ( context ) {
          context.beginPath();
          context.arc( 0, 0, 1, 0, PI2, true );
          context.fill();
        }
      } );
      var i = 0;
      for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
          particle = particles[ i ++ ] = new THREE.Particle( material );
          particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
          particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
          scene.add( particle );
        }
      }
      renderer = new THREE.CanvasRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      container.appendChild( renderer.domElement );
      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      //
      window.addEventListener( 'resize', onWindowResize, false );
      animate();
      // 微信登录
      var obj = new WxLogin({
        id:"login_container",
        appid: "wx9b6352ee61d8a107",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent("http://uni.wxrwin.com/#/callback"),
        state: "14544487954",
        style: "black",
        href: "https://api.wxrwin.com/static/qrcode.css?v1.4"
      });
    } 
  }
  var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
  var container;
  var camera, scene, renderer;
  var particles, particle, count = 0;
  var mouseX = 0, mouseY = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  
function init() {
  
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
function onDocumentTouchMove( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );
  var i = 0;
  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
      particle = particles[ i++ ];
      particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
      particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;
    }
  }
  renderer.render( scene, camera );
  count += 0.1;
}
</script>

<style lang="scss" scoped>
  .main_container{
    position: relative;
    background-color: #0e1833;
    margin: 0px;
    overflow: hidden;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .login_title{
      line-height: 30px;
      display: block;
      background: #fff;
      text-align: center;
      font-size: 18px;
    }
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    #login_container {
        color: red;
        
        iframe{
            width: 100% !important;
        }
    }
  }

</style>