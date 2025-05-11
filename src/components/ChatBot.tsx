
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ChatBot: React.FC = () => {
  // Reference for auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const startChat = () => {
      // Set up mutation observer to detect new messages and scroll down
      const chatContainer = chatContainerRef.current;
      if (chatContainer) {
        const observer = new MutationObserver(scrollToBottom);
        observer.observe(chatContainer, { childList: true, subtree: true });
      }

      // Helper function to show messages sequentially
      const showMessage = (msgId: string) => {
        const message = document.getElementById(msgId);
        if (message) {
          message.classList.add('flex');
        }
      };

      // Helper function to hide avatar after message display
      const hideAvatar = (avatarId: string) => {
        const avatar = document.getElementById(avatarId);
        if (avatar) {
          avatar.style.display = 'none';
        }
      };

      // Display messages with fixed timing for smooth animations
      setTimeout(() => showMessage("msg1"), 400);
      
      setTimeout(() => {
        hideAvatar("avatar1");
        showMessage("msg2");
      }, 1500);
      
      setTimeout(() => {
        hideAvatar("avatar2");
        showMessage("msg3");
      }, 2600);
      
      setTimeout(() => {
        hideAvatar("avatar3");
        showMessage("msg4");
        scrollToBottom();
      }, 3700);

      // Setup event listeners for buttons after elements are rendered
      setTimeout(() => {
        const yesBtn = document.getElementById("yes-btn");
        if (yesBtn) {
          yesBtn.addEventListener("click", () => {
            yesBtn.setAttribute("disabled", "true");
            showMessage("user-reply");
            scrollToBottom();

            setTimeout(() => {
              hideAvatar("avatar4");
              showMessage("msg5");
              scrollToBottom();
              
              setTimeout(() => {
                hideAvatar("avatar5");
                showMessage("msg6");
                scrollToBottom();
                
                setTimeout(() => {
                  hideAvatar("avatar6");
                  showMessage("msg7");
                  scrollToBottom();
                  
                  setTimeout(() => {
                    hideAvatar("avatar7");
                    showMessage("msg8");
                    scrollToBottom();
                    
                    setTimeout(() => {
                      hideAvatar("avatar8");
                      showMessage("msg9");
                      scrollToBottom();
                      
                      const yesBtn2 = document.getElementById("yes-btn-2");
                      if (yesBtn2) {
                        yesBtn2.addEventListener("click", () => {
                          yesBtn2.setAttribute("disabled", "true");
                          showMessage("user-reply-2");
                          scrollToBottom();

                          setTimeout(() => {
                            hideAvatar("avatar9");
                            showMessage("msg10");
                            scrollToBottom();
                          }, 600);
                        });
                      }
                    }, 800);
                  }, 800);
                }, 800);
              }, 800);
            }, 600);
          });
        }
      }, 1500);
    };

    // Start the chat sequence
    startChat();
  }, []);

  return (
    <div className="py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Status indicator with fixed height */}
        <div className="bg-white p-2 flex items-center text-sm justify-center border-b h-10">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-gray-700">Sainsburys Review Online</span>
          </div>
        </div>
        
        {/* Chat container with fixed height and scrolling */}
        <div 
          ref={chatContainerRef} 
          className="p-4 flex flex-col space-y-4 h-[500px] overflow-y-auto scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* First message */}
          <div className="chat-message" id="msg1">
            <div className="flex items-start gap-3">
              <div id="avatar1" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">You've been selected to take part in an exclusive Sainsbury's giveaway!</p>
              </div>
            </div>
          </div>

          {/* Second message */}
          <div className="chat-message" id="msg2">
            <div className="flex items-start gap-3">
              <div id="avatar2" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Tell us what you think of our products and you will earn a Sainsbury's Gift Card</p>
              </div>
            </div>
          </div>

          {/* Third message */}
          <div className="chat-message" id="msg3">
            <div className="flex items-start gap-3">
              <div id="avatar3" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Click Start to Begin your quick review journey.</p>
              </div>
            </div>
          </div>

          {/* Fourth message with START button */}
          <div className="chat-message" id="msg4">
            <div className="flex items-start gap-3">
              <div id="avatar4" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <Button id="yes-btn" variant="default" className="bg-orange-500 hover:bg-orange-600">START</Button>
              </div>
            </div>
          </div>

          {/* User reply - moved to the right */}
          <div className="chat-message" id="user-reply">
            <div className="flex flex-row-reverse items-start gap-3">
              <div className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Start</p>
              </div>
            </div>
          </div>

          {/* Fifth message */}
          <div className="chat-message" id="msg5">
            <div className="flex items-start gap-3">
              <div id="avatar5" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Great! We value your opinions — your feedback helps us improve our products.</p>
              </div>
            </div>
          </div>

          {/* Sixth message */}
          <div className="chat-message" id="msg6">
            <div className="flex items-start gap-3">
              <div id="avatar6" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">This will only take 20 seconds, and you'll be one step closer to your £100 gift card.</p>
              </div>
            </div>
          </div>

          {/* Seventh message */}
          <div className="chat-message" id="msg7">
            <div className="flex items-start gap-3">
              <div id="avatar7" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Just a few simple questions ahead.</p>
              </div>
            </div>
          </div>

          {/* Eighth message */}
          <div className="chat-message" id="msg8">
            <div className="flex items-start gap-3">
              <div id="avatar8" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Click Begin Below To Start</p>
              </div>
            </div>
          </div>

          {/* Ninth message with BEGIN button */}
          <div className="chat-message" id="msg9">
            <div className="flex items-start gap-3">
              <div id="avatar9" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <Button id="yes-btn-2" variant="default" className="bg-orange-500 hover:bg-orange-600">BEGIN</Button>
              </div>
            </div>
          </div>

          {/* Second user reply - moved to the right */}
          <div className="chat-message" id="user-reply-2">
            <div className="flex flex-row-reverse items-start gap-3">
              <div className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-lg max-w-[80%]">
                <p className="text-base">BEGIN</p>
              </div>
            </div>
          </div>

          {/* Final message - Updated with link to the specified URL */}
          <div className="chat-message" id="msg10">
            <div className="flex items-start gap-3">
              <div id="avatar10" className="flex-shrink-0 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-base">Thanks for your interest! Click the button below to start your review and claim your Sainsbury's gift card.</p>
                <div className="mt-6 flex justify-center">
                  <a href="https://www.tapplink.co/21468/1084/chatbot" target="_blank" rel="noopener noreferrer" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full transition-colors text-2xl shadow-lg animate-pulse">
                    CLAIM NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
