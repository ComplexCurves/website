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
			// TODO search should be small
			// TODO update hash
		}
  },
  components: {
    Search,
		Viewer
  }
}
</script>

<style>
@media (max-width: 715px) {
	body > a {
		display: none;
	}
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
