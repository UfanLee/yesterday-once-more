// NEON DROWNING - Main JavaScript

// DOM Elements
const body = document.body;
const container = document.querySelector('.container');
const logo = document.querySelector('.logo');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const mediaUpload = document.getElementById('media-upload');
const fileInput = document.getElementById('file-input');
const mediaPreview = document.getElementById('media-preview');
const gradientBg = document.querySelector('.gradient-bg');

// Store uploaded files
let uploadedFiles = [];

// Dynamic background colors
const colors = [
    { pink: '#FF6B6B', blue: '#00C4CC' }, // Default - Sunburn Pink & Chlorine Blue
    { pink: '#FF9E7D', blue: '#7D67FF' }, // Sunset & Twilight
    { pink: '#FF5E87', blue: '#00D9B8' }, // Neon Pink & Mint
    { pink: '#FF7EB3', blue: '#7B68EE' }, // Bubblegum & Lavender
    { pink: '#FF8C42', blue: '#0096C7' }  // Tangerine & Ocean
];

let colorIndex = 0;
let isColorChanging = true;

// Initialize the page
function init() {
    // Create water droplets
    createWaterDroplets();
    
    // Start color changing
    startColorChange();
    
    // Add event listeners
    addEventListeners();
    
    // Add initial message after a delay
    setTimeout(() => {
        addMessage("欢迎来到霓虹溺水香氛体验。我可以帮你创建独特的香水配方，分析图片、音频或视频中的情绪，并将其转化为香调。请告诉我你想要什么样的香水，或上传媒体让我获取灵感。", false);
    }, 2000);
}

// Create water droplet elements
function createWaterDroplets() {
    for (let i = 0; i < 15; i++) {
        const droplet = document.createElement('div');
        droplet.classList.add('droplet');
        
        // Random size
        const size = Math.random() * 10 + 5;
        droplet.style.width = `${size}px`;
        droplet.style.height = `${size}px`;
        
        // Random position
        droplet.style.left = `${Math.random() * 100}%`;
        droplet.style.top = `${Math.random() * 100}%`;
        
        // Random delay
        const delay = Math.random() * 10;
        droplet.style.animationDelay = `${delay}s`;
        
        body.appendChild(droplet);
    }
}

// Start color changing animation
function startColorChange() {
    if (!isColorChanging) return;
    
    setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        const newColors = colors[colorIndex];
        
        document.documentElement.style.setProperty('--pink', newColors.pink);
        document.documentElement.style.setProperty('--blue', newColors.blue);
        
        // Update gradient background
        gradientBg.style.background = `linear-gradient(135deg, ${newColors.pink}, ${newColors.blue})`;
    }, 30000); // Change every 30 seconds
}

// Add all event listeners
function addEventListeners() {
    // Add ripple effect on click
    document.addEventListener('click', createRippleEffect);
    
    // Media upload handling
    mediaUpload.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', handleFileUpload);
    
    // Send message events
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Scroll effects
    window.addEventListener('scroll', handleScroll);
}

// Create ripple effect on click
function createRippleEffect(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// Handle file upload
function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Add files to the uploadedFiles array
    uploadedFiles = [...uploadedFiles, ...files];
    
    // Show media preview
    updateMediaPreview();
}

// Update media preview
function updateMediaPreview() {
    // Clear current preview
    mediaPreview.innerHTML = '';
    
    if (uploadedFiles.length === 0) {
        mediaPreview.style.display = 'none';
        return;
    }
    
    // Show preview container
    mediaPreview.style.display = 'flex';
    
    // Add preview for each file
    uploadedFiles.forEach((file, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        if (file.type.startsWith('image/')) {
            // Image preview
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            previewItem.appendChild(img);
        } else if (file.type.startsWith('audio/')) {
            // Audio preview
            const audioPreview = document.createElement('div');
            audioPreview.className = 'audio-preview';
            audioPreview.innerHTML = '<i class="fas fa-music"></i>';
            previewItem.appendChild(audioPreview);
        } else if (file.type.startsWith('video/')) {
            // Video preview
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.muted = true;
            previewItem.appendChild(video);
        }
        
        // Add remove button
        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-media';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.addEventListener('click', () => {
            uploadedFiles.splice(index, 1);
            updateMediaPreview();
        });
        
        previewItem.appendChild(removeBtn);
        mediaPreview.appendChild(previewItem);
    });
}

