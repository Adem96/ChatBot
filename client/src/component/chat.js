import React from "react";
import io from "socket.io-client";
import Header from "./header";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:4000');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }
    render(){
        return (
            <div>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <meta name="description" content />
              <meta name="author" content />
             
              {/* Bootstrap core CSS */}
              <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
              {/* Custom styles for this template */}
              <link href="css/shop-item.css" rel="stylesheet" />
              {/* Navigation */}
      <Header/>
              {/* Page Content */}
              <div className="container">
                <div className="row">
                  <div className="col-lg-3">
                    <h1 className="my-4">Shop Name</h1>
                    <div className="list-group">
                      <a href="#" className="list-group-item active">Category 1</a>
                      <a href="#" className="list-group-item">Category 2</a>
                      <a href="#" className="list-group-item">Category 3</a>
                    </div>
                  </div>
                  {/* /.col-lg-3 */}
                  <div className="col-lg-9">
                    <div className="card mt-4">
                    <div className="container">
               <canvas id="canvas-video" width={640} height={480} />
             </div>
                      <div className="card-body">
                        <h3 className="card-title">Reconaissance faciale</h3>
                    
                        <p className="card-text">Avant de vous passer le test vous devez reconnaitre votre visage</p>
                        <span className="text-warning">★ ★ ★ ★ ☆</span>
                        4.0 stars
                      </div>
                    </div>
                    {/* /.card */}
                    <div className="card card-outline-secondary my-4">
                      <div className="card-header">
                        Product Reviews
                      </div>
                      <div className="card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                        <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                        <hr />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                        <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                        <hr />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                        <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                        <hr />
                        <a href="#" className="btn btn-success">Leave a Review</a>
                      </div>
                    </div>
                    {/* /.card */}
                  </div>
                  {/* /.col-lg-9 */}
                </div>
              </div>
              {/* /.container */}
              {/* Footer */}
              <footer className="py-2 bg-dark" style={{height:20}}>
           
                {/* /.container */}
              </footer>
              {/* Bootstrap core JavaScript */}
            </div>
          );
    }
}

export default Chat;