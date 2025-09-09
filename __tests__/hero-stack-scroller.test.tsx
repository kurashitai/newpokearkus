import { render, screen } from '@testing-library/react';
import { HeroStackScroller } from '../components/hero-stack-scroller';

// Mock next/image to avoid issues with static image optimization during tests
jest.mock('next/image', () => {
  return ({ alt, ...props }: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img alt={alt} {...props} />;
  };
});

// Mock next/link to avoid issues with routing during tests
jest.mock('next/link', () => {
  return ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>;
  };
});

// Mock framer-motion to avoid issues with animations during tests
jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useScroll: () => ({ scrollY: { current: 0 } }),
    useTransform: () => 0,
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  return {
    ChevronDown: () => <div data-testid="chevron-down-icon" />,
    Play: () => <div data-testid="play-icon" />,
    Download: () => <div data-testid="download-icon" />,
    MapPin: () => <div data-testid="map-pin-icon" />,
  };
});

describe('HeroStackScroller', () => {
  it('renders the component with correct aspect ratio', () => {
    render(<HeroStackScroller />);
    
    const container = screen.getByRole('banner');
    expect(container).toBeInTheDocument();
    
    // Check that the container has the correct aspect ratio class
    expect(container).toHaveClass('aspect-video');
  });

  it('renders the banner content', () => {
    render(<HeroStackScroller />);
    
    // Check that the title is rendered
    expect(screen.getByText('PokeArkus')).toBeInTheDocument();
    
    // Check that the subtitle is rendered
    expect(screen.getByText('The Ultimate Pokemon Experience')).toBeInTheDocument();
    
    // Check that the description is rendered
    expect(screen.getByText(/Embark on an epic journey/i)).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<HeroStackScroller />);
    
    // Check that navigation indicators are rendered
    const indicators = screen.getAllByRole('button', { name: /Go to slide/i });
    expect(indicators).toHaveLength(3);
  });
});