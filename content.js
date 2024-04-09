function extractConversationIds() {
  // Assume the conversation IDs are part of the class name for each conversation element
  // This selector targets elements with class names that contain conversation IDs
  const conversationElements = document.querySelectorAll('[class*="search-result-conversation-"]');
  const conversations = [];

  conversationElements.forEach(element => {
      // Extract class name and then ID
      const classList = Array.from(element.classList);
      const idClass = classList.find(className => className.includes('search-result-conversation-'));
      if (idClass) {
          // Extract the ID from the class name
          const id = idClass.split('-').pop();
          if (id) {
              conversations.push(id);
          }
      }
  });

  return conversations;
}


function listAttachments(conversationId) {
  // Placeholder for functionality to list attachments
  console.log(`Listing attachments for conversation ID: ${conversationId}`);

  // Example of sending a message to the background script
  // You would need to implement the receiving part in the background script.
  chrome.runtime.sendMessage({type: "fetchAttachments", conversationId: conversationId}, response => {
      console.log(response); // Handle the response
  });
}

// Assuming extractConversationIds works as intended and extracts the IDs
if(!window.conversationIds){
 window.conversationIds = extractConversationIds();
};
// console.log(conversationIds);

// Call listAttachments for each conversation ID
window.conversationIds.forEach(id => listAttachments(id));
