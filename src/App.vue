<template>
	<div id="app">
    <router-link to="/">
      <h1><img src="images/Folium.png" /> Complex Curves</h1>
    </router-link>
    <router-view />
	</div>
</template>

<script>
import 'lato-font'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from './Search.vue'
import Viewer from './Viewer.vue'
import Example from './Example.js'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Search },
    { path: '/:id', component: Viewer, props: function (route) {
        var id = route.params.id;
        var query = route.query;
        var example;
        if (id === 'Custom') {
          var equation = query.equation;
          try {
            example = Example.fromEquation(equation);
          }
          catch (error) {
            // no matching examples and not a valid equation
          }
        } else {
          example = Example.find(id);
        }
        return {
          example: example,
          initialView: query.view,
          initialAutorotate: query.autorotate === '1',
          initialClip: query.clip === '1',
          initialOrtho: query.ortho === '1',
          initialTransparency: query.transparency === '1'
        };
      }
    }
  ]
});

export default {
  name: 'app',
  components: {
    search: Search,
		viewer: Viewer
  },
  router: router
}
</script>

<style>
body {
  margin: 0;
}

@media (max-width: 780px) {
	body > a {
		display: none;
	}
}

@media (max-width: 750px) {
  #app {
    max-width: 400px;
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
  min-width: 280px;
}

h1 > img {
  height: 3rem;
  vertical-align: middle;
}

h1 {
  white-space: nowrap;
  color: black;
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
