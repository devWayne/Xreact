var React = require('react');
	

var RegisterForm = React.createClass({
  registerSubmit:function(e){
  	 $.ajax({
   	url:'/createuser',
	type:'POST',
	data:{username:$('.J_register_username').val(),password:$('.J_register_password').val(),nickname:$('.J_register_nickname').val(),email:$('.J_register_email').val()},
	success:function(res){
	console.log(res);
	}
	}); 

  },
  render: function() {
    return (
	<div>
        <input type="text" placeholder="username" className="J_register_username" />
	<input type="text" placeholder="password" className="J_register_password" />
	<input type="text" placeholder="nickname" className="J_register_nickname" />
	<input type="text" placeholder="email" className="J_register_email" />
        <span className="" onClick={this.registerSubmit}>mock注册</span>
	</div>

    );
  }
});


module.exports=RegisterForm;
	
