document.addEventListener('DOMContentLoaded', () => {
    // 1. Modal Functionality
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    const openModalBtns = document.querySelectorAll('.btn-open-modal');

    const projectData = {
        '1': {
            title: 'EcoTrack Mobile App',
            description: 'Detailed view: EcoTrack uses real-time data to help users monitor their carbon footprint. Developed with a focus on color psychology and accessible data visualization.',
            tags: ['UI Design', 'UX Research', 'Mobile']
        },
        '2': {
            title: 'Lumina E-Commerce',
            description: 'Detailed view: Lumina is a high-performance e-commerce platform. The design prioritizes speed and clarity, reducing cognitive load for shoppers.',
            tags: ['E-commerce', 'Responsive', 'Web']
        },
        '3': {
            title: 'Zenith Dashboard',
            description: 'Detailed view: Zenith provides a distraction-free environment for project management. It features a dark mode by default to reduce eye strain.',
            tags: ['SaaS', 'Dashboard', 'Interactive']
        }
    };

    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p style="margin: 1.5rem 0; color: #94a3b8;">${project.description}</p>
            <div class="skills-grid">
                ${project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
            <a href="#" class="btn btn-primary" style="margin-top: 2rem; display: inline-block;">View Live Demo</a>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        modalClose.focus(); // Accessibility: Move focus to modal
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 2. Form Submission Handling (Mock)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            
            // Visual feedback for submission
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = 'Message Sent!';
                submitBtn.style.background = '#10b981'; // Green
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 3. Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Subtle Parallax for Hero Blobs
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');
        
        if (blob1 && blob2) {
            const moveX = (mouseX - window.innerWidth / 2) / 50;
            const moveY = (mouseY - window.innerHeight / 2) / 50;
            
            blob1.style.transform = `translate(${moveX}px, ${moveY}px)`;
            blob2.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }
    });
});
