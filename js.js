/**
 * 留言板功能模块
 */
document.addEventListener('DOMContentLoaded', () => {
    initMessageBoard();
});

// 初始化留言板功能
function initMessageBoard() {
    const messageForm = document.getElementById('messageForm');
    const messageList = document.getElementById('messageList');

    if (!messageForm || !messageList) return;

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleMessageSubmit(messageForm, messageList);
    });
}

// 处理留言提交
function handleMessageSubmit(form, list) {
    // 获取表单数据
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const date = new Date().toLocaleDateString();

    // 创建新留言
    const messageItem = createMessageElement(name, message, date);

    // 添加到列表
    list.insertBefore(messageItem, list.firstChild);
    
    // 重置表单并显示提示
    form.reset();
    showNotification('留言发送成功', 'success');
}

// 创建留言元素
function createMessageElement(name, message, date) {
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.innerHTML = `
        <div class="message-header">
            <span class="message-author">
                <i class="fas fa-user-circle"></i> ${name}
            </span>
            <span class="message-date">${date}</span>
        </div>
        <div class="message-content">${message}</div>
    `;
    return messageItem;
}

/**
 * 通知提示功能
 * @param {string} message - 提示信息
 * @param {string} type - 提示类型（success/info）
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
} 