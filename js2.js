// AI对话框功能
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        // 添加用户消息
        addMessage(message, 'user');
        input.value = '';
        
        // 模拟AI回复
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, 'ai');
        }, 1000);
    }
}

function addMessage(text, type) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    if (type === 'ai') {
        messageDiv.innerHTML = `<i class="fas fa-robot"></i><span>${text}</span>`;
    } else {
        messageDiv.innerHTML = `<span>${text}</span>`;
    }
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getAIResponse(message) {
    const responses = [
        "我明白你的问题，让我想想...",
        "这是一个很好的问题！",
        "我可以帮你解决这个问题。",
        "需要更多信息才能回答这个问题。",
        "让我为你查找相关信息。"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// 添加回车发送功能
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 