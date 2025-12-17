// State Management
let currentPage = 'home';
let sidebarOpen = true;
let expandedSubjects = {};
let expandedChapters = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeChapters();
    showHome();
});

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon');
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.remove('hidden');
        menuIcon.className = 'fas fa-times';
    } else {
        sidebar.classList.add('hidden');
        menuIcon.className = 'fas fa-bars';
    }
}

// Toggle Subject
function toggleSubject(subjectId) {
    const subjectContent = document.getElementById(`subject-${subjectId}`);
    const icon = document.getElementById(`subject-icon-${subjectId}`);
    
    expandedSubjects[subjectId] = !expandedSubjects[subjectId];
    
    if (expandedSubjects[subjectId]) {
        subjectContent.classList.add('expanded');
        icon.className = 'fas fa-chevron-down';
    } else {
        subjectContent.classList.remove('expanded');
        icon.className = 'fas fa-chevron-right';
    }
}

// Toggle Chapter
function toggleChapter(chapterId) {
    const chapterSections = document.getElementById(`sections-${chapterId}`);
    const icon = document.getElementById(`icon-${chapterId}`);
    
    expandedChapters[chapterId] = !expandedChapters[chapterId];
    
    if (expandedChapters[chapterId]) {
        chapterSections.classList.add('expanded');
        icon.className = 'fas fa-chevron-down';
    } else {
        chapterSections.classList.remove('expanded');
        icon.className = 'fas fa-chevron-right';
    }
}

// Initialize Chapters in Sidebar
function initializeChapters() {
    const subjectContent = document.getElementById('subject-intro-business');
    
    chapters.forEach(chapter => {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-item';
        
        const chapterHeader = document.createElement('button');
        chapterHeader.className = 'chapter-header';
        chapterHeader.onclick = () => toggleChapter(chapter.id);
        chapterHeader.innerHTML = `
            <span>Ch ${chapter.number}: ${chapter.title}</span>
            <i class="fas fa-chevron-right" id="icon-${chapter.id}"></i>
        `;
        
        const sectionsDiv = document.createElement('div');
        sectionsDiv.className = 'chapter-sections';
        sectionsDiv.id = `sections-${chapter.id}`;
        
        sections.forEach(section => {
            const sectionBtn = document.createElement('button');
            sectionBtn.className = `section-btn ${section.class}`;
            sectionBtn.onclick = () => showSection(chapter.id, section.id, chapter);
            sectionBtn.innerHTML = `
                <i class="fas ${section.icon}"></i>
                <span>${section.label}</span>
            `;
            sectionsDiv.appendChild(sectionBtn);
        });
        
        chapterDiv.appendChild(chapterHeader);
        chapterDiv.appendChild(sectionsDiv);
        subjectContent.appendChild(chapterDiv);
    });
}

// Show Home Page
function showHome() {
    currentPage = 'home';
    const contentArea = document.getElementById('content-area');
    
    contentArea.innerHTML = `
        <div class="home-content">
            <h1>Welcome to Your Study Hub</h1>
            <p class="subtitle">Your comprehensive learning platform for mastering business concepts and economics</p>
            
            <div class="course-overview">
                <h2>Course Overview</h2>
                <p>Introduction to Business - 17 Chapters</p>
                <p style="font-size: 14px; color: #6b7280;">OpenStax Textbook</p>
            </div>
            
            <div class="feature-grid">
                <div class="feature-card textbook">
                    <i class="fas fa-book-open"></i>
                    <h3>Textbooks</h3>
                    <p>Access comprehensive course materials</p>
                </div>
                <div class="feature-card study-guide">
                    <i class="fas fa-file-lines"></i>
                    <h3>Study Guides</h3>
                    <p>Review key concepts and summaries</p>
                </div>
                <div class="feature-card study-games">
                    <i class="fas fa-gamepad"></i>
                    <h3>Study Games</h3>
                    <p>Learn through interactive activities</p>
                </div>
                <div class="feature-card vocabulary">
                    <i class="fas fa-spell-check"></i>
                    <h3>Vocabulary</h3>
                    <p>Master essential terminology</p>
                </div>
            </div>
        </div>
    `;
    
    // Update active nav item
    updateActiveNavItem('home');
}

// Show Section Content
function showSection(chapterId, sectionId, chapter) {
    currentPage = `intro-business-${chapterId}-${sectionId}`;
    const contentArea = document.getElementById('content-area');
    
    // Show vocabulary for Chapter 1
    if (chapterId === 'ch1' && sectionId === 'vocabulary') {
        showVocabulary(chapter);
    } else {
        // Show placeholder for other sections
        contentArea.innerHTML = `
            <div class="chapter-content">
                <h2>${chapter.title}</h2>
                <p class="chapter-number">Chapter ${chapter.number}</p>
                
                <div class="content-box">
                    <h3>${sections.find(s => s.id === sectionId).label}</h3>
                    <p>Content coming soon for this section</p>
                </div>
                
                <p style="color: #6b7280;">Select a different chapter or section from the sidebar to explore more content.</p>
            </div>
        `;
    }
    
    // Update active nav item
    updateActiveNavItem(currentPage);
}

// Show Vocabulary Page
function showVocabulary(chapter) {
    const contentArea = document.getElementById('content-area');
    const vocabList = vocabularyData.chapter1;
    
    let vocabHTML = `
        <div class="vocab-header">
            <h1>Chapter 1 Vocabulary</h1>
            <p class="chapter-title">${chapter.title}</p>
            <p class="term-count">${vocabList.length} terms</p>
        </div>
        <div class="vocab-grid">
    `;
    
    vocabList.forEach(item => {
        vocabHTML += `
            <div class="vocab-card">
                <h3>${item.term}</h3>
                <p>${item.definition}</p>
            </div>
        `;
    });
    
    vocabHTML += '</div>';
    contentArea.innerHTML = vocabHTML;
}

// Update Active Navigation Item
function updateActiveNavItem(pageId) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item, .section-btn').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current item
    if (pageId === 'home') {
        document.querySelector('.home-btn').classList.add('active');
    } else {
        document.querySelectorAll('.section-btn').forEach(btn => {
            const btnPage = btn.onclick.toString();
            if (btnPage.includes(pageId)) {
                btn.classList.add('active');
            }
        });
    }
}

// Mobile responsive handling
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.add('hidden');
        sidebarOpen = false;
    }
});
