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

  componentWillReceiveProps: function(nextProps) {
    console.log('[twitterest] StreamTweet: 4. Running componentWillReceiveProps()');

    var currentTweetLength = this.props.tweet.text.length;
    var nextTweetLength = nextProps.tweet.text.length;
    var isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength);
    var headerText;

    this.setState({
      numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing
    })

    if (isNumberOfCharactersIncreasing) {
      headerText = 'Number of characters is increasing';
    } else {
      headerText = 'Latest public photo from Twitter';
    }

    this.setState({
      headerText: headerText
    });

    window.twitterest.numberOfReceivedTweets++;

  },

  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('[twitterest] StreamTweet: 5. Running shouldComponentUpdate()');

    return (nextProps.tweet.text.length > 1);
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('[twitterest] StreamTweet: 6. Running componentWillUpdate()');
  },

  componentDidUpdate: function(prevProps, prevState) {
    console.log('[twitterest] StreamTweet: 7. Running componentDidUpdate()');

    window.twitterest.numberOfDisplayTweets++;
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
