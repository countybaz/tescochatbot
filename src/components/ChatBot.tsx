import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Define message types for better organization
type MessageId = 
  | 'welcome1' 
  | 'welcome2'
  | 'welcome3'
  | 'start-button'
  | 'user-start'
  | 'msg1'
  | 'msg2'
  | 'msg3'
  | 'begin-button'
  | 'user-begin'
  | 'final-message';

const ChatBot: React.FC = () => {
  const isMobile = useIsMobile();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<MessageId[]>([]);
  const [showClaimButton, setShowClaimButton] = useState(false);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Add a message ID to the visible messages array
  const showMessage = (msgId: MessageId) => {
    setVisibleMessages(prev => [...prev, msgId]);
    setTimeout(scrollToBottom, 100);
  };

  // Check if a message should be displayed
  const isMessageVisible = (msgId: MessageId): boolean => {
    return visibleMessages.includes(msgId);
  };

  // Clear saved state from session storage on first load to prevent showing all messages
  useEffect(() => {
    sessionStorage.removeItem('chatMessages');
    sessionStorage.removeItem('showClaimButton');
    // Only show the first message when the component first mounts
    setTimeout(() => showMessage('welcome1'), 1000);
  }, []);

  // Set up mutation observer to detect new messages and scroll down
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const observer = new MutationObserver(scrollToBottom);
      observer.observe(chatContainer, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
  }, []);

  // Show initial messages with slower timing only if they haven't been shown
  useEffect(() => {
    // Only show welcome2 and welcome3 if welcome1 is already visible
    if (isMessageVisible('welcome1') && !isMessageVisible('welcome2')) {
      setTimeout(() => showMessage('welcome2'), 1500);
    }
    
    if (isMessageVisible('welcome2') && !isMessageVisible('welcome3')) {
      setTimeout(() => showMessage('welcome3'), 1500);
    }
    
    if (isMessageVisible('welcome3') && !isMessageVisible('start-button')) {
      setTimeout(() => showMessage('start-button'), 1500);
    }
  }, [visibleMessages]);

  // Save chat state whenever it changes (except on first load)
  useEffect(() => {
    if (visibleMessages.length > 1) {
      sessionStorage.setItem('chatMessages', JSON.stringify(visibleMessages));
    }
    if (showClaimButton) {
      sessionStorage.setItem('showClaimButton', 'true');
    }
  }, [visibleMessages, showClaimButton]);

  const handleStartClick = () => {
    // Add user's response
    showMessage('user-start');
    
    // Show next set of messages with slower delays
    setTimeout(() => showMessage('msg1'), 1200);
    setTimeout(() => showMessage('msg2'), 3000);
    setTimeout(() => showMessage('msg3'), 4800);
    setTimeout(() => showMessage('begin-button'), 6000);
  };

  const handleBeginClick = () => {
    // Add user's response
    showMessage('user-begin');
    
    // Show final message with claim button
    setTimeout(() => {
      showMessage('final-message');
      setShowClaimButton(true);
    }, 1500);
  };

  return (
    <div className="py-4 sm:py-8 px-2 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Status indicator with bot avatar */}
        <div className="bg-white p-2 flex items-center text-sm justify-between border-b h-14">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
              <AvatarFallback><Bot size={16} /></AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-gray-700 font-medium">Tesco Assistant</span>
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
          {/* Welcome message 1 - Only shown on initial load */}
          {isMessageVisible('welcome1') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">You've been selected to take part in an exclusive Tesco giveaway!</p>
              </div>
            </div>
          )}

          {/* Welcome message 2 - Only shown on initial load */}
          {isMessageVisible('welcome2') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Tell us what you think of our products and you will earn a Tesco Gift Card</p>
              </div>
            </div>
          )}

          {/* Welcome message 3 - New message that was requested */}
          {isMessageVisible('welcome3') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Click Start to Begin your quick review journey.</p>
              </div>
            </div>
          )}

          {/* START button - Only shown after welcome3 */}
          {isMessageVisible('start-button') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div>
                <Button 
                  id="start-btn"
                  onClick={handleStartClick} 
                  variant="default" 
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  START
                </Button>
              </div>
            </div>
          )}

          {/* User reply after clicking START - aligned to the right */}
          {isMessageVisible('user-start') && (
            <div className="chat-message flex justify-end animate-fade-in">
              <div className="bg-blue-700 text-white p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Start</p>
              </div>
              <Avatar className="h-8 w-8 ml-2 mt-1 shrink-0">
                <AvatarFallback><User size={16} /></AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Bot message 1 after START - Only shown after clicking START */}
          {isMessageVisible('msg1') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Great! We value your opinions — your feedback helps us improve our products.</p>
              </div>
            </div>
          )}

          {/* Bot message 2 after START - Only shown after clicking START */}
          {isMessageVisible('msg2') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">This will only take 20 seconds, and you'll be one step closer to your Tesco gift card.</p>
              </div>
            </div>
          )}

          {/* Bot message 3 after START - Only shown after clicking START */}
          {isMessageVisible('msg3') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Just a few simple questions ahead.</p>
              </div>
            </div>
          )}

          {/* BEGIN button - Only shown after showing all three previous messages */}
          {isMessageVisible('begin-button') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div>
                <Button 
                  id="begin-btn"
                  onClick={handleBeginClick}
                  variant="default" 
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  BEGIN
                </Button>
              </div>
            </div>
          )}

          {/* User reply after clicking BEGIN - aligned to the right */}
          {isMessageVisible('user-begin') && (
            <div className="chat-message flex justify-end animate-fade-in">
              <div className="bg-blue-700 text-white p-3 rounded-lg max-w-[80%]">
                <p className="text-base">BEGIN</p>
              </div>
              <Avatar className="h-8 w-8 ml-2 mt-1 shrink-0">
                <AvatarFallback><User size={16} /></AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Final message with claim button - Only shown after clicking BEGIN */}
          {isMessageVisible('final-message') && (
            <div className="chat-message flex items-start animate-fade-in">
              <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                <AvatarImage src="/lovable-uploads/58a9571b-a254-431a-94a9-3d4cdec07246.png" alt="Tesco Assistant" />
                <AvatarFallback><Bot size={16} /></AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Thanks for your interest! Click the button below to start your review and claim your Tesco gift card.</p>
                <div className="mt-6 flex justify-center">
                  {showClaimButton && (
                    <a href="https://www.tapplink.co/21468/1076/cb" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full transition-colors text-lg sm:text-2xl shadow-lg animate-pulse">
                      CLAIM NOW
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
