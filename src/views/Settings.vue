<template>
    <div id="settings">
      <div class="container">
        <h5 class="title">Settings</h5>
      <b-table :items="items" :fields="fields" @row-clicked="selectAlarm" class="col-12 table">
        <template v-slot:cell(preview)="data">
          <audio controls :src="'./alarms/'+data.item.file" class="audio"></audio>
        </template>

        <template v-slot:cell(select)="data">
          <font-awesome-icon v-if="data.item.file == alarm" :icon="['fas','check']"></font-awesome-icon>
        </template>
      </b-table>
      </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: '鬧鈴',
          file: 'alarm1.mp3'
        },
        {
          name: 'lionking',
          file: 'lionking.mp3'
        }
      ],
      fields: [
        {
          key: 'name',
          label: '名稱'
        },
        {
          key: 'preview',
          label: '預覽'
        },
        {
          key: 'select',
          label: '選擇'
        }
      ]
    }
  },
  computed: {
    alarm () {
      return this.$store.getters.alarm
    }
  },
  methods: {
    selectAlarm (item) {
      this.$store.commit('selectAlarm', item.file)
    }
  }
}
</script>
