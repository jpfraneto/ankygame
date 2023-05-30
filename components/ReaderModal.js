const ReaderModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 z-10  h-screen w-screen flex items-center justify-center bg-opacity-60 bg-theblack'>
      <div className='bg-thewhite text-theblack h-full px-4 max-h-96 overflow-y-scroll py-8 relative rounded-lg w-10/12 md:w-2/5 md:max-h-full my-2 overflow-auto'>
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

export default ReaderModal;
