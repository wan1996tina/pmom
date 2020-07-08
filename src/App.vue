<template>
  <div id="app">
    <VueParticles style="position:absolute; height:100vh; width:100vw; z-index:0;"></VueParticles>

    <Slide>
    <div class="p-0 ">
      <b-nav vertical id="nav">
      <b-nav-item>
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'home']"></font-awesome-icon>
        </router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/list">
          <font-awesome-icon :icon="['fas', 'list-ul']"></font-awesome-icon>
        </router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/settings">
          <font-awesome-icon :icon="['fas', 'cog']"></font-awesome-icon>
        </router-link>
      </b-nav-item>
    </b-nav>
    </div>
    </Slide>

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
  components: {
    Slide
  }
}
</script>
