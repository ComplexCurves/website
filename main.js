document.addEventListener("DOMContentLoaded", function() {
  var app = new Vue({
    el: '#complexcurves',
    data: {
      nameOrEquation: '',
      examples: []
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
            "title": equation,
            "description": "Custom equation",
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
  });
});
