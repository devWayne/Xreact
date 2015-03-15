var React = require('react');
var Timeline =require('./utils/timeline');
injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

//react-router config
var Router = require('react-router'); 

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;



//var { Route, RouteHandler, Link } = Router;


var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var App = React.createClass({
  mixins: [ Router.State ],
  render: function () {
    return (
    <div>
    	<div className="nav">
        	<div className="nav-li"><Link to="index">首页</Link></div>
        	<div className="nav-li"><Link to="app">发布</Link></div>
        	<div className="nav-li"><Link to="info">个人</Link></div>
        </div>
	<RouteHandler/>

    </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <p className="commentAuthor">
          {this.props.author} 在 {this.props.timeline} 发布了 
   	  </p>
        <span>  {this.props.children}</span>
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
	    url: '/listmsg',
      	    success: function(data) {
	data.msg.forEach(function(v,idx){
		v.timeline=Timeline(v.createdAt);
	})
        this.setState({data: data.msg});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: '/XList',
      	      type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data.Xlist});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(msg, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={msg.author.nickname} timeline={msg.timeline} key={index}>
          {msg.content}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault()
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentIndex= React.createClass({

	render:function(){
 	 return (<CommentBox pollInterval={1000*60} />);
	}
});	



var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="index" handler={CommentIndex} addHandlerKey={true} />
    <Route name="info" handler={CommentIndex} addHandlerKey={true} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
