// Data loader for Supabase integration
import { supabase } from './supabase.js'

// Load profile data
export async function loadProfileData() {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .single()
        
        if (error) throw error
        
        // Update page title and meta description
        document.title = `${data.full_name} - ${data.title} | ${data.company}`
        
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
            metaDescription.content = `${data.full_name} - ${data.title} at ${data.company}`
        }
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title')
        const heroTagline = document.querySelector('.hero-tagline')
        
        if (heroTitle) heroTitle.textContent = data.full_name
        if (heroTagline) heroTagline.textContent = `${data.title} | ${data.company}`
        
        // Update about section
        const aboutText = document.querySelector('.about-text')
        if (aboutText && data.bio) {
            aboutText.innerHTML = `<p>${data.bio}</p>`
        }
        
        // Update profile image
        const profileImage = document.querySelector('.about-photo')
        if (profileImage && data.profile_image_url) {
            profileImage.src = data.profile_image_url
            profileImage.alt = data.full_name
        }
        
        console.log('Profile data loaded successfully')
        return data
    } catch (error) {
        console.error('Error loading profile data:', error)
        return null
    }
}

// Load projects data
export async function loadProjectsData() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        
        const projectsGrid = document.querySelector('.projects-grid')
        if (projectsGrid && data) {
            projectsGrid.innerHTML = data.map(project => `
                <div class="project-card">
                    <div class="project-image">
                        <img src="${project.image_url}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                    </div>
                </div>
            `).join('')
        }
        
        console.log('Projects data loaded successfully')
        return data
    } catch (error) {
        console.error('Error loading projects data:', error)
        return null
    }
}

// Load awards data
export async function loadAwardsData() {
    try {
        const { data, error } = await supabase
            .from('awards')
            .select('*')
            .order('year', { ascending: false })
        
        if (error) throw error
        
        const awardsGrid = document.querySelector('.awards-grid')
        if (awardsGrid && data) {
            awardsGrid.innerHTML = data.map(award => `
                <div class="award-item">
                    <h3 class="award-title">${award.title}</h3>
                    <p class="award-year">${award.year}</p>
                </div>
            `).join('')
        }
        
        console.log('Awards data loaded successfully')
        return data
    } catch (error) {
        console.error('Error loading awards data:', error)
        return null
    }
}

// Load contact data
export async function loadContactData() {
    try {
        const { data, error } = await supabase
            .from('contact_info')
            .select('*')
            .single()
        
        if (error) throw error
        
        // Update contact information
        const contactEmail = document.querySelector('.contact-email')
        const contactPhone = document.querySelector('.contact-phone')
        const socialLinks = document.querySelector('.social-links')
        
        if (contactEmail && data.email) {
            contactEmail.textContent = data.email
        }
        
        if (contactPhone && data.phone) {
            contactPhone.textContent = data.phone
        }
        
        if (socialLinks && data) {
            const links = []
            if (data.linkedin_url) links.push(`<a href="${data.linkedin_url}" class="social-link">LinkedIn</a>`)
            if (data.instagram_url) links.push(`<a href="${data.instagram_url}" class="social-link">Instagram</a>`)
            if (data.behance_url) links.push(`<a href="${data.behance_url}" class="social-link">Behance</a>`)
            
            if (links.length > 0) {
                socialLinks.innerHTML = links.join('')
            }
        }
        
        console.log('Contact data loaded successfully')
        return data
    } catch (error) {
        console.error('Error loading contact data:', error)
        return null
    }
}

// Load all data
export async function loadAllData() {
    console.log('Loading all data from Supabase...')
    
    await Promise.all([
        loadProfileData(),
        loadProjectsData(),
        loadAwardsData(),
        loadContactData()
    ])
    
    console.log('All data loaded successfully!')
}

// Initialize data loading when DOM is ready
document.addEventListener('DOMContentLoaded', loadAllData)
