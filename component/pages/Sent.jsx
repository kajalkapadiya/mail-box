import { useEffect, useState } from "react";

const Sent = () => {
  const [sentMails, setSentMails] = useState([]);
  const crntEmail = localStorage.getItem("crntEmail");

  useEffect(() => {
    fetchFromEmails();
  }, [sentMails]);

  const fetchFromEmails = async () => {
    try {
      const response = await fetch(
        `https://mail-box-1833c-default-rtdb.firebaseio.com/fromEmails.json`
      );
      const data = await response.json();
      if (response.ok) {
        const temp = Object.entries(data);
        setSentMails(temp);
      } else {
        console.log("Error fetching emails");
      }
    } catch (error) {
      console.log("Error fetching from emails:", error);
    }
  };

  const deleteHandler = (key) => {
    console.log(key);
    fetch(
      `https://mail-box-1833c-default-rtdb.firebaseio.com/fromEmails/${key}.json`,
      { method: "DELETE", headers: { "content-type": "application/json" } }
    );
  };

  return (
    <>
      <h1>Sent Box</h1>
      {sentMails.map(
        (mail) =>
          mail[1].fromEmailData.replace("@", "").replace(".", "") ===
            crntEmail && (
            <div key={mail[0]} className="card card-size">
              <div>
                <strong
                  className="d-flex"
                  style={{ cursor: "pointer" }}
                >{`from - ${mail[1].fromEmailData}`}</strong>
                <strong className="d-flex">{`Topic - ${mail[1].titleData}`}</strong>
                <div className="d-flex">{mail[1].msgData}</div>
                <button
                  className=" delete-button"
                  onClick={() => {
                    deleteHandler(mail[0]);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
      )}
    </>
  );
};

export default Sent;
