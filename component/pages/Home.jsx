import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDataAction } from "../auth/msgData";
import { markAction } from "../auth/msgData";
import { fetchAction } from "../auth/msgData";
import useDelete from "../customHooks/useDelete";
import useFetch from "../customHooks/useFetch";
import "./Home.css";

const Home = () => {
  const history = useHistory();
  const [emails, setEmails] = useState([]);
  const dispatch = useDispatch();
  const mark = useDispatch();
  const fetchDataAct = useDispatch();
  const crntEmail = useSelector((state) => state.crntEmail.crntEmail);
  const unreadCount = useSelector((state) => state.msgData.unreadCount);
  const [url, setUrl] = useState(null);
  const [fetchUrl, setFetchUrl] = useState(null);

  const { loading, error } = useDelete(url);
  const { fetchData, fetchLoading, fetchError } = useFetch(fetchUrl);

  useEffect(() => {
    if (fetchData) {
      fetchDataAct(fetchAction.fetchEmailsSuccess(fetchData));
      setEmails(fetchData);
    }

    fetchEmails();
  }, [fetchData]);

  const fetchEmails = async () => {
    setFetchUrl(
      `https://mail-box-1833c-default-rtdb.firebaseio.com/${crntEmail}.json`
    );
    if (fetchLoading) {
      return <div>Loading...</div>;
    }

    if (fetchError) {
      return <div>{fetchError}</div>;
    }
    // try {
    //   const response = await fetch(
    //     `https://mail-box-1833c-default-rtdb.firebaseio.com/${crntEmail}.json`
    //   );
    //   const data = await response.json();
    //   if (response.ok) {
    //     const fetchedEmails = Object.entries(data);
    //     fetchData(fetchAction.fetchEmailsSuccess(fetchedEmails));
    //     setEmails(fetchedEmails);
    //   } else {
    //     console.log("Error fetching emails");
    //   }
    // } catch (error) {
    //   console.log("Error fetching emails:", error);
    // }
  };

  const addMail = () => {
    history.replace("/mail");
  };

  const openEmail = async (index, email) => {
    const emailData = email.fromEmailData;
    const titleData = email.titleData;
    const msgData = email.msgData;
    dispatch(getDataAction.getData({ emailData, titleData, msgData }));

    if (email && !email.read) {
      mark(markAction.markEmailAsRead(index));
      const result = await fetch(
        `https://mail-box-1833c-default-rtdb.firebaseio.com/${crntEmail}/${index}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            read: true,
          }),
          headers: { "content-type": "application/json" },
        }
      );
      const resultData = await result.json();
      console.log(resultData);
    }

    history.replace("/mailView");
    console.log("index", index);
    console.log("email", email);
  };

  const deleteHandler = (key) => {
    console.log(key);
    setUrl(
      `https://mail-box-1833c-default-rtdb.firebaseio.com/${crntEmail}/${key}.json`
    );
    if (loading) return <div>Loading...</div>;
    return <div>{error && <div>{error}</div>}</div>;
  };

  return (
    <div>
      <div className="row" style={{ height: "100vh" }}>
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
                <span>{unreadCount}</span>
              </Navbar>
            </li>
            <li>
              <Navbar>
                <a
                  href="/sent"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "black",
                  }}
                >
                  Sent
                </a>
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
        <div className="col" style={{ height: "100vh" }}>
          <h1>Inbox</h1>
          {emails.length > 0 ? (
            emails.map((email) => (
              <div
                key={email[0]}
                className={`card ${email[1].read ? "" : "unread"} card-size`}
              >
                <div>
                  <strong
                    className="d-flex"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      openEmail(email[0], email[1]);
                    }}
                  >{`from - ${email[1].fromEmailData}`}</strong>
                  <strong className="d-flex">{`Topic - ${email[1].titleData}`}</strong>
                  <div className="d-flex">{email[1].msgData}</div>
                  <button
                    className=" delete-button"
                    onClick={() => {
                      deleteHandler(email[0]);
                    }}
                  >
                    Delete
                  </button>
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
