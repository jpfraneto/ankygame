const RunModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full z-10  h-full flex items-center justify-center bg-opacity-60 bg-theblack'>
      <div className='bg-thewhite text-theblack px-4 max-h-96 overflow-y-scroll py-8 relative rounded-lg w-10/12 md:w-2/5 md:max-h-full mx-4 my-2 overflow-auto'>
        {children}
        <button
          onClick={onClose}
          type='button'
          className='absolute top-0 right-0 mx-4 text-red-600 hover:text-red-800 font-bold text-2xl'
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default RunModal;
