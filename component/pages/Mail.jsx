const Mail = () => {
  const handleClick = () => {
    console.log("Image clicked!");
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="input-group">
              <label>To</label>
              <input
                type="email"
                id="email"
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
                style={{ padding: "0px" }}
                className="form-control-plaintext h-100"
                required
              />
            </div>
            <hr />
            <textarea
              id="message"
              rows={11}
              className="form-control-plaintext"
              required
            />
          </form>
          <hr />
          <div>
            <div style={{ position: "absolute", left: "27px" }}>
              <button className="btn btn-primary col m-1">Send</button>
            </div>
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                left: "100px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                left: "135px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                left: "170px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                left: "205px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                right: "30px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                right: "65px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                right: "100px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                right: "135px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                right: "170px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
            <img
              src="/weblink.png"
              className="img-fluid rounded col mx-auto"
              style={{
                width: "30px",
                height: "30px",
                position: "absolute",
                marginTop: "7px",
                right: "205px",
              }}
              alt="My Image"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
