class ChatEngine{constructor(e,s){this.chatBox=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){console.log(this.userEmail);let e=this;this.socket.on("connect",function(){console.log("connection established using sockets...!"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codeail"}),e.socket.on("user_joined",function(e){console.log("a user joined!",e)})}),$("#send-message").click(function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"codeail"})}),e.socket.on("receive_message",function(s){console.log("message received",s.message);const o=$(".chat-messages-list");let t=$("<li>"),a="other-message";s.user_email==e.userEmail&&(a="self-message"),t.append($("<span>",{html:s.message})),t.append($("<sub>",{html:s.user_email})),t.append($("<hr>")),t.addClass(a),$("#chat-messages-list").append(t),o.append(t),$("#chat-message-input").val("")})}}