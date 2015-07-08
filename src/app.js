//injectTapEventPlugin
var React = require('react');
//injectTapEventPlugin = require("react-tap-event-plugin");
//injectTapEventPlugin();


//react-router config
var Router = require('react-router'); 

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


//Components
var Messagebox = require('./components/Message/messageBox');
//var PublishForm=require('./components/PublishForm');
//var RegisterForm=require('./components/RegisterForm');
//var Homepage= require('./components/Homepage');	
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var App = React.createClass({
 render: function () { 
    return (
    <div className="main">
    	<div className="nav">
        	<div className="nav-li"><Link to="index">首页</Link></div>
        </div>
        <RouteHandler />
    </div>
    );
  }
});


var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="index" handler={Messagebox} addHandlerKey={true} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
