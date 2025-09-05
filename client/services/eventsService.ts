// Event data service for CMS integration
export interface CMSEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  price: number;
  category: 'Workshop' | 'Masterclass' | 'Live Event' | 'Course';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  spotsLeft: number;
  totalSpots: number;
  rating: number;
  instructor: string;
  duration: string;
  featured: boolean;
  slug: string;
}

// Fallback data (used when CMS is not available)
const fallbackEvents: CMSEvent[] = [
  {
    id: "festival-2025",
    title: "RANDOBA Festival 2025",
    description: "Our biggest annual celebration featuring 50+ international DJs across 5 stages. Experience the ultimate electronic music festival.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    date: "August 15-17, 2025",
    location: "Festival Grounds",
    price: 299,
    category: "Live Event",
    level: "All Levels",
    spotsLeft: 2847,
    totalSpots: 5000,
    rating: 4.9,
    instructor: "Various Artists",
    duration: "3 Days",
    featured: true,
    slug: "randoba-festival-2025"
  },
  {
    id: "masters-workshop",
    title: "Legendary Masters Workshop",
    description: "Exclusive masterclass with world-renowned DJ legends. Learn advanced techniques and industry secrets from the best in the business.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
    date: "July 22, 2025",
    location: "Grand Studio",
    price: 499,
    category: "Masterclass",
    level: "Advanced",
    spotsLeft: 3,
    totalSpots: 15,
    rating: 5.0,
    instructor: "DJ Apex & DJ Luna",
    duration: "6 hours",
    featured: true,
    slug: "legendary-masters-workshop"
  },
  {
    id: "underground-collective",
    title: "Underground Collective",
    description: "Intimate underground sessions featuring emerging talents and experimental sounds. Connect with the underground scene.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
    date: "Every Friday",
    location: "Secret Venues",
    price: 45,
    category: "Live Event",
    level: "All Levels",
    spotsLeft: 25,
    totalSpots: 80,
    rating: 4.7,
    instructor: "Collective Artists",
    duration: "4 hours",
    featured: true,
    slug: "underground-collective"
  },
  {
    id: "production-bootcamp",
    title: "Production Bootcamp",
    description: "Intensive 3-day bootcamp covering everything from beat making to mixing and mastering. All equipment included.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F065d4eeff664478e9b30ef2b27067306%2F856683a2f17c44d9ac1aca38e297dec7?format=webp&width=800",
    date: "September 5-7, 2025",
    location: "Production Lab",
    price: 899,
    category: "Course",
    level: "Intermediate",
    spotsLeft: 12,
    totalSpots: 20,
    rating: 4.8,
    instructor: "Alex Waves",
    duration: "3 Days",
    featured: true,
    slug: "production-bootcamp"
  },
  {
    id: "vinyl-revival",
    title: "Vinyl Revival Experience",
    description: "Discover the art of vinyl DJing with rare records and classic techniques. Hands-on experience with professional turntables.",
    image: "https://images.unsplash.com/photo-1556388406-9c8faa2c4a86?w=600&h=400&fit=crop",
    date: "August 10, 2025",
    location: "Vintage Studio",
    price: 199,
    category: "Workshop",
    level: "Beginner",
    spotsLeft: 8,
    totalSpots: 16,
    rating: 4.6,
    instructor: "Classic Carl",
    duration: "5 hours",
    featured: true,
    slug: "vinyl-revival-experience"
  },
  {
    id: "rooftop-sessions",
    title: "Rooftop Sunset Sessions",
    description: "Magical sunset performances with breathtaking city views. Network with fellow music lovers while enjoying amazing sets.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    date: "Every Weekend",
    location: "Sky Terrace",
    price: 75,
    category: "Live Event",
    level: "All Levels",
    spotsLeft: 45,
    totalSpots: 120,
    rating: 4.8,
    instructor: "Various DJs",
    duration: "3 hours",
    featured: true,
    slug: "rooftop-sunset-sessions"
  }
];

// CMS Service class
class EventsService {
  private builderApiKey: string | null = null;
  private builderModelName = 'events';

  constructor() {
    // Initialize with Builder.io API key from environment
    this.builderApiKey = import.meta.env.VITE_BUILDER_API_KEY || null;
  }

  // Fetch events from Builder.io CMS
  async fetchEvents(): Promise<CMSEvent[]> {
    if (!this.builderApiKey) {
      console.warn('Builder.io API key not found, using fallback data');
      return fallbackEvents;
    }

    try {
      const response = await fetch(
        `https://cdn.builder.io/api/v3/content/${this.builderModelName}?apiKey=${this.builderApiKey}&limit=20&fields=data`
      );

      if (!response.ok) {
        throw new Error(`Builder.io API error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.results && result.results.length > 0) {
        return result.results.map((item: any) => item.data);
      }

      return fallbackEvents;
    } catch (error) {
      console.error('Error fetching events from Builder.io:', error);
      return fallbackEvents;
    }
  }

  // Fetch a single event by slug
  async fetchEventBySlug(slug: string): Promise<CMSEvent | null> {
    const events = await this.fetchEvents();
    return events.find(event => event.slug === slug) || null;
  }

  // Get featured events
  async getFeaturedEvents(): Promise<CMSEvent[]> {
    const events = await this.fetchEvents();
    return events.filter(event => event.featured);
  }

  // Get events by category
  async getEventsByCategory(category: string): Promise<CMSEvent[]> {
    const events = await this.fetchEvents();
    return events.filter(event => event.category === category);
  }
}

export const eventsService = new EventsService();
export default eventsService;
