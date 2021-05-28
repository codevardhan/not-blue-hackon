chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from == "content_script") {
        console.log("yaay")
        chrome.notifications.create('', {
            title: 'Everything is fine',
            message: 'We have alerted your close ones, hang tight. ',
            iconUrl: 'icon128.png',
            type: 'basic'}
            );
    }
});

