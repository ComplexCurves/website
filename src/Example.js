import examples from '../examples.json'
export default {
  find: function(id) {
      return examples.find(function (example) {
        return example.id === id;
      });
  },
  fromEquation: function(equation) {
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
  isValid: function(example) {
    return example !== null && (example.id !== 'Custom' || example.sheets >= 2);
  },
  search: function(nameOrEquation) {
    var searchResults = examples.filter(function(example) {
      var exampleTitle = example.title.toLowerCase();
      return exampleTitle.includes(nameOrEquation);
    });
    if(searchResults.length === 0) {
      try {
        return [this.fromEquation(nameOrEquation)];
      }
      catch (error) {
        // no matching examples and not a valid equation
      }
    }
    return searchResults;
  },
  toURL: function (example) {
    var url = '/' + example.id;
    if (example.id === 'Custom')
      url += '?equation=' + encodeURIComponent(example.equation);
    return url;
  }
}