// Add a message to the chat
function addMessage(message, isUser = false, mediaFiles = []) {
    // Show chat messages container if it's hidden
    if (chatMessages.style.display === 'none' || !chatMessages.style.display) {
        chatMessages.style.display = 'block';
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-message' : 'message ai-message';
    
    // Create text with dissolve effect
    const textSpan = document.createElement('span');
    textSpan.className = 'dissolve-text';
    textSpan.textContent = message;
    messageDiv.appendChild(textSpan);
    
    // Add media files if any
    if (mediaFiles.length > 0) {
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'message-media';
        
        mediaFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                // Image file
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.style.maxWidth = '100%';
                img.style.borderRadius = '8px';
                img.style.marginTop = '0.5rem';
                mediaContainer.appendChild(img);
            } else if (file.type.startsWith('audio/')) {
                // Audio file
                const audio = document.createElement('audio');
                audio.src = URL.createObjectURL(file);
                audio.controls = true;
                audio.style.width = '100%';
                audio.style.marginTop = '0.5rem';
                mediaContainer.appendChild(audio);
            } else if (file.type.startsWith('video/')) {
                // Video file
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.controls = true;
                video.style.maxWidth = '100%';
                video.style.borderRadius = '8px';
                video.style.marginTop = '0.5rem';
                mediaContainer.appendChild(video);
            }
        });
        
        messageDiv.appendChild(mediaContainer);
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Apply dissolve effect
    messageDiv.classList.add('dissolve-in');
}

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message && uploadedFiles.length === 0) {
        return;
    }
    
    // Add user message to chat
    addMessage(message, true, uploadedFiles);
    
    // Clear input
    chatInput.value = '';
    
    // Keep a copy of uploaded files for display
    const sentFiles = [...uploadedFiles];
    
    // Clear uploaded files
    uploadedFiles = [];
    updateMediaPreview();
    
    // Simulate AI response (in a real app, this would call the DeepSeek API)
    setTimeout(() => {
        let response;
        
        if (sentFiles.length > 0) {
            response = "我分析了你上传的媒体，这让我想到一款香水配方：\n\n顶调：柑橘、佛手柑、海盐\n中调：茉莉、紫罗兰叶、水生调\n基调：琥珀、麝香、雪松\n\n这款香水捕捉了霓虹灯下的水面反射，既有清新的水感，又有温暖的基调，就像在夏夜的泳池中沉浮。";
        } else if (message.toLowerCase().includes('香水') || message.toLowerCase().includes('气味') || message.toLowerCase().includes('香气')) {
            response = "基于你的描述，我推荐这款香水配方：\n\n顶调：柠檬、葡萄柚、薄荷\n中调：玫瑰、铃兰、海洋调\n基调：广藿香、香根草、琥珀\n\n这款香水融合了清新与深沉，就像在霓虹灯照耀下的水面，既有表面的活力，又有深处的神秘。";
        } else {
            response = "欢迎来到霓虹溺水香氛体验。我可以帮你创建独特的香水配方，分析图片、音频或视频中的情绪，并将其转化为香调。请告诉我你想要什么样的香水，或上传媒体让我获取灵感。";
        }
        
        addMessage(response, false);
    }, 1500);
}

// Handle scroll effects
function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Parallax effect for background
    gradientBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    
    // Add underwater blur effect when scrolling
    if (scrollPosition > 100) {
        container.classList.add('underwater-blur');
    } else {
        container.classList.remove('underwater-blur');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
