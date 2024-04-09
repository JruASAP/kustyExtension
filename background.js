chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fetchAttachments') {
    const apiUrl = `https://zzz-drew-cristobal.api.kustomerapp.com/v1/conversations/${request.conversationId}/attachments`;
    const apiKey = '';
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
   .then(data => {
      const attachmentUrls = data.data.map(attachment => attachment.links.related); // Adjust based on actual structure
      
      // Download each attachment
      attachmentUrls.forEach(url => {
        chrome.downloads.download({
          url: url,
          conflictAction: 'uniquify'
        });
      });

      sendResponse({status: 'success'});
    })
    .catch(error => {
      console.error('Error fetching attachments:', error);
      sendResponse({status: 'error', error: error.toString()});
    });
    return true; // Indicates that the response will be sent asynchronously
  };
});
