var React = require('react');
var Q=require('q');

var PublishForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.publishText().then(this.publishImg);
  },
  publishText:function(){
	var deferred = Q.defer();
        $.ajax({
   	url:'/createmsg',
	type:'POST',
	data:{content:$('.J_publish_text').val()},
	success:function(res){
	    deferred.resolve(res);
	} 
     	});
	 return deferred.promise;
  },
  publishImg:function(){
	var myfile;
	self=this;
	var deferred = Q.defer();
	$('.J_publish_img').bind("change", function(e) {
      	var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      	self.props.myfile = files[0];
    	});
	var filedata = new FormData();
	 filedata.append('file-1',self.props.myfile);
        $.ajax({
   	url:'/uploadimg',
	type:'POST',
	data: filedata,
	processData: false,
        contentType: false,
	contentType:'multipart/form-data',
	success:function(res){
	    deferred.resolve(res);
	} 
   	});
	return deferred.promise;
	  
  },
  mocklogin:function(){
  	 $.ajax({
   	url:'/createuser',
	type:'POST',
	data:$('.J_publish_img').val(),
	success:function(res){
	console.log(res);
	} 
    });

},
  render: function() {
    return (
	<div>
	<input type="file" name="file" multiple className="J_publish_img" />
        <input type="text" placeholder="Say something..." className="J_publish_text" />
	<span className="commentForm" onClick={this.handleSubmit}>上传</span>
	</div>

    );
  }
});


module.exports=PublishForm;
	
