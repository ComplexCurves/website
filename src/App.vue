<template>
	<div id="app">
    <h1><img src="images/Folium.png" />Complex Curves</h1>
    <keep-alive>
    <component :is="currentView" :example="example" @example="selectExample" />
    </keep-alive>
	</div>
</template>

<script>
import Search from './Search.vue'
import Viewer from './Viewer.vue'
export default {
  name: 'app',
  data: function () {
		return {
      currentView: 'search',
			example: null
		}
	},
  methods: {
		selectExample: function(newExample) {
      this.currentView = 'viewer';
			this.example = newExample;
			// TODO update hash
		}
  },
  components: {
    search: Search,
		viewer: Viewer
  }
}
</script>

<style>
@media (max-width: 715px) {
	body > a {
		display: none;
	}
}

body {
  min-width: 310px;
}

#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	margin: 0 auto;
	width: 80%;
}

h1 > img {
  height: 3rem;
  vertical-align: middle;
}

h1 {
  white-space: nowrap;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
	text-decoration: none;
}
</style>
