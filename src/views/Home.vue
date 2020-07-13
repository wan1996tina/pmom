<template>
  <div id="home">
    <div class="container-fluid">
      <!-- <div class="backdrop"></div> -->
      <h1>{{currentText}}</h1>

      <div class="clock_shadow">
        <div class="shadow_in"></div>
        <vep
        :progress="progressNow"
        :size="this.vepData.size"
        :line="this.vepData.line"
        :thickness="this.vepData.thickness"
        :emptyThickness="this.vepData.emptyThickness"
        :color="this.vepData.color"
        :animation="this.vepData.animation"
        fontColor='white'
        fontSize='1.5rem'
        :legend="false"
        >
          <span slot="legend-caption" style="font-size: 2.5rem; color: white;">
          <span>{{ time_min }}</span>
          <span class="mx-2">:</span>
          <span>{{ time_sec }}</span>
          </span>
        </vep>
      </div>

      <h2>{{timetext}}</h2>
      <div class="d-flex flex-row">
        <b-btn variant="outline-light" class="mx-1" size="lg" v-if="status != 1" @click="start" style="z-index:2;">
          <font-awesome-icon :icon="['fas','play']"></font-awesome-icon>
        </b-btn>
        <b-btn variant="outline-light" class="mx-1" size="lg" v-if="status == 1" @click="pause" style="z-index:2;">
          <font-awesome-icon :icon="['fas','pause']"></font-awesome-icon>
        </b-btn>
        <b-btn variant="outline-light" class="mx-1" size="lg" v-if="current.length > 0 || todos.length > 0" @click="finish(true)" style="z-index:2;">
          <font-awesome-icon :icon="['fas','step-forward']"></font-awesome-icon>
        </b-btn>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 0 = 停止
      // 1 = 播放
      // 2 = 暫停
      status: 0,
      timer: 0,
      vepData: {
        size: 300,
        line: 'butt',
        thickness: 20,
        emptyThickness: 20,
        color: '#FAA273',
        fontcolor: '#fff',
        fontSize: '60px',
        gradient: {
          radial: false,
          colors: [
            {
              color: '#f12711',
              offset: 0,
              opacity: 1
            },
            {
              color: '#f5af19',
              offset: 100,
              opacity: 1
            }
          ]
        },
        animation: 'default 200 200'
      },
      addAnim: 'false'
    }
  },
  computed: {
    currentText () {
      return this.current.length > 0 ? this.current : this.todos.length > 0 ? '點擊開始番茄鐘' : '沒有事項'
    },
    timetext () {
      let m = Math.floor(this.timeleft / 60)
      let s = Math.floor(this.timeleft % 60)
      if (m / 10 <= 0) {
        m = '0' + m
      }
      if (s / 10 > 0) {
        s = '0' + s
      }
      return `${m}:${s}`
    },
    time_min () {
      let m = Math.floor(this.timeleft / 60)
      if (m / 10 <= 0) {
        m = '0' + m
      }
      return m
    },
    time_sec () {
      let s = Math.floor(this.timeleft % 60)
      if (s / 10 > 0) {
        s = '0' + s
      }
      return s
    },
    alarm () {
      return this.$store.getters.alarm
    },
    timeleft () {
      return this.$store.getters.timeleft
    },
    current () {
      return this.$store.getters.current
    },
    todos () {
      return this.$store.getters.todos
    },
    progressNow () {
      return this.$store.getters.progressNow
    },
    anim: function () {
      return {
        dispaly: 'block',
        backgroundColor: 'rgba()',
        width: '',
        height: ''
      }
    }
  },
  methods: {
    start () {
      if (this.status === 2) {
        // 暫停後繼續
        this.status = 1
        const move = 100 / this.timeleft
        this.timer = setInterval(() => {
          this.$store.commit('countdown', move)
          if (this.timeleft <= 0) {
            this.finish(false)
            this.$store.commit('reset')
          }
        }, 1000)
      } else {
        // 開始新倒數
        if (this.todos.length > 0) {
          this.$store.commit('start')
          this.status = 1
          const move = 100 / this.timeleft
          this.timer = setInterval(() => {
            this.$store.commit('countdown', move)
            // this.$store.commit('showProgress', move)
            // console.log(this.$store.getters.progressNow)
            if (this.timeleft <= 0) {
              // setTimeout(() => {
              this.finish(false)
              this.$store.commit('reset')
              // }, 200)
            }
          }, 1000)
        }
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')

      if (!skip) {
        const audio = new Audio()
        audio.src = './alarms/' + this.alarm
        audio.play()
      }
      if (this.todos.length > 0) {
        this.start()
      } else {
        alert('結束')
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 2
    }
  }
}
</script>
