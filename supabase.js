// Supabase configuration
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2'

// Supabase project credentials
const supabaseUrl = 'https://buyaobcbfdfuhqlonous.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1eWFvYmNiZmRmdWhxbG9ub3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDQzMjcsImV4cCI6MjA3NDI4MDMyN30.xcUUjVcoTPQphHnjIG82AeUbOhc3aCBbjjBd3q06-Q4'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Test connection
export async function testConnection() {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .limit(1)
        
        if (error) {
            console.log('Supabase connection test:', error.message)
            return false
        }
        
        console.log('Supabase connected successfully!')
        return true
    } catch (err) {
        console.log('Supabase connection error:', err.message)
        return false
    }
}

// Initialize Supabase when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing Supabase...')
    await testConnection()
})
