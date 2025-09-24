// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active navigation link based on scroll position
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initialize active nav
    updateActiveNav();
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .award-item, .about-text, .contact-info');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle (for future mobile navigation)
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        
        // Add mobile styles
        const mobileStyles = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #333;
                    cursor: pointer;
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                
                .nav-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #f5f5f5;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
                
                .nav-menu.active {
                    display: flex;
                }
                
                .nav-item {
                    margin: 10px 0;
                }
            }
        `;
        
        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = mobileStyles;
        document.head.appendChild(styleSheet);
        
        // Add button to navbar
        navbar.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Parallax effect for hero section
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }
    
    // Apply parallax effect on scroll
    window.addEventListener('scroll', parallaxEffect);
    
    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Smooth reveal animation for sections
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.section');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial call
    
    // Logo Loop Enhancement
    function initLogoLoop() {
        const logoLoop = document.querySelector('.logo-loop');
        const logoTrack = document.querySelector('.logo-track');
        
        if (!logoLoop || !logoTrack) return;
        
        let isHovered = false;
        let animationSpeed = 1;
        
        // Smooth animation control
        function updateAnimationSpeed() {
            const speed = isHovered ? 0 : animationSpeed;
            logoTrack.style.animationPlayState = speed === 0 ? 'paused' : 'running';
        }
        
        // Mouse events
        logoLoop.addEventListener('mouseenter', () => {
            isHovered = true;
            updateAnimationSpeed();
        });
        
        logoLoop.addEventListener('mouseleave', () => {
            isHovered = false;
            updateAnimationSpeed();
        });
        
        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    logoTrack.style.animationPlayState = 'running';
                } else {
                    logoTrack.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(logoLoop);
        
        // Add click handlers for logo links (if needed)
        const logoItems = document.querySelectorAll('.logo-item');
        logoItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    // Add a subtle click effect
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }
            });
        });
    }
    
    // Initialize logo loop
    initLogoLoop();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Update active navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const seeMoreBtns = document.querySelectorAll('.see-more-btn');
    
    // Project data for modals
    const projectData = {
        'winstone-projects': {
            title: 'Winstone Projects LLP',
            description: 'Leading real estate development and strategic project management company specializing in innovative residential and commercial developments.',
            image: 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/WhatsApp%20Image%202025-09-24%20at%2014.54.10_b75dda90.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9XaGF0c0FwcCBJbWFnZSAyMDI1LTA5LTI0IGF0IDE0LjU0LjEwX2I3NWRkYTkwLmpwZyIsImlhdCI6MTc1ODcwNTkwMSwiZXhwIjoxNzkwMjQxOTAxfQ.GUe6SmZmGz6ZP7z2X-fSV5War3RRykXHEs91VZFkL9M',
            details: `
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Residential Townships:</strong> Comprehensive township development and planning</li>
                    <li><strong>Commercial Projects:</strong> Strategic commercial real estate development</li>
                    <li><strong>Land Development:</strong> Expert land utilization and development</li>
                    <li><strong>Project Management:</strong> End-to-end project management services</li>
                </ul>
            `
        },
        'winstone-motors': {
            title: 'Winstone Motors',
            description: 'Smart Car Buying & Selling Platform revolutionizing the automotive marketplace with technology-driven solutions.',
            image: 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/Screenshot%202025-09-24%20150253.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9TY3JlZW5zaG90IDIwMjUtMDktMjQgMTUwMjUzLnBuZyIsImlhdCI6MTc1ODcwNjQ3MCwiZXhwIjoxNzkwMjQyNDcwfQ.PArNoC5ELoLIqK3O3_CAw7AIrgH949mDJyzkDZR7fnQ',
            details: `
                <h3>Platform Features</h3>
                <ul>
                    <li><strong>Smart Matching:</strong> AI-powered vehicle matching system</li>
                    <li><strong>Secure Transactions:</strong> Safe and secure buying/selling process</li>
                    <li><strong>Vehicle History:</strong> Comprehensive vehicle history reports</li>
                    <li><strong>Mobile App:</strong> User-friendly mobile application</li>
                </ul>
            `
        },
        'daxido': {
            title: 'Daxido',
            description: 'A ride hailing platform providing convenient and reliable transportation services with modern technology.',
            image: 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/WhatsApp%20Image%202025-09-24%20at%2015.08.31_0ac3f510.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9XaGF0c0FwcCBJbWFnZSAyMDI1LTA5LTI0IGF0IDE1LjA4LjMxXzBhYzNmNTEwLmpwZyIsImlhdCI6MTc1ODcwNjgzMCwiZXhwIjoxNzkwMjQyODMwfQ.IiyDXWRWANBsuBkqFkIjcGuCbBP0t07qUaPR3-Shw6Y',
            details: `
                <h3>Service Features</h3>
                <ul>
                    <li><strong>Real-time Tracking:</strong> Live GPS tracking for rides</li>
                    <li><strong>Multiple Vehicle Types:</strong> Various vehicle options available</li>
                    <li><strong>Driver Verification:</strong> Thorough driver background checks</li>
                    <li><strong>Cashless Payments:</strong> Secure digital payment options</li>
                </ul>
            `
        },
        'chai-habibi': {
            title: 'Chai Habibi',
            description: 'Redefining India\'s Chai Culture with innovative blends and modern presentation of traditional tea experiences.',
            image: 'https://buyaobcbfdfuhqlonous.supabase.co/storage/v1/object/sign/site%20images/WhatsApp%20Image%202025-09-24%20at%2015.06.10_04c068e4.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjdiYmRhYy01OWJmLTQ0ZDEtYTk5ZC0yMzJjYzg2ZjA2ZWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaXRlIGltYWdlcy9XaGF0c0FwcCBJbWFnZSAyMDI1LTA5LTI0IGF0IDE1LjA2LjEwXzA0YzA2OGU0LmpwZyIsImlhdCI6MTc1ODcwNjYyNiwiZXhwIjoxNzkwMjQyNjI2fQ.PdGKvZLPxt1V_rSdnXRnPfY-2E5YExOB-vGfpYv-YTQ',
            details: `
                <h3>Chai Experience</h3>
                <ul>
                    <li><strong>Premium Blends:</strong> Curated selection of premium tea blends</li>
                    <li><strong>Modern Presentation:</strong> Contemporary take on traditional chai</li>
                    <li><strong>Cultural Heritage:</strong> Preserving India's rich tea culture</li>
                    <li><strong>Quality Ingredients:</strong> Fresh, high-quality ingredients</li>
                </ul>
            `
        }
    };
    
    // Open modal function
    function openModal(projectId) {
        const project = projectData[projectId];
        if (project) {
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalImage').src = project.image;
            document.getElementById('modalImage').alt = project.title;
            document.getElementById('modalDetails').innerHTML = project.details;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Event listeners for See More buttons
    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    // Event listeners for Card Open buttons
    const cardOpenBtns = document.querySelectorAll('.card-open-btn');
    cardOpenBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of it
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});