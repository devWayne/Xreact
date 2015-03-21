var React = require('react');


//var RegisterForm=require('./components/RegisterForm');
//
var InfoForm =require('./InfoForm');
var LoginForm=require('./LoginForm');

var CommentIndex=require('./CommentIndex');


var Homepage= React.createClass({
  getLoginInfo:function(){
	var _username=localStorage.getItem('username');
	this.setState({username:_username});
  },	
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getLoginInfo();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    if(this.state.username){
    return (
	<CommentIndex />	    
    );
    }
    return (
	<LoginForm />
    );
  }

});

module.exports = Homepage;

