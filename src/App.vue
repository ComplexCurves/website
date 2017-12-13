<template>
	<div id="app">
		<h1>Complex Curves</h1>
    <Search @example="selectExample"/>
		<Viewer :example="example" />
	</div>
</template>

<script>
import Search from './Search.vue'
import Viewer from './Viewer.vue'
export default {
  name: 'app',
  data: function () {
		return {
			example: null
		}
	},
  methods: {
		selectExample: function(newExample) {
			this.example = newExample;
		}
  },
  components: {
    Search,
		Viewer
  }
}
</script>

<style>
#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
  color: #42b983;
}
</style>
