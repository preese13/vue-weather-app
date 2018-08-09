<template>
  <div class="welcome">
      <div class="center-align">
        <form @submit.prevent="enterZip">
          <label for="zip">Enter Your Zip:</label>

          <input autocomplete="off" type="text" name="zip" v-model="zip">

          <p class="red-text" v-if="feedback">{{feedback}}</p>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      feedback: null,
      basePath:
        "https://api.wunderground.com/api/9b8bea4c7d08eb23/geolookup/conditions/q/",
    };
  },
  methods: {
    enterZip() {
        $.ajax({
          url: this.basePath + "/" + this.zip + ".json",
          type: "get",
          dataType: "json"
        }).done(response => {
          try {

            this.$router.push({
              name: "Main",
              params: {
                zip: this.zip,
                city: response.location.city,
                state: response.location.state,
                temperature: response.current_observation.temp_f,
                humidity: response.current_observation.relative_humidity,
                wind: response.current_observation.wind_mph,
                rain:response.current_observation.precip_today_metric,
                icon: response.current_observation.icon
              }
            });
            this.$cookies.set("zip", this.zip, "Sat, 13 Mar 2025 12:25:57 GMT");

          } catch (err) {
            this.zip = null;
            this.feedback = "Enter a Valid Zipcode";
          }
        });
    }
  },

  created() {
    if (this.$cookies.isKey("zip")) {

      this.zip = this.$cookies.get("zip")   
      $.ajax({
        url: this.basePath + "/" + this.zip + ".json",
        type: "get",
        dataType: "json"
      }).done(response => {
          this.$router.push({
              name: "Main",
              params: {
                zip: this.zip,
                city: response.location.city,
                state: response.location.state,
                temperature: response.current_observation.temp_f,
                humidity: response.current_observation.relative_humidity,
                wind: response.current_observation.wind_mph,
                rain:response.current_observation.precip_today_metric,
                icon: response.current_observation.icon
              }
            });

          this.$cookies.set("zip", this.zip, "Sat, 13 Mar 2025 12:25:57 GMT");
          this.zip = null;
      });
    }
  }
};
</script>

<style >

.welcome {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
  caret-color: white;
}

input {
  border-bottom-color: white !important;
  color: white;
}

label {
  color: white;
}

@media only screen and (max-width: 700px) {
}
</style>


