

function DeleteWarning({ action, showModal, setShowModal, text}){
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h2>Bạn có muốn xóa {text} này khỏi danh sách không?</h2>
            <button onClick={action}
            className="bg-red-500 text-white px-4 py-2 mx-8 mt-4 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
            >
              Có
            </button>
            <button onClick={handleCancel} style={{background: "#aaa"}}
            className="text-white px-4 py-2 mx-8 mt-4 rounded-md shadow-md"
            >
              Không
            </button>
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
};

export default DeleteWarning;