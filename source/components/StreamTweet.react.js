var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Tweet = require('./Tweet.react');

var StreamTweet = React.createClass({
  getInitialState: function() {
    console.log('[twitterest] StreamTweet: 1. Running getInitialState()');

    return {
      numberOfCharactersIsIncreasing: null,
      headerText: null
    }
  },

  componentWillMount: function() {
    console.log('[twitterest] StreamTweet: 2. Running componentWillMount()');

    this.setState({
      numberOfCharactersIsIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    });

    window.twitterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayTweets: 1
    };
  },

  componenDidMount: function() {
    console.log('[twitterest] StreamTweet: 3. Running componenDidMount()');

    var componentDOMRepresentation = ReactDOM.findDOMNode(this);

    window.twitterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
    window.twitterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML;
  },


  componentWillUnmount: function() {
    console.log('[Snapterest] StreamTweet: 8. Running componentWillUnmount()');

    delete window.twitterest;
  },

  render: function() {
    console.log('[twitterest] StreamTweet: Running render()');

    return (
      <section>
        <Header text={this.state.headerText}/>
        <Tweet
          tweet = {this.props.tweet}
          onImageClick = {this.props.onAddTweetToCollection}
        />
      </section>
    );
  }
});

module.exports = StreamTweet;
