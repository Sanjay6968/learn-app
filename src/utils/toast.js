import { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

let _showToast = null; 

export function showToast(message, type = 'info') {
  if (_showToast) _showToast(message, type);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null); // { message, type, hide }

  const triggerToast = useCallback((message, type = 'info') => {
    
    setToast(null);
    
    setTimeout(() => {
      setToast({ message, type, hide: false });
     
      setTimeout(() => {
        setToast((prev) => (prev ? { ...prev, hide: true } : null));
        setTimeout(() => setToast(null), 350);
      }, 3000);
    }, 0);
  }, []);

  
  _showToast = triggerToast;

  const iconMap = { success: '✓', error: '✕', info: 'ℹ' };

  return (
    <>
      {children}
      {toast &&
        ReactDOM.createPortal(
          <div className={`toast ${toast.type}${toast.hide ? ' hide' : ''}`}>
            <span className="toast-icon">{iconMap[toast.type] || 'ℹ'}</span>
            <span>{toast.message}</span>
          </div>,
          document.body
        )}
    </>
  );
}
