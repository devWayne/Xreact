import MessageList from './messageList';

class MessageBox extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                    data: []
                };
            }

            componentDidMount() {
                this.loadMessage();
            }

            loadMessage() {
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
    		});
            }

            render() {
                return (<div className = "commentBox">
                        	<h1> Comments </h1>
        			<MessageList data={this.state.data} />
                        </div>
    		);
	    }
}

export default MessageBox;
