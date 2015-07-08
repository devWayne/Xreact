var React = require('react');
	

var LoginForm = React.createClass({
  loginSubmit:function(e){
    $.ajax({
   	url:'/login',
	type:'POST',
	data:{username:$('.J_login_username').val(),password:$('.J_login_password').val()},
	success:function(res){
	    if(res.status==200){
		localStorage.setItem('username', res.user.username);
		console.log(res);
		window.location.reload();
	    }
	    else{
	    	alert('login failed!');
	    }
	}
    }); 

  },
  render: function() {
    return (
	<div>
        <input type="text" placeholder="username" className="J_login_username" />
	<input type="text" placeholder="password" className="J_login_password" />
        <span className="" onClick={this.loginSubmit}>登录</span>
	</div>

    );
  }
});


module.exports=LoginForm;
	

