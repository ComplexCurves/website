<template>
  <div id="search">
		<template>
			<h2>Visualize complex plane algebraic curves</h2>
			<input v-model="nameOrEquation" placeholder="Name or equation of curve"
				@keydown.enter="selectExample()" />
			<p>e.g.
				<a href="#Folium">Folium</a>
				or
				<a href="#Custom?equation=y%5E3-3*x*y%2Bx%5E3">y^3 - 3 * x * y + x^3</a>
			</p>
		</template>
		<!-- TODO search results component? -->
    <template>
      <template v-if="matchingExamples.length > 0">
        <div class="example" v-for="example in matchingExamples">
          <img :src="example.image" :title="example.title" />
          <p v-if="example.id === 'Custom'">{{ example.equation }}</p>
          <p>{{ example.title }}</p>
        </div>
      </template>
      <template v-else>
        <h3>No results</h3>
        <span>Your search returned no results</span>
      </template>
    </template>
	</div>
</template>

<script>
export default {
  name: 'search',
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
		},
		selectExample: function() {
			var example = this.matchingExamples[0];
			this.$emit('example', example);
		}
	},
	mounted: function() {
		this.fetchExamples();
	}
}
</script>

<style>
div.example {
  margin: 5em 0;
}

h3 {
  margin: 2em 0 0.25em 0;
}

input {
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 2px;
  line-height: 1.2em;
  padding: 0.67em 1em;
}
</style>
