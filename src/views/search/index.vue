<template>
  <transition name="van-fade">
    <div class="search">search</div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component
export default class Search extends Vue {}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
</style>
