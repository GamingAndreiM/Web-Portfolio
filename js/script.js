// ========== MEDIA MODAL FUNCTIONS ==========

// Open video modal with video player (supports both local files and YouTube embed)
function openVideoModal(videoSrc, posterImg, title, desc, tools, tag, tagIcon, isYouTube) {
    console.log('openVideoModal called!');
    console.log('Video source:', videoSrc);
    console.log('Is YouTube:', isYouTube);
    
    const modal = document.getElementById('mediaModal');
    const overlay = document.getElementById('videoPlayOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTools = document.getElementById('modalTools');
    const modalTag = document.getElementById('modalTag');
    const wrapper = document.getElementById('videoPlayerWrapper');
    const videoContainer = document.getElementById('videoContainer');
    const imageWrapper = document.getElementById('imageWrapper');
    const modalImg = document.getElementById('modalImg');
    
    if (!modal) {
        console.error('Modal not found!');
        return;
    }
    
    // Clear previous video content
    if (videoContainer) {
        videoContainer.innerHTML = '';
    }
    
    // HIDE image wrapper using class
    if (imageWrapper) {
        imageWrapper.classList.add('hidden');
        imageWrapper.style.display = 'none';
        imageWrapper.style.height = '0';
    }
    if (modalImg) {
        modalImg.style.display = 'none';
        modalImg.src = '';
    }
    
    // SHOW video player wrapper
    if (wrapper) {
        wrapper.style.display = 'flex';
        wrapper.style.visibility = 'visible';
        wrapper.style.opacity = '1';
        wrapper.style.height = '450px';
        wrapper.classList.add('active');
    }
    
    // Reset overlay
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        overlay.classList.remove('hidden');
        overlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        overlay.style.margin = '0';
        overlay.style.padding = '0';
        overlay.onclick = function(e) {
            e.stopPropagation();
            playModalVideo();
        };
    }
    
    // Set video source - YouTube or Local
    if (videoSrc && videoSrc !== '') {
        if (isYouTube) {
            // YouTube Embed
            const iframe = document.createElement('iframe');
            iframe.src = videoSrc;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.margin = '0';
            iframe.style.padding = '0';
            iframe.style.display = 'block';
            videoContainer.appendChild(iframe);
            
            // Hide overlay for YouTube
            if (overlay) {
                overlay.style.display = 'none';
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                overlay.classList.add('hidden');
            }
            
            console.log('YouTube embed loaded!');
        } else {
            // Local video file
            const video = document.createElement('video');
            video.controls = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'contain';
            video.style.background = '#000';
            video.style.margin = '0';
            video.style.padding = '0';
            video.style.display = 'block';
            
            const source = document.createElement('source');
            source.src = videoSrc;
            source.type = 'video/mp4';
            video.appendChild(source);
            
            if (posterImg) {
                video.poster = posterImg;
            }
            
            videoContainer.appendChild(video);
            
            // Show overlay for local video
            if (overlay) {
                overlay.style.display = 'flex';
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
                overlay.classList.remove('hidden');
                overlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
                overlay.onclick = function(e) {
                    e.stopPropagation();
                    playModalVideo();
                };
            }
            
            console.log('Local video loaded!');
        }
    } else {
        // No video source (coming soon)
        videoContainer.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,0.5);font-size:2rem;margin:0;padding:0;"><i class="bi bi-clock-history"></i> Coming Soon</div>';
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
    
    // Set content
    if (modalTitle) modalTitle.textContent = title || 'Untitled';
    if (modalDesc) modalDesc.textContent = desc || 'No description available.';
    if (modalTag) modalTag.innerHTML = `<i class="bi ${tagIcon || 'bi-film'}"></i> ${tag || 'Video'}`;
    
    // Clear and populate tools
    if (modalTools) {
        modalTools.innerHTML = '';
        if (Array.isArray(tools) && tools.length > 0) {
            tools.forEach(tool => {
                const span = document.createElement('span');
                span.className = 'skill-badge text-xs';
                span.textContent = tool;
                modalTools.appendChild(span);
            });
        }
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Modal opened!');
}

// Play modal video (for local videos only)
function playModalVideo() {
    console.log('playModalVideo called!');
    const videoContainer = document.getElementById('videoContainer');
    const overlay = document.getElementById('videoPlayOverlay');
    
    if (!videoContainer) {
        console.log('Video container not found!');
        return;
    }
    
    const video = videoContainer.querySelector('video');
    
    if (video) {
        console.log('Attempting to play local video...');
        video.controls = true;
        video.style.display = 'block';
        
        if (overlay) {
            overlay.style.display = 'none';
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.classList.add('hidden');
        }
        
        var playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(function() {
                console.log('Video is playing!');
                video.controls = true;
            }).catch(function(error) {
                console.log('Play error:', error);
                video.controls = true;
                if (error.name === 'NotSupportedError') {
                    alert('Video format not supported. Please try a different browser.');
                } else if (error.name === 'NotAllowedError') {
                    alert('Please click the video to play.');
                    video.controls = true;
                }
            });
        }
    } else {
        console.log('No video element found (YouTube embed detected)');
    }
}

