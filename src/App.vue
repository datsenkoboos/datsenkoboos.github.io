<template>
  <canvas ref="canvas" width="2" height="2" class="absolute top-0 left-0 w-full h-full"></canvas>
    <div class="wrapper absolute z-2 top-0 w-full h-full flex 800:flex-col">
      <div class="bg-[rgba(0,0,0,.3)] flex-1 max-w-[350px] hover:bg!-[rgba(0,0,0,.35)] transition-all 800:max-w-full 800:py-20">
        <GitProfile
          :data="profileData"
        />
      </div>
      <div class=" flex-1 bg-black p-20 text-white 1230:flex 1230:flex-col 1230:items-center">
        <div class="title text-5xl font-bold mb-20 select-none 800:mb-10">Repositories</div>
        <div class="title text-3xl font-bold font-['Poppins'] my-10 select-none">Personal</div>
        <reposList
          :data="reposData"
        />
        <a href="http://www.s1kebeats.store" target="_blank" rel="noopener noreferrer">
          <div class="title flex my-10 items-center gap-3 1230:items-center">
            <img src="@/assets/images/logo.svg" class="w-[34px] h-[34px] rounded-sm">
            <div class="text-3xl font-bold font-['Poppins']">s1kebeats</div>
          </div>
        </a>
        <reposList
          :data="orgData"
        />
      </div>
    </div>
  <transition name="overlay">
    <div v-show="loading" class="absolute z-5 top-0 left-0 w-full h-full bg-black flex items-center justify-center text-white">Loading</div>
  </transition>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import reposList from '@/components/reposList.vue'
import GitProfile from '@/components/gitProfile.vue'

const loading = ref(true)

// type your github login right here
const USER_LOGIN = 'datsenkoboos'

const canvas = ref(null)
const ctx = ref(null)

class Pixel {
  constructor( x, y ) {
    this.x = x;
    this.y = y;
    this.hue = Math.floor( Math.random() * 360 );
    let direction = Math.random() > 0.5 ? -1 : 1;
    this.velocity = ( Math.random() * 30 + 20 ) * 0.01 * direction;
  }
  update() {
    this.hue += this.velocity;
  }
  render(ctx) {
    let hue = Math.round( this.hue );
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 50% )';
    ctx.fillRect( this.x, this.y, 1, 1 );
  }
}
let pixels = [
  new Pixel( 0, 0 ),
  new Pixel( 1, 0 ),
  new Pixel( 0, 1 ),
  new Pixel( 1, 1 ),
];
function animate() {
  pixels.forEach( function( pixel ) {
    pixel.update();
    pixel.render( ctx.value );
  });
  requestAnimationFrame( animate );
}

const reposData = reactive({})
const orgData = reactive({})
const profileData = reactive({})

const orgUrl = ref('https://api.github.com/orgs/s1kebeats/repos')
const profileUrl = ref(`https://api.github.com/users/${USER_LOGIN}`)
const reposUrl = ref(`https://api.github.com/users/${USER_LOGIN}/repos`)

onMounted(() => {
  Promise.all([
    fetch(reposUrl.value).then(response => response.json()).then(data => {Object.assign(reposData, data)}),
    fetch(profileUrl.value).then(response => response.json()).then(data => {Object.assign(profileData, data)}),
    fetch(orgUrl.value).then(response => response.json()).then(data => {Object.assign(orgData, data)}),
  ]).then(() => setTimeout(() => loading.value = false, 250))

  ctx.value = canvas.value.getContext('2d');
  animate();
})
</script>

<style lang="scss">
// fonts load
@import url("@/assets/fonts/fonts.css");

#app {
  background-color: black;
}
// .wrapper {
//   background-image: linear-gradient(87deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0,.98) 30%, rgba(0,0,0,.98) 10%);
//   background-size: cover;
// }

@media screen and (max-width: 1230px) {
    .title {
        width: 350px;
    }
}
@media screen and (max-width: 800px) {
    .title {
        width: 300px;
    }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity .5s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
