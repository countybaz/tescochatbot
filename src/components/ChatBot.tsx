
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ChatBot: React.FC = () => {
  // Reference for auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiList = ["😀", "🤔", "✍️", "💭"];

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
      // Fixed timing durations for smooth animations
      const typingDurations = [2000, 2000, 2000, 2000]; 
      const initialDelay = 400;

      // Set up mutation observer to detect new messages and scroll down
      const chatContainer = chatContainerRef.current;
      if (chatContainer) {
        const observer = new MutationObserver(scrollToBottom);
        observer.observe(chatContainer, { childList: true, subtree: true });
      }

      // Helper function to show emoji typing
      const showTypingWithEmoji = (typingId: string, callback: () => void, duration: number) => {
        setShowEmoji(true);
        const typing = document.getElementById(typingId);
        if (typing) {
          typing.style.display = 'flex'; // Show the typing animation
          setTimeout(() => {
            typing.style.display = 'none'; // Hide the typing animation
            setShowEmoji(false);
            callback(); // Display the corresponding chat bubble
            scrollToBottom();
          }, duration);
        }
      };

      // Staggered delays between messages for more natural conversation flow
      setTimeout(() => {
        showTypingWithEmoji("typing1", () => showMessage("msg1"), typingDurations[0]);

        setTimeout(() => {
          hideAvatar("avatar1");
          showTypingWithEmoji("typing2", () => showMessage("msg2"), typingDurations[1]);
        }, typingDurations[0] + initialDelay);

        setTimeout(() => {
          hideAvatar("avatar2");
          showTypingWithEmoji("typing3", () => showMessage("msg3"), typingDurations[2]);
        }, typingDurations[0] + typingDurations[1] + 2 * initialDelay);

        setTimeout(() => {
          hideAvatar("avatar3");
          showTypingWithEmoji("typing4", () => showMessage("msg4"), typingDurations[3]);
          scrollToBottom();
        }, typingDurations[0] + typingDurations[1] + typingDurations[2] + 3 * initialDelay);
      }, initialDelay);

      // Setup event listeners for buttons after elements are rendered
      setTimeout(() => {
        const yesBtn = document.getElementById("yes-btn");
        if (yesBtn) {
          yesBtn.addEventListener("click", () => {
            yesBtn.setAttribute("disabled", "true"); // Disable the first "Yes" button after click
            showMessage("user-reply");
            scrollToBottom();

            setTimeout(() => {
              hideAvatar("avatar4");
              showTypingWithEmoji("typing5", () => {
                showMessage("msg5"); // "Great! We value your opinions" message
                scrollToBottom();

                setTimeout(() => {
                  hideAvatar("avatar5");
                  showTypingWithEmoji("typing6", () => {
                    showMessage("msg6"); // "This will only take 20 seconds" message
                    scrollToBottom();

                    setTimeout(() => {
                      hideAvatar("avatar6");
                      showTypingWithEmoji("typing7", () => {
                        showMessage("msg7"); // "Just a few simple questions ahead" message
                        scrollToBottom();

                        setTimeout(() => {
                          hideAvatar("avatar7");
                          showTypingWithEmoji("typing8", () => {
                            showMessage("msg8"); // "Click Begin Below To Start"
                            scrollToBottom();

                            setTimeout(() => {
                              hideAvatar("avatar8");
                              showTypingWithEmoji("typing9", () => {
                                showMessage("msg9"); // Display the "BEGIN" button
                                scrollToBottom();
                                const yesBtn2 = document.getElementById("yes-btn-2");
                                if (yesBtn2) {
                                  yesBtn2.addEventListener("click", () => {
                                    yesBtn2.setAttribute("disabled", "true"); // Disable the second button after click
                                    showMessage("user-reply-2"); // Second user reply
                                    scrollToBottom();

                                    setTimeout(() => {
                                      hideAvatar("avatar9");
                                      showTypingWithEmoji("typing10", () => {
                                        showMessage("msg10"); // Display the final message with link
                                        scrollToBottom();
                                      }, 2000); // Typing duration for the new agent response
                                    }, 600); // Delay before the agent's final response
                                  });
                                }
                              }, 2000); // Typing duration for the "BEGIN" button
                            }, 800); 
                          }, 2000); 
                        }, 800); 
                      }, 2000); 
                    }, 800);
                  }, 2000);
                }, 800);
              }, 2000);
            }, 600);
          });
        }
      }, 1500);
    };

    function showTyping(typingId: string, callback: () => void, duration: number) {
      const typing = document.getElementById(typingId);
      if (typing) {
        typing.style.display = 'flex'; // Show the typing animation
        setTimeout(() => {
          typing.style.display = 'none'; // Hide the typing animation
          callback(); // Display the corresponding chat bubble
        }, duration);
      }
    }

    function showMessage(msgId: string) {
      const message = document.getElementById(msgId);
      if (message) {
        message.classList.add('flex'); // Display the chat bubble
      }
    }

    function hideAvatar(avatarId: string) {
      const avatar = document.getElementById(avatarId);
      if (avatar) {
        avatar.style.display = 'none'; // Hide the avatar
      }
    }

    // Start the chat sequence
    startChat();
  }, [showEmoji]);

  // Random emoji for typing indicator
  const getRandomEmoji = () => {
    return emojiList[Math.floor(Math.random() * emojiList.length)];
  };

  return (
    <div className="py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Status indicator with fixed height */}
        <div className="bg-white p-2 flex items-center text-sm justify-center border-b h-10">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-gray-700">Sainsburys Review Online</span>
          </div>
        </div>
        
        {/* Chat container with fixed height and scrolling - Add ref for auto-scrolling */}
        <div 
          ref={chatContainerRef} 
          className="p-4 flex flex-col space-y-4 h-[500px] overflow-y-auto scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* First message */}
          <div className="chat-message" id="msg1">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar1" className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg chat-message-content">
                <span className="whitespace-normal">You've been selected to take part in an exclusive Sainsbury's giveaway!</span>
              </div>
            </div>
          </div>

          {/* Typing animation for the first message */}
          <div className="chat-message" id="typing1">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Second message */}
          <div className="chat-message" id="msg2">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar2" className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg chat-message-content">
                <span className="whitespace-normal">Tell us what you think of our products and you will earn a Sainsbury's Gift Card</span>
              </div>
            </div>
          </div>

          {/* Typing animation for second message */}
          <div className="chat-message" id="typing2">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Third message */}
          <div className="chat-message" id="msg3">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar3" className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg chat-message-content">
                <span className="whitespace-normal">Click Start to Begin your quick review journey.</span>
              </div>
            </div>
          </div>

          {/* Typing animation for third message */}
          <div className="chat-message" id="typing3">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Fourth message with START button */}
          <div className="chat-message" id="msg4">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar4" className="chat-avatar">
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
          <div className="chat-message user-message" id="user-reply">
            <div className="grid grid-cols-[1fr_40px] gap-3 justify-items-end">
              <div className="bg-orange-500 text-white p-3 rounded-lg justify-self-end">
                <span className="whitespace-normal">Start</span>
              </div>
              <div className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Typing animation for fourth message */}
          <div className="chat-message" id="typing4">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Typing animation for agent response */}
          <div className="chat-message" id="typing5">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Fifth message */}
          <div className="chat-message" id="msg5">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar5" className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg chat-message-content">
                <span className="whitespace-normal">Great! We value your opinions — your feedback helps us improve our products.</span>
              </div>
            </div>
          </div>

          {/* Typing animation for sixth message */}
          <div className="chat-message" id="typing6">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Sixth message */}
          <div className="chat-message" id="msg6">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar6" className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg chat-message-content">
                <span className="whitespace-normal">This will only take 20 seconds, and you'll be one step closer to your £100 gift card.</span>
              </div>
            </div>
          </div>

          {/* Typing animation for seventh message */}
          <div className="chat-message" id="typing7">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Seventh message */}
          <div className="chat-message" id="msg7">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar7" className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg chat-message-content">
                <span className="whitespace-normal">Just a few simple questions ahead.</span>
              </div>
            </div>
          </div>

          {/* Typing animation for eighth message */}
          <div className="chat-message" id="typing8">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Eighth message */}
          <div className="chat-message" id="msg8">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar8" className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg chat-message-content">
                <span className="whitespace-normal">Click Begin Below To Start</span>
              </div>
            </div>
          </div>

          {/* Typing animation for ninth message */}
          <div className="chat-message" id="typing9">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Ninth message with BEGIN button */}
          <div className="chat-message" id="msg9">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar9" className="chat-avatar">
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
          <div className="chat-message user-message" id="user-reply-2">
            <div className="grid grid-cols-[1fr_40px] gap-3 justify-items-end">
              <div className="bg-orange-500 text-white p-3 rounded-lg justify-self-end">
                <span className="whitespace-normal">BEGIN</span>
              </div>
              <div className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Typing animation for final message */}
          <div className="chat-message" id="typing10">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div className="chat-avatar">
                <Avatar className="h-10 w-10 bg-gray-200">
                  <AvatarFallback>
                    {showEmoji ? getRandomEmoji() : "..."}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1 chat-message-content">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>

          {/* Final message - Updated text and larger CLAIM NOW button with external link */}
          <div className="chat-message" id="msg10">
            <div className="grid grid-cols-[40px_1fr] gap-3">
              <div id="avatar10" className="chat-avatar">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg chat-message-content">
                <span className="whitespace-normal">Thanks for your interest! Click the button below to start your review and claim your Sainsbury's gift card.</span>
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
