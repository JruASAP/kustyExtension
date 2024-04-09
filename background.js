chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fetchAttachments') {
    const apiUrl = `https://zzz-drew-cristobal.api.kustomerapp.com/v1/conversations/${request.conversationId}/attachments`;
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODFmYTM4YzU5ZjBhMzQzNGY4ODgxZCIsInVzZXIiOiI2NDgxZmEzOGM3YTU0MDNlZWUwMzk2MmIiLCJvcmciOiI1ZWZhMWNjNGRiODY2ZjAwMWEzYzIxNjQiLCJvcmdOYW1lIjoienp6LWRyZXctY3Jpc3RvYmFsIiwidXNlclR5cGUiOiJtYWNoaW5lIiwicG9kIjoicHJvZDEiLCJyb2xlcyI6WyJvcmciXSwiYXVkIjoidXJuOmNvbnN1bWVyIiwiaXNzIjoidXJuOmFwaSIsInN1YiI6IjY0ODFmYTM4YzdhNTQwM2VlZTAzOTYyYiJ9.iqk7anUF_GQno9jRUVpRAdDuW2pknBBe0d992yFXRxc'; // Store your API key securely and retrieve it here
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