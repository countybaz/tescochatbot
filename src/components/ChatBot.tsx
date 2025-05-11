
import React, { useEffect } from 'react';

const ChatBot: React.FC = () => {
  useEffect(() => {
    const startChat = () => {
      const typingDurations = [1000, 1250, 1500, 1250]; // Durations for typing animations
      const initialDelay = 500; // Initial delay before the first animation

      setTimeout(() => {
        showTyping("typing1", () => showMessage("msg1"), typingDurations[0]);

        setTimeout(() => {
          hideAvatar("avatar1");
          showTyping("typing2", () => showMessage("msg2"), typingDurations[1]);
        }, typingDurations[0] + initialDelay);

        setTimeout(() => {
          hideAvatar("avatar2");
          showTyping("typing3", () => showMessage("msg3"), typingDurations[2]);
        }, typingDurations[0] + typingDurations[1] + 2 * initialDelay);

        setTimeout(() => {
          hideAvatar("avatar3");
          showTyping("typing4", () => showMessage("msg4"), typingDurations[3]);
        }, typingDurations[0] + typingDurations[1] + typingDurations[2] + 3 * initialDelay);

      }, initialDelay);

      // Setup event listeners for buttons after elements are rendered
      setTimeout(() => {
        const yesBtn = document.getElementById("yes-btn");
        if (yesBtn) {
          yesBtn.addEventListener("click", () => {
            yesBtn.setAttribute("disabled", "true"); // Disable the first "Yes" button after click
            showMessage("user-reply");

            setTimeout(() => {
              hideAvatar("avatar4");
              showTyping("typing5", () => {
                showMessage("msg5"); // "Great! We value your opinions" message

                setTimeout(() => {
                  hideAvatar("avatar5");
                  showTyping("typing6", () => {
                    showMessage("msg6"); // "This will only take 20 seconds" message

                    setTimeout(() => {
                      hideAvatar("avatar6");
                      showTyping("typing7", () => {
                        showMessage("msg7"); // "Just a few simple questions ahead" message

                        setTimeout(() => {
                          hideAvatar("avatar7");
                          showTyping("typing8", () => {
                            showMessage("msg8"); // "Click Begin Below To Start"

                            setTimeout(() => {
                              hideAvatar("avatar8");
                              showTyping("typing9", () => {
                                showMessage("msg9"); // Display the "BEGIN" button
                                const yesBtn2 = document.getElementById("yes-btn-2");
                                if (yesBtn2) {
                                  yesBtn2.addEventListener("click", () => {
                                    yesBtn2.setAttribute("disabled", "true"); // Disable the second button after click
                                    showMessage("user-reply-2"); // Second user reply

                                    setTimeout(() => {
                                      hideAvatar("avatar9");
                                      showTyping("typing10", () => {
                                        showMessage("msg10"); // Display the final message
                                      }, 1000); // Typing duration for the new agent response
                                    }, 750); // Delay before the agent's final response
                                  });
                                }
                              }, 1000); // Typing duration for the "BEGIN" button
                            }, 1000); 
                          }, 1000); 
                        }, 1000); 
                      }, 1000); 
                    }, 1000);
                  }, 1000);
                }, 1000);
              }, 2000);
            });
          });
        }
      }, 2000);
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
        message.style.display = 'flex'; // Display the chat bubble
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
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 bg-white p-2 flex items-center text-sm justify-center shadow-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-gray-700">Sainsburys Review Online</span>
        </div>
      </div>
      <div className="max-w-lg mx-auto mt-12 mb-6 bg-white rounded-lg shadow-md overflow-hidden">
        <div id="chat-container" className="p-4 flex flex-col space-y-4">
          {/* First message */}
          <div className="chat-message" id="msg1" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar1">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 max-w-[80%]">You've been selected to take part in an exclusive Sainsbury's giveaway!</div>
          </div>

          {/* Typing animation for the first message */}
          <div className="chat-message" id="typing1" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Second message */}
          <div className="chat-message" id="msg2" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar2">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 max-w-[80%]">Tell us what you think of our products and you will earn a Sainsbury's Gift Card</div>
          </div>

          {/* Typing animation for second message */}
          <div className="chat-message" id="typing2" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Third message */}
          <div className="chat-message" id="msg3" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar3">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 max-w-[80%]">Click Start to Begin your quick review journey.</div>
          </div>

          {/* Typing animation for third message */}
          <div className="chat-message" id="typing3" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Fourth message with START button */}
          <div className="chat-message" id="msg4" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar4">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <button id="yes-btn" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors">START</button>
          </div>

          {/* User reply */}
          <div className="chat-message flex justify-end" id="user-reply" style={{display: 'none'}}>
            <div className="user-chat-bubble bg-orange-500 text-white p-3 rounded-lg mt-2">Start</div>
            <div className="avatar-container ml-2">
              <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
            </div>
          </div>

          {/* Typing animation for fourth message */}
          <div className="chat-message" id="typing4" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Typing animation for agent response */}
          <div className="chat-message" id="typing5" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Fifth message */}
          <div className="chat-message" id="msg5" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar5">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 max-w-[80%]">Great! We value your opinions — your feedback helps us improve our products.</div>
          </div>

          {/* Typing animation for sixth message */}
          <div className="chat-message" id="typing6" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Sixth message */}
          <div className="chat-message" id="msg6" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar6">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 max-w-[80%]">This will only take 20 seconds, and you'll be one step closer to your £100 gift card.</div>
          </div>

          {/* Typing animation for seventh message */}
          <div className="chat-message" id="typing7" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Seventh message */}
          <div className="chat-message" id="msg7" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar7">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 max-w-[80%]">Just a few simple questions ahead.</div>
          </div>

          {/* Typing animation for eighth message */}
          <div className="chat-message" id="typing8" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Eighth message */}
          <div className="chat-message" id="msg8" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar8">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 max-w-[80%]">Click Begin Below To Start</div>
          </div>

          {/* Typing animation for ninth message */}
          <div className="chat-message" id="typing9" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Ninth message with BEGIN button */}
          <div className="chat-message" id="msg9" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar9">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            <button id="yes-btn-2" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors">BEGIN</button>
          </div>

          {/* Second user reply */}
          <div className="chat-message flex justify-end" id="user-reply-2" style={{display: 'none'}}>
            <div className="user-chat-bubble bg-orange-500 text-white p-3 rounded-lg mt-2">BEGIN</div>
            <div className="avatar-container ml-2">
              <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
            </div>
          </div>

          {/* Typing animation for final message */}
          <div className="chat-message" id="typing10" style={{display: 'none'}}>
            <div className="avatar-placeholder w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="chat-bubble bg-gray-100 p-3 rounded-lg mt-2 flex items-center space-x-1">
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
              <span className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>

          {/* Final message */}
          <div className="chat-message" id="msg10" style={{display: 'none'}}>
            <div className="avatar-container flex items-center">
              <div id="avatar10">
                <img src="/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
              </div>
            </div>
            {/* Final content would go here - this is left empty as it moves to the survey */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
