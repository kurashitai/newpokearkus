# Website Background Update and Navigation Fixes

## Overview

This design document outlines the changes required to update the website background, adjust the banner size on the homepage, and fix navigation issues. The changes include:

1. Replacing the current background with `background.gif`
2. Adjusting the homepage banner to 70% of screen size
3. Fixing navigation centering issues across different screen sizes
4. Correcting the mobile dropdown menu functionality for screens 768px and below

## Current Implementation Analysis

### Background System
- Currently using `POKEARKUS.jpg` as the background image in `app/globals.css`
- Background is applied to the `body` element with cover sizing and center positioning
- A gradient overlay is applied using a pseudo-element

### Navigation System
- Navigation component is implemented in `components/navigation.tsx`
- Uses a fixed positioning with complex centering logic
- Desktop menu is absolutely positioned with `left: 1/2` and `transform: translateX(-1/2)`
- Mobile menu uses a slide-in panel from the right
- Mobile menu state is managed through Zustand store (`lib/store.ts`)

### Homepage Banner
- Banner implementation is in `components/hero-stack-scroller.tsx`
- Currently set to `h-[70vh] lg:h-[80vh]` (70-80% of viewport height)
- Uses a stack of images with auto-scrolling functionality

## Design Changes

### 1. Background Update

#### Current Implementation
```css
body {
  background-image: url("/POKEARKUS.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}
```

#### Proposed Changes
- Replace `POKEARKUS.jpg` with `background.gif`
- Maintain the same sizing and positioning properties
- Keep the gradient overlay for better text readability

#### Implementation Plan
1. Update the CSS in `app/globals.css` to reference `/background.gif` instead of `/POKEARKUS.jpg`
2. Preserve all existing background properties (size, position, attachment)
3. Maintain the gradient overlay for visual consistency

### 2. Banner Size Adjustment

#### Current Implementation
```tsx
<div className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
```

#### Proposed Changes
- Reduce the banner height to exactly 70% of the viewport height across all screen sizes
- Remove the conditional sizing between mobile and desktop

#### Implementation Plan
1. Modify the height class in `HeroStackScroller` component from `h-[70vh] lg:h-[80vh]` to `h-[70vh]`
2. Ensure the change applies consistently across all device sizes

### 3. Navigation Centering Fix

#### Current Issues
- Navigation bar uses `left-1/3` instead of `left-1/2` which causes misalignment
- The centering logic doesn't properly account for responsive behavior
- Logo and site name are centered, but menu items are not properly aligned

#### Current Implementation
```tsx
<motion.nav
  className={cn(
    "fixed top-4 left-1/3 -translate-x-1/2 z-50 w-[95%] max-w-5xl",
    // ... other classes
  )}
>
  {/* Logo on left */}
  <div className="flex-shrink-0 z-10">
    {/* Logo content */}
  </div>

  {/* Desktop Menu - Absolute Center */}
  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    {/* Menu items */}
  </div>
</motion.nav>
```

#### Proposed Changes
- Fix the main navigation container to use `left-1/2` instead of `left-1/3`
- Improve the centering logic for menu items
- Ensure consistent alignment across different screen sizes

#### Implementation Plan
1. Change `left-1/3` to `left-1/2` in the main navigation container
2. Review and adjust the centering logic for the desktop menu
3. Ensure proper spacing and alignment of all navigation elements

### 4. Mobile Dropdown Menu Fix

#### Current Issues
- Mobile menu may not be properly triggered on screens 768px and below
- State management through Zustand store appears correct
- CSS classes for responsive behavior need verification

#### Current Implementation
```tsx
{/* Mobile Menu Toggle */}
<motion.div
  className="lg:hidden"
>
  {/* Menu button */}
</motion.div>

{/* Mobile Menu Overlay */}
<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />
      
      {/* Mobile Menu */}
      <motion.div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-border z-50 lg:hidden">
        {/* Menu content */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

#### Proposed Changes
- Verify the responsive breakpoints (lg:hidden) properly target screens 768px and below
- Ensure the mobile menu toggle is visible and functional on smaller screens
- Confirm the mobile menu panel displays correctly with proper dimensions

#### Implementation Plan
1. Check that `lg:hidden` corresponds to the correct breakpoint (1024px)
2. If needed, adjust classes to ensure visibility on screens 768px and below
3. Verify the mobile menu toggle button is properly sized and positioned
4. Confirm the mobile menu panel has appropriate dimensions and styling

## Technical Implementation

### File Modifications

#### 1. Update Background Image (`app/globals.css`)
```css
body {
  background-image: url("/background.gif"); /* Changed from /POKEARKUS.jpg */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}
```

#### 2. Adjust Banner Height (`components/hero-stack-scroller.tsx`)
```tsx
<div className="relative h-[70vh] overflow-hidden">
  {/* Banner content - no change needed for height classes */}
</div>
```

#### 3. Fix Navigation Centering (`components/navigation.tsx`)
```tsx
<motion.nav
  className={cn(
    "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl", // Changed left-1/3 to left-1/2
    // ... other classes remain the same
  )}
>
```

#### 4. Verify Mobile Menu Responsiveness (`components/navigation.tsx`)
Ensure all mobile-specific classes properly target screens 768px and below:
- Check that `lg:hidden` is the appropriate class (targets <1024px)
- If needed, consider using `md:hidden` or custom breakpoints

### Responsive Considerations

1. **Background Image**:
   - Ensure `background.gif` is optimized for web use
   - Verify the GIF displays properly across different browsers
   - Confirm the gradient overlay maintains readability of content

2. **Banner Sizing**:
   - 70% viewport height should provide good visibility without dominating the page
   - Ensure content remains readable and accessible
   - Test on various screen sizes and aspect ratios

3. **Navigation Alignment**:
   - Test centering on various screen widths
   - Verify alignment with different content lengths
   - Ensure proper spacing between elements

4. **Mobile Menu**:
   - Test functionality on devices with screen widths of 768px and below
   - Verify menu toggle visibility and interaction
   - Confirm menu panel dimensions and content layout

## Testing Plan

### Visual Testing
1. Verify background.gif displays correctly across different browsers
2. Confirm banner height is consistently 70% of viewport height
3. Check navigation centering on various screen sizes (mobile, tablet, desktop)
4. Validate mobile menu functionality on screens 768px and below

### Functional Testing
1. Test navigation menu toggle on mobile devices
2. Verify all navigation links work correctly
3. Confirm theme toggle functionality remains intact
4. Check that auto-scrolling banner continues to function

### Responsive Testing
1. Test layout at various breakpoints:
   - Below 768px (mobile)
   - 768px-1023px (tablet)
   - 1024px and above (desktop)
2. Verify proper element alignment and spacing
3. Confirm no visual regressions in other components

## Performance Considerations

1. **Background GIF Optimization**:
   - Ensure `background.gif` is optimized for web use to minimize load times
   - Consider providing fallback for users with slow connections

2. **Banner Implementation**:
   - Maintain efficient image loading with Next.js Image component
   - Preserve existing performance optimizations

3. **Navigation Updates**:
   - Ensure minimal impact on rendering performance
   - Maintain existing animation smoothness

## Accessibility Considerations

1. **Background Contrast**:
   - Ensure the gradient overlay maintains sufficient contrast for content readability
   - Verify text remains legible over animated background

2. **Navigation Usability**:
   - Confirm keyboard navigation works properly after centering adjustments
   - Ensure screen reader compatibility is maintained

3. **Mobile Menu Accessibility**:
   - Verify mobile menu toggle has proper ARIA attributes
   - Confirm focus management when menu opens/closes