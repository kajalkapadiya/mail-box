import { useEffect, useState } from "react";
import { Card, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const history = useHistory();
  const [emails, setEmails] = useState([]);
  const crntEmail = useSelector((state) => state.crntEmail.crntEmail);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch(
        `https://mail-box-1833c-default-rtdb.firebaseio.com/${crntEmail}.json`
      );
      const data = await response.json();
      if (response.ok) {
        const fetchedEmails = Object.values(data); // Convert the object to an array
        setEmails(fetchedEmails);
      } else {
        // Handle error case
        console.log("Error fetching emails");
      }
    } catch (error) {
      // Handle error case
      console.log("Error fetching emails:", error);
    }
  };

  const addMail = () => {
    history.replace("/mail");
  };

  const openEmail = () => {
    console.log("done");
  };

  return (
    <div>
      <div className="row">
        <div className="col-2" style={{ marginLeft: "20px" }}>
          <ul className="list-inline ">
            <li>
              <Navbar>
                <button className="btn btn-primary" onClick={addMail}>
                  Compose
                </button>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Unread</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Starred</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Drafts</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Archive</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Spam</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Deleted</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Items</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Photos</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Documents</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Subscriptions</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Deals</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>Travel</a>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a>New folder</a>
              </Navbar>
            </li>
          </ul>
        </div>
        <div className="col">
          <h1>Inbox</h1>
          {emails.length > 0 ? (
            emails.map((email, index) => (
              <div key={index} className="card">
                <div onClick={openEmail}>
                  <strong className="d-flex">{`from - ${email.fromEmailData}`}</strong>
                  <strong className="d-flex">{`Topic - ${email.titleData}`}</strong>
                  <div className="d-flex">{email.msgData}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No mails found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
