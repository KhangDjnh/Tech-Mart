
function DeleteWarning({ product, showModal, setShowModal }){
  const handleCancel = () => {
    setShowModal(false);
  };


  // change this
  const handleConfirm = () => {
    // Delete logic here
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h2>Bạn có muốn xóa sản phẩm này khỏi danh sách không?</h2>
            <button onClick={handleConfirm} style={buttonStyles}>Có</button>
            <button onClick={handleCancel} style={buttonStyles}>Không</button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "200",
};

const modalContentStyles = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  zIndex: "200",
};

const buttonStyles = {
  margin: "5px",
  padding: "10px 20px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  zIndex: "200",
};

export default DeleteWarning;