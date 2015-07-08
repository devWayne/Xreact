import Message from './message';

class MessageList extends React.Component{
	render(){
		var messageNodes = this.props.data.map(function(msg,index){
			return (
				<Message data={msg.data}></Message>
			       );
		});
		return <div className="messageList">{messageNodes}</div>
	}
}

export default MessageList;
