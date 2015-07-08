class Message extends  React.Component {

	render(){
	<div className="row">
        	<div className="col s12 m7">
          	<div className="card">
            	<div className="card-image">
              		<img src="{data.imgSrc}"></img>
              		<span className="card-title">{data.title}</span>
            	</div>
            	<div className="card-content">
              		<p>{data.content}</p>
            	</div>
            	<div className="card-action">
              		<a href="{data.link}">{data.linkTitle}</a>
            	</div>
          	</div>
        	</div>
	</div>
	}
}

export default Message
