var React = require("react");
var Query = require("./children/Query.js");
var Search = require("./children/Search.js");
var Saved = require("./children/Saved.js");
var helpers = require("../utils/helpers.js");
var Main = React.createClass({

  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },


  _setSearchFields: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },

  _resetMongoResults: function(newData){
    this.setState({ mongoResults: newData} );
  },

  componentDidMount: function() {


    helpers.apiGet().then(function(query){
      this.setState({mongoResults: query.data});
    }.bind(this));
  },

  componentDidUpdate: function(prevProps, prevState) {


    if(this.state.searchTerms != prevState.searchTerms){
      helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
        this.setState({ apiResults: data });
      }.bind(this));
    }

  },

  render: function() {
    return (

      <div className="container" style={ {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>

        <div className="page-header">
          <h1 className="text-center"><u>New York Times Article Search</u></h1>
          <br />
          <h3 className="text-center" style={ {marginTop: "-12px"} }><i>A React Rendition</i></h3>
          <h4 className="text-center">Search for and annotate articles of interest. Click on headlines to learn more.</h4>
        </div>

        <Query _setSearchFields={this._setSearchFields} />
        <Search apiResults={this.state.apiResults} _resetMongoResults={this._resetMongoResults} />
        <Saved mongoResults={this.state.mongoResults} _resetMongoResults={this._resetMongoResults} />

      </div>

    );
  }
});

module.exports = Main;