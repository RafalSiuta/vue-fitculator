<script setup lang="ts">
import type {CalculationResult} from "@/types/calculation_result/CalculationResult.ts";

const props = defineProps<{
  cardItem:CalculationResult
}>();
</script>

<template>
  <div class="calculations-card">
    <header class="card-header">
      <h3>{{props.cardItem.title}}</h3>
      <h4>{{props.cardItem.result}} <small>{{props.cardItem.unit}}</small></h4>
    </header>

    <p>{{props.cardItem.description}}</p>
    <div class="read-more">
      <i>i</i>
    </div>
  </div>
</template>

<style scoped>
.calculations-card{
  display: flex;
  height: 220px;
  max-height: 250px;
  aspect-ratio: 1;
  flex-direction: column;
  justify-content:flex-start;
  align-items: flex-start;
  gap: 5px;
  padding: 15px;
  background-color: #323232;
  box-shadow: 1px 1px 2px rgb(0 0 0 / 0.8);
  border-top: #474747 1px solid;
  border-left: #474747 1px solid;
  border-radius: 15px;
}
.card-header{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin: 0;
}
h3,
h4,
p{
  margin: 0;
}
h4{
  color: aqua;
}
p{
  max-lines: 4;
  overflow: hidden;
}
.read-more{
  display: flex;
  width: 100%;
  margin-top: auto;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
