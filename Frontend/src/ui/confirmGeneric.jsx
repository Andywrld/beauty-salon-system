import { AnimatePresence, motion } from 'framer-motion';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => (
  <AnimatePresence>
    {isOpen && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='bg-white rounded-2xl p-6 w-80 max-w-full'
        >
          {title && (
            <h2 className='text-lg  text-black font-semibold mb-4'>{title}</h2>
          )}
          <p className='mb-6 text-gray-700'>{message}</p>
          <div className='flex justify-end space-x-3'>
            <button
              onClick={onCancel}
              className='px-4 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300'
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700'
            >
              Confirmar
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default ConfirmationModal;
