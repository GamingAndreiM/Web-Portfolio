// ========== MEDIA MODAL FUNCTIONS ==========

// Open modal from card using data attributes (para sa Video)
function openVideoModalFromCard(card) {
    // Get the hidden div with data attributes
    const dataDiv = card.querySelector('div[style="display: none;"]');
    if (!dataDiv) {
        console.error('Data attributes not found!');
        return;
    }
    
    // Extract data from attributes
    const imgSrc = dataDiv.dataset.img;
    const title = dataDiv.dataset.title;
    const desc = dataDiv.dataset.desc;
    const tools = JSON.parse(dataDiv.dataset.tools || '[]');
    const tag = dataDiv.dataset.tag;
    const tagIcon = dataDiv.dataset.tagicon;
    const videoUrl = dataDiv.dataset.video;
    
    // Call openVideoModal with the extracted data
    openVideoModal(imgSrc, title, desc, tools, tag, tagIcon, videoUrl);
}

// Open video modal with play button
function openVideoModal(imgSrc, title, desc, tools, tag, tagIcon, videoUrl) {
    const modal = document.getElementById('mediaModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTools = document.getElementById('modalTools');
    const modalTag = document.getElementById('modalTag');
    const playBtn = document.getElementById('videoPlayBtn');
    const videoLink = document.getElementById('videoLink');
    
    if (!modal) return;
    
    // Set content
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalTag.innerHTML = `<i class="bi ${tagIcon}"></i> ${tag}`;
    
    // Clear and populate tools
    modalTools.innerHTML = '';
    if (Array.isArray(tools)) {
        tools.forEach(tool => {
            const span = document.createElement('span');
            span.className = 'skill-badge text-xs';
            span.textContent = tool;
            modalTools.appendChild(span);
        });
    }
    
    // Show video play button
    if (playBtn && videoLink) {
        playBtn.style.display = 'block';
        videoLink.href = videoUrl;
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open regular modal (for Graphics and Photos)
function openModal(imgSrc, title, desc, tools, tag, tagIcon) {
    const modal = document.getElementById('mediaModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTools = document.getElementById('modalTools');
    const modalTag = document.getElementById('modalTag');
    const playBtn = document.getElementById('videoPlayBtn');
    
    if (!modal) return;
    
    // Hide video play button (for non-video items)
    if (playBtn) {
        playBtn.style.display = 'none';
    }
    
    // Set content
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalTag.innerHTML = `<i class="bi ${tagIcon}"></i> ${tag}`;
    
    // Clear and populate tools
    modalTools.innerHTML = '';
    if (Array.isArray(tools)) {
        tools.forEach(tool => {
            const span = document.createElement('span');
            span.className = 'skill-badge text-xs';
            span.textContent = tool;
            modalTools.appendChild(span);
        });
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('mediaModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('mediaModal');
    if (modal && modal.classList.contains('active')) {
        const modalContent = modal.querySelector('.media-modal-content');
        if (!modalContent.contains(e.target) && !e.target.closest('.media-modal-close')) {
            closeModal();
        }
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('mediaModal');
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
    }
});

console.log('JavaScript loaded successfully!');