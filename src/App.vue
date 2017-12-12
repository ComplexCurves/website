<template>
	<div id="app">
		<h1>Complex Curves</h1>
		<!-- TODO search component (large/small) -->
		<form>
			<h2>Visualize complex plane algebraic curves</h2>
			<input v-model="nameOrEquation" placeholder="Name or equation of curve" />
			<p>for example
				<a href="#Folium">Folium</a>
				or
				<a href="#Custom?equation=y%5E3-3*x*y%2Bx%5E3">y^3 - 3 * x * y + x^3</a>
			</p>
		</form>
		<!-- TODO search results -->
		<template v-if="matchingExamples.length > 0">
			<div v-for="example in matchingExamples">
				<img :src="example.image" :title="example.title" />
        <p v-if="example.id === 'Custom'">{{ example.equation }}</p>
				<p>{{ example.title }}</p>
			</div>
		</template>
		<template v-else>
			<div>
				<h2>No results</h2>
				<p>Your search returned no results</p>
			</div>
		</template>
		<!-- TODO viewer component -->
	</div>
</template>

<script>
export default {
  name: 'app',
	data: function () {
    return {
      nameOrEquation: '',
      examples: []
    };
	},
	computed: {
		matchingExamples: function() {
			var vm = this;
			var nameOrEquation = vm.nameOrEquation.toLowerCase();
			var matchingExamples = this.examples.filter(function(example) {
				var exampleTitle = example.title.toLowerCase();
				return exampleTitle.includes(nameOrEquation);
			});
			if(matchingExamples.length === 0) {
				try {
					return [vm.customExample(nameOrEquation)];
				}
				catch (error) {
					// no matching examples and not a valid equation
				}
			}
			return matchingExamples;
		}
	},
	methods: {
		customExample: function(equation) {
			var p = PolynomialParser.eval(PolynomialParser.parse(equation));
			if(p === null)
				throw "ParseError: invalid equation";
			return {
					"id": "Custom",
					"cached": false,
					"equation": equation,
					"title": "Custom equation",
					"polynomial": p,
					"sheets": PolynomialParser.sheets(p)
			};
		},
		fetchExamples: function() {
			var vm = this;
			fetch('/examples.json').then(function(response) {
				return response.json();
			}).then(function(json) {
				vm.examples = json;
			})
			.catch(function (error) {
				console.error(error);
			});
		}
	},
	mounted: function() {
		this.fetchExamples();
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
