var React = require('react');
var Timeline =require('../utils/timeline');


var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <p className="commentAuthor">
          {this.props.author} 在 {this.props.timeline} 发布了 
   	  </p>
        <span>{this.props.children}</span>
	  {this.props.imglink?this.props.imglink.map(function(link) {
            return <img src={link}/>;
          }):''}
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
	    url: '/listmsg',
      	    success: function(data) {
		data.msg.forEach(function(_msg,idx){
		_msg.timeline=Timeline(_msg.createdAt);
		if (_msg.imgfilename.length>0) {
		_msg.imglink=[];
               		_msg.imgfilename.forEach(function(v) {
		    		var _link='http://localhost:3000/uploadimgs/'+_msg.imgkey+'/'+v;
                   		 _msg.imglink.push(_link);
                	});
            	}
		});
                this.setState({data: data.msg});
     	    }.bind(this),
            error: function(xhr, status, err) {
        	console.error(this.props.url, status, err.toString());
     	    }.bind(this)
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
        <Comment author={msg.author.nickname} timeline={msg.timeline} imglink={msg.imglink} key={index}>
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
