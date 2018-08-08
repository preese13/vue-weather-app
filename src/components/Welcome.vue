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
      zip: null,
      feedback: null,
      basePath:
        "https://api.wunderground.com/api/9b8bea4c7d08eb23/geolookup/conditions/q/",
      city: null,
      state: null,
      temperature: null,
      humidity: null,
      wind: null,
      rain: null,
      icon: null
    };
  },
  methods: {
    enterZip() {
      if (
        this.zip &&
        !isNaN(this.zip) &&
        this.zip > 10000 &&
        this.zip < 99999
      ) {
        $.ajax({
          url: this.basePath + "/" + this.zip + ".json",
          type: "get",
          dataType: "json"
        }).done(response => {
          try {
            this.city = response.location.city;
            this.state = response.location.state;
            this.temperature = response.current_observation.temp_f;
            this.humidity = response.current_observation.relative_humidity;
            this.wind = response.current_observation.wind_mph;
            this.rain = response.current_observation.precip_today_metric;
            this.icon = response.current_observation.icon;

            this.$router.push({
              name: "Main",
              params: {
                zip: this.zip,
                basePath: this.basePath,
                city: this.city,
                state: this.state,
                temperature: this.temperature,
                humidity: this.humidity,
                wind: this.wind,
                rain: this.rain,
                icon: this.icon
              }
            });

            this.$cookies.set("zip", this.zip, "Sat, 13 Mar 2025 12:25:57 GMT");
            this.zip = null;
          } catch (err) {
            this.zip = null;
            this.feedback = "Enter a Valid Zipcode";
          }
        });
      } else {
        this.zip = null;
        this.feedback = "Enter a Valid Zipcode";
      }
    }
  },

  created() {
    if (this.$cookies.isKey("zip")) {
      this.zip = this.$cookies.get("zip");
      $.ajax({
        url: this.basePath + "/" + this.zip + ".json",
        type: "get",
        dataType: "json"
      }).done(response => {
        this.city = response.location.city;
        this.state = response.location.state;
        this.temperature = response.current_observation.temp_f;
        this.humidity = response.current_observation.relative_humidity;
        this.wind = response.current_observation.wind_mph;
        this.rain = response.current_observation.precip_today_metric;
        this.icon = response.current_observation.icon;

        if (this.city != null) {
          this.$router.push({
            name: "Main",
            params: {
              zip: this.zip,
              basePath: this.basePath,
              city: this.city,
              state: this.state,
              temperature: this.temperature,
              humidity: this.humidity,
              wind: this.wind,
              rain: this.rain,
              icon: this.icon
            }
          });

          this.$cookies.set("zip", this.zip, "Sat, 13 Mar 2025 12:25:57 GMT");
          this.zip = null;
        } else {
          this.zip = null;
          this.feedback = "Enter a Valid Zipcode";
        }
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


