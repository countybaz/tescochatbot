
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ChatBot: React.FC = () => {
  const isMobile = useIsMobile();
  // Reference for auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messagesShown, setMessagesShown] = useState<Record<string, boolean>>({});
  const [showClaimButton, setShowClaimButton] = useState(false);
  const [conversationCompleted, setConversationCompleted] = useState(false);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const showMessage = (msgId: string) => {
    setMessagesShown(prev => ({ ...prev, [msgId]: true }));
    setTimeout(scrollToBottom, 100);
  };

  useEffect(() => {
    // Set up mutation observer to detect new messages and scroll down
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const observer = new MutationObserver(scrollToBottom);
      observer.observe(chatContainer, { childList: true, subtree: true });
    }

    // Display initial messages with timing
    setTimeout(() => showMessage("msg1"), 1800);
    setTimeout(() => showMessage("msg2"), 3600);
    setTimeout(() => showMessage("msg3"), 5400);
  }, []);

  const handleStartClick = () => {
    showMessage("user-reply");
    
    setTimeout(() => {
      showMessage("msg4");
      
      setTimeout(() => {
        showMessage("msg5");
        
        setTimeout(() => {
          showMessage("msg6");
          
          setTimeout(() => {
            showMessage("msg7");
          }, 2200);
        }, 2200);
      }, 2200);
    }, 1800);
  };

  const handleBeginClick = () => {
    showMessage("user-reply-2");
    
    setTimeout(() => {
      showMessage("msg8");
      // Only now we'll mark the conversation as completed and show the claim button
      setConversationCompleted(true);
      setShowClaimButton(true);
    }, 2000);
  };

  return (
    <div className="py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Status indicator with bot avatar */}
        <div className="bg-white p-2 flex items-center text-sm justify-between border-b h-14">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-gray-700 font-medium">Sainsburys Assistant</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat container with fixed height and scrolling */}
        <div 
          ref={chatContainerRef} 
          className="p-3 sm:p-4 flex flex-col space-y-4 h-[400px] sm:h-[500px] overflow-y-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Initial Bot messages */}
          <div className={`chat-message flex items-start ${messagesShown["msg1"] ? "flex" : "hidden"}`}>
            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p className="text-base">You've been selected to take part in an exclusive Sainsbury's giveaway!</p>
            </div>
          </div>

          <div className={`chat-message flex items-start ${messagesShown["msg2"] ? "flex" : "hidden"}`}>
            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p className="text-base">Tell us what you think of our products and you will earn a Sainsbury's Gift Card</p>
            </div>
          </div>

          <div className={`chat-message flex items-start ${messagesShown["msg3"] ? "flex" : "hidden"}`}>
            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div>
              <Button 
                id="start-btn"
                onClick={handleStartClick} 
                variant="default" 
                className="bg-orange-500 hover:bg-orange-600"
              >
                START
              </Button>
            </div>
          </div>

          {/* User reply - aligned to the right */}
          <div className={`chat-message justify-end ${messagesShown["user-reply"] ? "flex" : "hidden"} transition-opacity duration-300`}>
            <div className="bg-orange-500 text-white p-3 rounded-lg max-w-[80%]">
              <p className="text-base">Start</p>
            </div>
            <Avatar className="h-8 w-8 ml-2 mt-1 shrink-0">
              <AvatarFallback><User size={16} /></AvatarFallback>
            </Avatar>
          </div>

          {/* Bot messages after START */}
          <div className={`chat-message flex items-start ${messagesShown["msg4"] ? "flex" : "hidden"}`}>
            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p className="text-base">Great! We value your opinions — your feedback helps us improve our products.</p>
            </div>
          </div>

          <div className={`chat-message flex items-start ${messagesShown["msg5"] ? "flex" : "hidden"}`}>
            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p className="text-base">This will only take 20 seconds, and you'll be one step closer to your £100 gift card.</p>
            </div>
          </div>

          <div className={`chat-message flex items-start ${messagesShown["msg6"] ? "flex" : "hidden"}`}>
            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p className="text-base">Just a few simple questions ahead.</p>
            </div>
          </div>

          <div className={`chat-message flex items-start ${messagesShown["msg7"] ? "flex" : "hidden"}`}>
            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div>
              <Button 
                id="begin-btn"
                onClick={handleBeginClick}
                variant="default" 
                className="bg-orange-500 hover:bg-orange-600"
              >
                BEGIN
              </Button>
            </div>
          </div>

          {/* Second user reply - aligned to the right */}
          <div className={`chat-message justify-end ${messagesShown["user-reply-2"] ? "flex" : "hidden"} transition-opacity duration-300`}>
            <div className="bg-orange-500 text-white p-3 rounded-lg max-w-[80%]">
              <p className="text-base">BEGIN</p>
            </div>
            <Avatar className="h-8 w-8 ml-2 mt-1 shrink-0">
              <AvatarFallback><User size={16} /></AvatarFallback>
            </Avatar>
          </div>

          {/* Final message with claim button */}
          <div className={`chat-message flex items-start ${messagesShown["msg8"] && conversationCompleted ? "flex" : "hidden"}`}>
            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
              <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Sainsbury's Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p className="text-base">Thanks for your interest! Click the button below to start your review and claim your Sainsbury's gift card.</p>
              <div className="mt-6 flex justify-center">
                {showClaimButton && (
                  <a href="https://www.tapplink.co/21468/1084/chatbot" target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full transition-colors text-lg sm:text-2xl shadow-lg animate-pulse">
                    CLAIM NOW
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
