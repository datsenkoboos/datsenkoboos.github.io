<template>
  <canvas id="granim-canvas" class="fixed block top-0 right-0 bottom-0 left-0 w-full h-full"></canvas>
    <div class="absolute z-2 top-0 w-full min-h-screen flex 880:flex-col">
      <div class="w-[350px] h-screen fixed flex items-center justify-center 880:static 880:w-full 880:h-auto 880:py-10">
        <GitProfile
          :data="profileData"
        />
      </div>
      <div class="repos ml-[350px] flex-1 bg-black p-20 text-white 880:ml-0 880:px-5 880:py-10">
        <div class="title text-5xl font-bold mb-20 select-none">My repositories</div>
        <div class="title text-3xl font-bold font-['Poppins'] my-10 select-none">Personal</div>
        <reposList
          :data="reposData"
          class="flowed"
        />
        <a href="http://www.s1kebeats.store" title="Visit s1kebeats.store" target="_blank">
          <div class="title flex my-10 items-center gap-3">
            <img src="@/assets/images/logo.svg" class="w-[34px] h-[34px] rounded-sm">
            <div class="text-3xl font-bold font-['Poppins']">s1kebeats</div>
            <img src="@/assets/images/arrow.svg" width="50px" class="svg ml-1">
          </div>
        </a>
        <reposList
          :data="orgData"
        />
      </div>
    </div>
  <transition name="overlay">
    <div v-show="loading" class="absolute z-5 top-0 left-0 w-full h-full bg-black flex items-center justify-center text-white">
      <div class="sp sp-circle" v-show="loading"></div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import reposList from '@/components/reposList.vue'
import GitProfile from '@/components/gitProfile.vue'
import Granim from 'granim'
// loading screen state
const loading = ref(true)

// type your github login right here
const USER_LOGIN = 'datsenkoboos'

const reposData = reactive({})
const orgData = reactive({})
const profileData = reactive({})

const orgUrl = ref('https://api.github.com/orgs/s1kebeats/repos')
const profileUrl = ref(`https://api.github.com/users/${USER_LOGIN}`)
const reposUrl = ref(`https://api.github.com/users/${USER_LOGIN}/repos`)

onMounted(() => {
  const granimInstance = new Granim({
    element: '#granim-canvas',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053']
            ]
        }
    }
  });
  // fetch data
  Promise.all([
    fetch(reposUrl.value).then(response => response.json()).then(data => {Object.assign(reposData, data)}),
    fetch(profileUrl.value).then(response => response.json()).then(data => {Object.assign(profileData, data); document.title = profileData.name}),
    fetch(orgUrl.value).then(response => response.json()).then(data => {Object.assign(orgData, data)}),
  ]).then(() => setTimeout(() => {
    document.querySelector('#favicon').href = profileData.avatar_url
    loading.value = false
  }, 250))
})
</script>

<style lang="scss">
// fonts load
@import url("@/assets/fonts/fonts.css");

#app {
  background-color: black;
}

// @media screen and (max-width: 1230px) {
//     .title {
//         width: 350px;
//     }
//     .repos {
//       max-height: 100vh;
//     }
//     .flowed {
//       overflow-y: scroll;
//     }
// }
// @media screen and (max-width: 800px) {
//     .title {
//         width: 300px;
//     }
//     .repos {
//       padding: 0;
//       max-height: none;
//     }
//     .flowed {
//       height: 250px;
//     }
// }

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity .5s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.sp {
	width: 32px;
	height: 32px;
	clear: both;
	margin: 20px auto;
}


/* Spinner Circle Rotation */
.sp-circle {
	border: 2px rgba(white,0.25) solid;
	border-top: 2px rgba(white,1) solid;
	border-radius: 50%;
	-webkit-animation: spCircRot .7s infinite linear;
	animation: spCircRot .7s infinite linear;
}
@keyframes spCircRot {
	from { transform: rotate(0deg); }
	to { transform: rotate(359deg); }
}

.svg {
  transform: rotate(190deg) scale(1, -1);
}
</style>
