import { useState } from "react";

export default function Modal ({action, text, title = "Modal", body= "", closeText = "Close", submitText="Save Changes"}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault()
    setShow(true)
  };

  const handleSubmit = (action) => {
    console.log("Handling set default")
    action();
    handleClose();
  }

  return (
    <>
      <a className="no-decorations" href="" onClick={(e) => {handleShow(e)}}>
        {text}
      </a>

      {/* Modal */}
      <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">
              <p>{body}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                {closeText}
              </button>
              <button type="button" className="btn btn-primary" onClick={() => {handleSubmit(action)}}>
                {submitText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background overlay for modal */}
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};
