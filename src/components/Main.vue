<template>
  <div class="main">
    <div class="button-container">
      <button id="return" v-on:click="returnToSearch"> Search</button>
      <button id="return" v-on:click="returnToSearch"></button>
    </div>
    <div class="location-container">
      {{city}}, {{state}}
    </div>
    <div class="icon-container">
      {{icon}}
    </div>
    <div class="temp-container">
      {{temperature}} &#176;
    </div>
    <div class="bottom-container">
      <div class="bottom-compartment">
        <div class="icon-btm-container">
          Wind
        </div>
        <div class="wind">
          {{wind}} mph
        </div>
      </div>
      <div class="bottom-compartment">
        <div class="icon-btm-container">
          Rain
        </div>
        <div class="rain">
          {{rain}} in.
        </div>
      </div>
      <div class="bottom-compartment">
        <div class="icon-btm-container">
          Humidity
        </div>
        <div class="humidity">
          {{humidity}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Main",
  components: {},
  data() {
    return {};
  },
  props: [
    "zip",
    "basePath",
    "city",
    "state",
    "temperature",
    "humidity",
    "wind",
    "rain",
    "icon"
  ],
  methods: {
    returnToSearch() {
      this.$cookies.remove("zip");
      this.zip = null;
      this.$router.push({
        name: "Welcome"
      });
    }
  },
  created() {}
};
</script>

<style>
.main {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 25px;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;

}

.location-container {
  width: 100%;
  text-align: center;
  padding: 10px;

}

.icon-container {
  width: 100%;
  text-align: center;
    padding: 10px;

}

.temp-container {
  width: 100%;
  text-align: center;
    padding: 10px;

}

.bottom-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
    padding: 10px;

}

.bottom-compartment {
  display: flex;
  flex-direction: column;
  text-align: center;
    padding: 10px;

}

button {
  background-color: #26A9DF;
  border: #26A9DF;
  color: white;
}
</style>
