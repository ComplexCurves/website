<template>
  <div id="search">
		<template>
			<h2>Visualize complex plane algebraic curves</h2>
			<input v-model="nameOrEquation" placeholder="Name or equation of curve"
				@keydown.enter="selectExample()" />
			<p>e.g.
				<router-link to="/Folium">Folium</router-link>
				or
				<router-link to="/Custom?equation=y%5E3-3*x*y%2Bx%5E3">y^3 - 3 * x * y + x^3</router-link>
			</p>
		</template>
		<!-- TODO search results component? -->
    <template>
      <template v-if="matchingExamples.length > 0">
        <router-link :to="exampleURL(example)" v-for="example in matchingExamples" :key="example.id">
          <div class="example">
            <template v-if="example.id === 'Custom'">
              <p>{{ example.equation }}</p>
              <p>{{ example.title }}</p>
            </template>
            <template v-else>
              <img :src="example.image" :title="example.title" />
              <p>{{ example.title }}</p>
            </template>
          </div>
        </router-link>
      </template>
      <template v-else>
        <h3>No results</h3>
        <span>Your search returned no results</span>
      </template>
    </template>
	</div>
</template>

<script>
import examples from '../examples.json'
export default {
  name: 'search',
	data: function () {
    return {
      nameOrEquation: ''
    };
	},
	computed: {
		matchingExamples: function() {
			var vm = this;
			var nameOrEquation = vm.nameOrEquation.toLowerCase();
			var matchingExamples = examples.filter(function(example) {
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
    exampleURL: function (example) {
      var url = '/' + example.id;
      if (example.id === 'Custom')
        url += '?equation=' + encodeURIComponent(example.equation);
      return url;
    },
    selectExample: function() {
      var example = this.matchingExamples[0];
      this.$emit('example', example);
    }
	}
}
</script>

<style>
div.example {
  margin: 5em 0;
}

.example img {
  width: 80%;
  max-width: 250px;
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
