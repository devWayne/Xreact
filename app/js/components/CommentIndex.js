var React = require('react');
var Timeline =require('../utils/timeline');


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
    this.setState(function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: '/XList',
        type: 'POST',
        data: comment,
        success: function(data) {
          return {data: data.Xlist}
        },
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
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


var CommentIndex= React.createClass({
	render:function(){
 	 return (<CommentBox pollInterval={1000*60} />);
	}
});	


module.exports = CommentIndex;
