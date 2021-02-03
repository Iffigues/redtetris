import { Button, Input } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

let msgs = [
  { content: "Hello world", uuidUser: 1, time: "11:02" },
  { content: "hello tt le monde", uuidUser: 2, time: "11:03" },
  { content: "Coucou", uuidUser: 2, time: "11:11" },
  { content: "hello tt le monde", uuidUser: 2, time: "11:03" },
  { content: "Coucou", uuidUser: 2, time: "11:11" },
  { content: "hello tt le monde", uuidUser: 2, time: "11:03" },
  { content: "Coucou", uuidUser: 2, time: "11:11" },
  { content: "_____", uuidUser: 1, time: "11:12" },
  { content: "_____", uuidUser: 1, time: "11:12" },
  { content: "_____", uuidUser: 1, time: "11:12" },
  { content: "_____", uuidUser: 1, time: "11:12" },
  { content: "_____", uuidUser: 1, time: "11:12" }
]

const Chat = () => {
  const [message, setMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      msgs.push({content: message, uuidUser: 1, time: "11:22"})
      setMessage("")
      const element = document.getElementById("chat");
      element.scrollTop = 0;
    }
  }


return (
  <div>
    <div id="chat" className="container--chat">
      <div className="chat d-flex fdir--column">
        {
            msgs.map(msg => {
              return (
                <div
                  className={`${msg.uuidUser === 1
                              ? 'aself--fend bubble--me'
                              : 'aself--fstart bubble--other'}
                              aself--fstart
                              pb-2
                              bubble
                            `}
                >
                  { msg.content } <br /> <span class="thin small-text">{msg.time}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="d-flex fdir--column">

      <div className="aself--center">
        <form onSubmit={sendMessage}>
            <Input
              className="aself--center mb-2 input-size"
              value={message}
              onChange={e => setMessage(e.target.value)}
              variant="outlined"
              required
              name="message"
              label="message"
              type="message"
              id="message"
              inputProps={{
                'data-testid': 'messageChat'
              }}
              />
            <Button
              className="aself--center mt-2 test--btn-join-room"
              color="primary"
              data-testid='btnLogin'
              disabled={message.length === 0}
              onClick={sendMessage}
              >
              ➡️
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Chat
