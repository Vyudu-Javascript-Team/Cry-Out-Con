import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatLoaded, setIsChatLoaded] = useState(false);

  useEffect(() => {
    const loadTawkTo = () => {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/YOUR_TAWK_PROPERTY_ID/YOUR_TAWK_WIDGET_ID';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      
      s1.onload = () => {
        setIsChatLoaded(true);
        
        if (window.Tawk_API) {
          window.Tawk_API.onLoad = function() {
            window.Tawk_API.hideWidget();
          };
          
          window.Tawk_API.onStatusChange = function(status: string) {
            setIsOpen(status === 'online');
          };
        }
      };

      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      }
      
      return s1;
    };

    const script = loadTawkTo();

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const toggleChat = () => {
    if (window.Tawk_API) {
      if (isOpen) {
        window.Tawk_API.hideWidget();
      } else {
        window.Tawk_API.popup();
      }
      setIsOpen(!isOpen);
    } else {
      console.log('Chat widget is not yet loaded');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onClick={toggleChat}
        className="group flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <X className="w-5 h-5" />
              <span className="font-medium">Close Chat</span>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Contact Us</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default LiveChat;