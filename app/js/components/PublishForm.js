var React = require('react');
var Q=require('q');

var clacImgZoomParam =require('../utils/zoom');


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
  previewImage:function(e){
	  file=e.target;
          var MAXWIDTH  = 260; 
          var MAXHEIGHT = 180;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              var img1 = document.getElementById('imghead1');
              img1.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img1.offsetWidth, img1.offsetHeight);
                img1.width  =  rect.width;
                img1.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                img1.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
             reader.onload = function(evt){
		      img1.src = evt.target.result;
	      }
             reader.readAsDataURL(file.files[0]);
          }
	  if (file.files && file.files[1])
          {          
              var img = document.getElementById('imghead2');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                img.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){
		      img.src = evt.target.result;
	      }
              reader.readAsDataURL(file.files[1]);
          }
  },

  handleSubmit:function(){
	//var form =React.findDOMNode(this.refs.myForm); 
	var form =$('form')[0];// You need to use standart javascript object here
	var formData = new FormData(form);
  	 $.ajax({
   	 url: '/uploadimg',
  	 data: formData,
  	 type: "POST", //ADDED THIS LINE
 	   // THIS MUST BE DONE FOR FILE UPLOADING
   	 contentType: false,
   	 processData: false,
   	 // ... Other options like success and etc
	 success:function(res){
	 
	 }
	});

  },
  render: function() {
    return (
	<div>
		<form ref="myForm">
		<input type="file" name="file" multiple className="J_publish_img"  onChange={this.previewImage.bind(this)}/>
       	 		<div id="preview">
   		<img id="imghead1" />
    		<img id="imghead2" />
		</div>
		<button className="commentForm"  onClick={this.handleSubmit}>上传</button>
		</form>
	</div>
    );
  }
});


module.exports=PublishForm;
	
