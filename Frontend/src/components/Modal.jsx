import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export const ModalNotification = ({ color, message, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: color,
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          <div className='flex items-center'>
            <p className='m-0 flex-1'>{message}</p>
            <button
              className='ml-4 bg-transparent border-none text-lg cursor-pointer'
              onClick={onClose}
              aria-label='Cerrar notificación'
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ModalNotification.propTypes = {
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  autoDismiss: PropTypes.number,
};
