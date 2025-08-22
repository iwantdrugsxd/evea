'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FloatingNavbar from '@/components/layout/FloatingNavbar';
import EnhancedVendorCard from '@/components/marketplace/EnhancedVendorCard';
import { Search, Filter, MapPin, Star, TrendingUp, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { EVENT_CATEGORIES } from '@/data/enhanced-services';

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
    ...EVENT_CATEGORIES
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingNavbar />
        
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-blue-900/60 z-10"></div>
          <Image
            src="/images/hero/image copy.png"
            alt="Marketplace Hero"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Discover Amazing Event Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Find the perfect vendors for your next event. From photography to catering, 
              we connect you with the best professionals in the industry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/plan-event"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
            >
              Plan Your Event
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center border border-white/20">
              <Sparkles className="mr-2 w-5 h-5" />
              Browse Services
            </button>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for services, vendors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-white bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg placeholder-white/60"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Service Categories Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Explore Service Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 p-6 text-center cursor-pointer group"
                onClick={() => {
                  setSelectedCategory(category.id);
                  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                <h3 className="font-semibold text-white text-sm">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 space-y-6 lg:space-y-0"
        >
          <div className="flex flex-col space-y-4">
            <span className="text-white/80 font-medium">Filter by Category:</span>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white/10 text-white/80 border-white/20 hover:border-blue-400 hover:bg-blue-500/20 backdrop-blur-lg'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/80 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white backdrop-blur-lg"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value} className="bg-gray-800">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="results-section" 
          className="mb-8"
        >
          <p className="text-white/60">
            Showing {filteredCards.length} of {cards.length} services
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-red-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Error Loading Services</h3>
            <p className="text-white/60 mb-4">{error}</p>
            <button
              onClick={fetchCards}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 animate-pulse">
                <div className="h-48 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-2/3"></div>
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
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {filteredCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <EnhancedVendorCard card={card} />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Load More Button */}
                {hasMore && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-12"
                  >
                    <button
                      onClick={() => {
                        setCurrentPage(prev => prev + 1);
                        // You can implement load more functionality here
                      }}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Load More Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <p className="text-sm text-white/60 mt-4">
                      Showing {filteredCards.length} of {totalCards} services
                    </p>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-white/40 mb-6">
                  <Search className="h-20 w-20 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-white mb-4">
                  No services found
                </h3>
                <p className="text-white/60 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

