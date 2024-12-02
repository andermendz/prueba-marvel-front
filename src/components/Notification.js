function Notification({ message, type, onClose }) {
    return (
      <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all transform duration-500 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white max-w-md z-50`}>
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button 
            onClick={onClose}
            className="ml-4 hover:text-gray-200"
          >
            ×
          </button>
        </div>
      </div>
    );
  }
  
  export default Notification;