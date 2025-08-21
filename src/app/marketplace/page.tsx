'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FloatingNavbar from '@/components/layout/FloatingNavbar';
import EnhancedVendorCard from '@/components/marketplace/EnhancedVendorCard';
import { Search, Filter, MapPin, Star, TrendingUp, ArrowRight } from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  base_price: number;
  category_id: string;
  vendor_id: string;
  service_images: string[];
  average_rating: number;
  total_reviews: number;
  total_orders: number;
  created_at: string;
  updated_at: string;
  vendor: {
    business_name: string;
    location: string;
  };
  category: {
    name: string;
  };
}

export default function MarketplacePage() {
  const [cards, setCards] = useState<ServiceCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    fetchCards();
    
    // Handle URL parameters from create event form
    const urlParams = new URLSearchParams(window.location.search);
    const eventType = urlParams.get('eventType');
    const services = urlParams.get('services');
    const budget = urlParams.get('budget');
    
    if (eventType) {
      setSelectedCategory(eventType);
    }
    
    if (services) {
      const serviceArray = services.split(',');
      // You can add logic here to filter by specific services
      console.log('Filtering by services:', serviceArray);
    }
    
    if (budget) {
      // You can add budget filtering logic here
      console.log('Budget filter:', budget);
    }
  }, []);

  useEffect(() => {
    filterAndSortCards();
  }, [cards, searchQuery, selectedCategory, sortBy]);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      params.append('limit', '50'); // Fetch 50 cards at a time
      
      const response = await fetch(`/api/marketplace/cards?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched vendor cards:', data);
      setCards(data.cards || []);
      setHasMore(data.hasMore || false);
      setTotalCards(data.total || 0);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch cards');
      setCards([]); // Set empty array instead of mock data
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCards = () => {
    let filtered = [...cards];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.vendor?.business_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(card => card.category_id === selectedCategory);
    }

    // Sort cards
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.base_price - b.base_price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.base_price - a.base_price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.total_reviews || 0) - (a.total_reviews || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        // Relevance - keep original order
        break;
    }

    setFilteredCards(filtered);
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎉' },
    { id: '1', name: 'Photography & Video', icon: '📸' },
    { id: '2', name: 'Catering & Food', icon: '🍽️' },
    { id: '3', name: 'Decoration & Styling', icon: '🎨' },
    { id: '4', name: 'Music & Entertainment', icon: '🎵' },
    { id: '5', name: 'Transportation', icon: '🚗' },
    { id: '6', name: 'Venues & Locations', icon: '🏛️' },
    { id: '7', name: 'Wedding Services', icon: '💒' },
    { id: '8', name: 'Corporate Events', icon: '🏢' },
    { id: '9', name: 'Party Planning', icon: '🎊' },
    { id: '10', name: 'Beauty & Makeup', icon: '💄' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'newest', label: 'Newest First' }
  ];

    return (
      <div className="min-h-screen bg-gray-50">
      <FloatingNavbar />
        
          {/* Hero Section */}
      <section className="relative text-white">
        <div className="absolute inset-0">
          <img
            src="/images/hero/image copy.png"
            alt="Marketplace Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Services
                  </h1>
                         <p className="text-xl md:text-2xl mb-8 text-blue-100">
               Find the perfect vendors for your next event
             </p>
             
             {/* Create Event Button */}
             <div className="mb-8">
               <Link
                 href="/plan-event"
                 className="inline-flex items-center px-6 py-3 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
               >
                 Plan Your Event
                 <ArrowRight className="ml-2 h-5 w-5" />
               </Link>
             </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="text"
                  placeholder="Search for services, vendors, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
                      </div>
                    </motion.div>
            </div>
          </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Categories Showcase */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore Service Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 text-center cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category.id);
                  // Scroll to the results section
                  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
                {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex flex-col space-y-4">
            <span className="text-gray-700 font-medium">Filter by Category:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

              <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Sort by:</span>
                <select
                  value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
                </select>
          </div>
        </div>

                {/* Results Count */}
        <div id="results-section" className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCards.length} of {cards.length} services
          </p>
        </div>

                  {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Services</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchCards}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

                {/* Cards Grid */}
        {!loading && !error && (
          <>
            {filteredCards.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <EnhancedVendorCard card={card} />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => {
                        setCurrentPage(prev => prev + 1);
                        // You can implement load more functionality here
                      }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
                    >
                      Load More Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      Showing {filteredCards.length} of {totalCards} services
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
        </div>
    </div>
  );
}

