import {
    Inter,
    Outfit,
    Plus_Jakarta_Sans,
    Unbounded,
    Space_Mono,
    Orbitron,
    Syncopate
} from 'next/font/google'
import localFont from 'next/font/local'

export const fontInter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
})

export const fontOutfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-outfit',
    display: 'swap',
})

export const fontPlusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-plus-jakarta',
    display: 'swap',
})

export const fontUnbounded = Unbounded({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    variable: '--font-unbounded',
    display: 'swap',
})

export const fontSpaceMono = Space_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-space-mono',
    display: 'swap',
})

export const fontOrbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-orbitron',
    display: 'swap',
})

export const fontSyncopate = Syncopate({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-syncopate',
    display: 'swap',
})

// ============================================
// CUSTOM LOCAL FONTS
// Drop your .otf/.ttf files into public/fonts/
// ============================================

// Local fonts are managed via @font-face in globals.css to avoid path resolution issues

/* 
// Add more custom fonts like this:
export const fontCustomSecondary = localFont({
    src: '../../public/fonts/AnotherFont.otf',
    variable: '--font-custom-secondary',
    display: 'swap',
})
*/

// Centralized string containing all font CSS variables to add to layout body
export const allFontsVariables = [
    fontInter.variable,
    fontOutfit.variable,
    fontPlusJakartaSans.variable,
    fontUnbounded.variable,
    fontSpaceMono.variable,
    fontOrbitron.variable,
    fontSyncopate.variable,

    // Local fonts like Venus are loaded via globals.css @font-face
].join(' ')