// Open regular modal (for Graphics and Photos)
function openModal(imgSrc, title, desc, tools, tag, tagIcon) {
    console.log('openModal called!');
    console.log('Image source:', imgSrc);
    
    const modal = document.getElementById('mediaModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTools = document.getElementById('modalTools');
    const modalTag = document.getElementById('modalTag');
    const wrapper = document.getElementById('videoPlayerWrapper');
    const overlay = document.getElementById('videoPlayOverlay');
    const imageWrapper = document.getElementById('imageWrapper');
    const videoContainer = document.getElementById('videoContainer');
    
    if (!modal) {
        console.error('Modal not found!');
        return;
    }
    
    // Clear video container
    if (videoContainer) {
        videoContainer.innerHTML = '';
    }
    
    // HIDE video player
    if (wrapper) {
        wrapper.style.display = 'none';
        wrapper.style.visibility = 'hidden';
        wrapper.style.opacity = '0';
        wrapper.classList.remove('active');
    }
    
    // SHOW image wrapper - remove hidden class
    if (imageWrapper) {
        imageWrapper.classList.remove('hidden');
        imageWrapper.style.display = 'flex';
        imageWrapper.style.height = '450px';
        imageWrapper.style.visibility = 'visible';
        imageWrapper.style.opacity = '1';
        imageWrapper.style.pointerEvents = 'auto';
        imageWrapper.style.alignItems = 'center';
        imageWrapper.style.justifyContent = 'center';
        imageWrapper.style.width = '100%';
        imageWrapper.style.background = 'rgba(0, 0, 0, 0.3)';
        imageWrapper.style.overflow = 'hidden';
        console.log('Image wrapper shown');
    }
    
    // SHOW image
    if (modalImg) {
        modalImg.style.display = 'block';
        modalImg.style.visibility = 'visible';
        modalImg.style.opacity = '1';
        modalImg.src = imgSrc || '';
        modalImg.style.width = '100%';
        modalImg.style.height = '100%';
        modalImg.style.objectFit = 'contain';
        modalImg.style.padding = '1rem';
        modalImg.style.background = 'transparent';
        console.log('Image set to:', modalImg.src);
    }
    
    // Reset overlay
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        overlay.classList.remove('hidden');
        overlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    }
    
    // Set content
    if (modalTitle) modalTitle.textContent = title || 'Untitled';
    if (modalDesc) modalDesc.textContent = desc || 'No description available.';
    if (modalTag) modalTag.innerHTML = `<i class="bi ${tagIcon || 'bi-image'}"></i> ${tag || 'Graphics'}`;
    
    // Clear and populate tools
    if (modalTools) {
        modalTools.innerHTML = '';
        if (Array.isArray(tools) && tools.length > 0) {
            tools.forEach(tool => {
                const span = document.createElement('span');
                span.className = 'skill-badge text-xs';
                span.textContent = tool;
                modalTools.appendChild(span);
            });
        }
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Modal opened with image!');
}

// Close modal
function closeModal() {
    console.log('closeModal called!');
    
    const modal = document.getElementById('mediaModal');
    const overlay = document.getElementById('videoPlayOverlay');
    const modalImg = document.getElementById('modalImg');
    const wrapper = document.getElementById('videoPlayerWrapper');
    const imageWrapper = document.getElementById('imageWrapper');
    const videoContainer = document.getElementById('videoContainer');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear video container
        if (videoContainer) {
            videoContainer.innerHTML = '';
        }
        
        // Hide video wrapper
        if (wrapper) {
            wrapper.style.display = 'none';
            wrapper.style.visibility = 'hidden';
            wrapper.style.opacity = '0';
            wrapper.classList.remove('active');
        }
        
        // Show image wrapper - reset to default
        if (imageWrapper) {
            imageWrapper.classList.remove('hidden');
            imageWrapper.style.display = 'flex';
            imageWrapper.style.height = '450px';
            imageWrapper.style.visibility = 'visible';
            imageWrapper.style.opacity = '1';
            imageWrapper.style.pointerEvents = 'auto';
        }
        if (modalImg) {
            modalImg.style.display = 'block';
            modalImg.style.visibility = 'visible';
            modalImg.style.opacity = '1';
            modalImg.src = '';
        }
        
        // Reset overlay
        if (overlay) {
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            overlay.classList.remove('hidden');
            overlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        }
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('mediaModal');
    if (modal && modal.classList.contains('active')) {
        const modalContent = modal.querySelector('.media-modal-content');
        if (modalContent && !modalContent.contains(e.target) && !e.target.closest('.media-modal-close')) {
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