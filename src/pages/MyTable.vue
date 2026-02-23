<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in dataKeys" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody v-if="dataTableArr">
      <tr v-for="item in dataTable" :key="item.id">
        <td v-for="key in dataKeys" :key="key">
          <span v-if="typeof item[key] !== 'object'">{{ item[key] }}</span>
          <MyTable v-else :dataTable="item[key]" />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td v-for="key in dataKeys" :key="key">
          <span v-if="typeof dataTable[key] !== 'object'">{{ dataTable[key] }}</span>
          <MyTable v-else :dataTable="dataTable[key]" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  dataTable: {
    type: [Array, Object],
    required: true,
  },
})

const dataTableArr = computed(() => {
  if (Array.isArray(props.dataTable) && props.dataTable.length > 0) {
    return true
  } else {
    return false
  }
})

const dataKeys = computed(() => {
  if (Array.isArray(props.dataTable) && props.dataTable.length > 0) {
    return Object.keys(props.dataTable[0])
  } else {
    return Object.keys(props.dataTable)
  }
})
</script>

<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
thead th {
  font-weight: bold;
}
</style>
