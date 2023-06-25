import { useRef, useState } from "react";
import TextEditor from "./TextEditor";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Mail = (prps) => {
  const fromEmail = useRef();
  const email = useRef();
  const title = useRef();
  const history = useHistory();
  const [editorData, setEditorData] = useState("");
  console.log(editorData);

  const stripTags = (html) => {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, "");
  };

  const handleEditorDataChange = (data) => {
    const strippedData = stripTags(data); // Remove HTML tags
    setEditorData(strippedData); // Update the editorData in the Mail component
  };

  const mailId = localStorage.getItem("token");

  const submitMail = async (e) => {
    e.preventDefault();

    const fromEmailData = fromEmail.current.value;
    const emailData = email.current.value;
    const titleData = title.current.value;
    const msgData = editorData;

    console.log("mail submitted");
    localStorage.setItem("fromEmail", fromEmailData);
    localStorage.setItem("toEmail", emailData);

    const emailId = emailData.replace("@", "").replace(".", "");

    const response = await fetch(
      `https://mail-box-1833c-default-rtdb.firebaseio.com/${emailId}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          fromEmailData,
          emailData,
          titleData,
          msgData,
          read: false,
        }),
        headers: { "Content-type": "application/json" },
      }
    );
    console.log(response);
    history.replace("/home");
    alert("mail is submitted");
  };

  return (
    <div className="container" style={{ height: "100vh", marginTop: "15px" }}>
      <div className="card">
        <div className="card-body">
          <form onSubmit={submitMail}>
            <div className="input-group">
              <label>From</label>
              <input
                type="email"
                id="email"
                ref={fromEmail}
                style={{ padding: "0px" }}
                className="form-control-plaintext h-100"
                required
              />
            </div>
            <hr />
            <div className="input-group">
              <label>To</label>
              <input
                type="email"
                id="email"
                ref={email}
                style={{ padding: "0px" }}
                className="form-control-plaintext h-100"
                required
              />
            </div>
            <hr />
            <div className="input-group">
              <label>Text</label>
              <input
                type="text"
                id="title"
                ref={title}
                style={{ padding: "0px" }}
                className="form-control-plaintext h-100"
                required
              />
            </div>
            <hr />
            {/* <textarea
              id="message"
              rows={11}
              ref={msg}
              className="form-control-plaintext"
              required
            />
            <hr /> */}
            <div>
              <div className="editor">
                <TextEditor onEditorDataChange={handleEditorDataChange} />
              </div>
              <div style={{ position: "absolute", right: "27px" }}>
                <button className="btn btn-primary col m-1">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mail;
