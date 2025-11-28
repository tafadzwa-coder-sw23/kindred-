import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Opportunity, UserProfile, AIMatchResult, Category } from './types';
import { OPPORTUNITIES, MOCK_USER } from './constants';
import { getSmartMatches } from './services/geminiService';
import { Button } from './components/Button';
import { OpportunityCard } from './components/OpportunityCard';
import { ArrowRight, Sparkles, Filter, CheckCircle, MapPin, Calendar, Clock, ArrowLeft, Heart, Share2, Award, User } from 'lucide-react';

function App() {
  // Views: 'landing', 'dashboard', 'profile', 'detail'
  const [currentView, setCurrentView] = useState<string>('landing');
  const [selectedOppId, setSelectedOppId] = useState<string | null>(null);
  
  // Data State
  const [userProfile] = useState<UserProfile>(MOCK_USER);
  const [matches, setMatches] = useState<AIMatchResult[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [hasMatched, setHasMatched] = useState(false);
  
  // Dashboard Filters
  const [filterCategory, setFilterCategory] = useState<string>('All');
  
  // Derived state for dashboard
  const filteredOpportunities = OPPORTUNITIES.filter(o => 
    filterCategory === 'All' || o.category === filterCategory
  );

  // Sort logic: if matches exist, put them first
  const sortedOpportunities = useMemo(() => {
    if (matches.length === 0) return filteredOpportunities;
    
    // Create a map for easy lookup
    const matchMap = new Map<string, AIMatchResult>();
    matches.forEach(m => matchMap.set(m.opportunityId, m));
    
    // Sort: matched items first (by score), then others
    return [...filteredOpportunities].sort((a, b) => {
      const matchA = matchMap.get(a.id);
      const matchB = matchMap.get(b.id);
      
      const scoreA = matchA ? matchA.score : -1;
      const scoreB = matchB ? matchB.score : -1;
      
      return scoreB - scoreA;
    });
  }, [filteredOpportunities, matches]);

  const handleRunMatching = async () => {
    setIsMatching(true);
    try {
        // Add a small artificial delay to show loading state effectively if API is super fast
        const [results] = await Promise.all([
             getSmartMatches(userProfile, OPPORTUNITIES),
             new Promise(resolve => setTimeout(resolve, 1500))
        ]);
        setMatches(results);
        setHasMatched(true);
        // Reset filter to see top matches clearly
        setFilterCategory('All'); 
    } catch (e) {
        console.error("Match failed", e);
    } finally {
        setIsMatching(false);
    }
  };

  const handleViewDetail = (id: string) => {
    setSelectedOppId(id);
    setCurrentView('detail');
    window.scrollTo(0,0);
  };

  // --- Views ---

  const LandingView = () => (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Hero */}
        <div className="relative bg-slate-900 text-white overflow-hidden flex-1 flex items-center">
            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-teal-400 ring-1 ring-inset ring-teal-400/30 bg-teal-400/10 mb-6">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI-Powered Matching
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                    Connect with Causes <br/>
                    <span className="text-teal-400">In Zimbabwe & Africa</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mb-10">
                    Kindred matches your skills and passions with local organizations making a real difference in our communities. Find your perfect volunteer opportunity today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" onClick={() => setCurrentView('dashboard')}>
                        Find Opportunities <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900" 
                        onClick={() => setCurrentView('profile')}
                    >
                        View My Profile
                    </Button>
                </div>
            </div>
        </div>
        
        {/* Features Preview */}
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <User className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Build Your Profile</h3>
                        <p className="text-slate-600">Tell us about your skills, languages, and availability to help locally.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Get Smart Matches</h3>
                        <p className="text-slate-600">Our AI connects you with opportunities from Harare to Victoria Falls.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Uplift Communities</h3>
                        <p className="text-slate-600">Support education, conservation, and health initiatives across the country.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  const DashboardView = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">
                    Makadii, {userProfile.name.split(' ')[0]}
                </h2>
                <p className="text-slate-600 mt-2">
                    {hasMatched 
                        ? `We found ${matches.length} opportunities that match your profile.` 
                        : "Ready to find your next volunteer opportunity in Zimbabwe?"}
                </p>
            </div>
            
            <div className="flex items-center gap-3">
                {!hasMatched ? (
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center gap-4">
                        <div>
                            <p className="text-indigo-900 font-semibold text-sm">Not sure where to start?</p>
                            <p className="text-indigo-700 text-xs">Let AI find the best fit for you.</p>
                        </div>
                        <Button 
                            variant="primary" 
                            onClick={handleRunMatching} 
                            isLoading={isMatching}
                            className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Smart Match
                        </Button>
                    </div>
                ) : (
                    <Button 
                        variant="outline" 
                        onClick={handleRunMatching} 
                        isLoading={isMatching}
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Refresh Matches
                    </Button>
                )}
            </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-4 overflow-x-auto">
            <div className="flex items-center text-slate-500 mr-2">
                <Filter className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Filters:</span>
            </div>
            <button
                onClick={() => setFilterCategory('All')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    filterCategory === 'All' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
            >
                All
            </button>
            {Object.values(Category).map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        filterCategory === cat 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedOpportunities.length > 0 ? (
                sortedOpportunities.map(opp => (
                    <OpportunityCard 
                        key={opp.id} 
                        opportunity={opp} 
                        onViewDetails={handleViewDetail}
                        matchData={matches.find(m => m.opportunityId === opp.id)}
                    />
                ))
            ) : (
                <div className="col-span-full py-20 text-center text-slate-500">
                    <p className="text-lg">No opportunities found for this category.</p>
                    <Button 
                        variant="ghost" 
                        className="mt-4" 
                        onClick={() => setFilterCategory('All')}
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    </div>
  );

  const DetailView = () => {
    const opp = OPPORTUNITIES.find(o => o.id === selectedOppId);
    if (!opp) return <div className="p-8 text-center">Opportunity not found</div>;

    const match = matches.find(m => m.opportunityId === opp.id);

    return (
        <div className="bg-white min-h-[calc(100vh-64px)]">
            {/* Hero Image */}
            <div className="relative h-64 md:h-80 lg:h-96 w-full">
                <img 
                    src={opp.imageUrl} 
                    alt={opp.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 max-w-7xl mx-auto">
                     <Button 
                        variant="outline" 
                        size="sm" 
                        className="mb-4 bg-white/20 border-white/40 text-white hover:bg-white/30 backdrop-blur-sm"
                        onClick={() => setCurrentView('dashboard')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
                    </Button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-sm">{opp.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-white/90">
                        <div className="flex items-center gap-2">
                            <img src={opp.organization.avatar} alt="" className="w-6 h-6 rounded-full border border-white/30" />
                            <span className="font-medium">{opp.organization.name}</span>
                        </div>
                        <span className="hidden md:inline text-white/40">•</span>
                        <span className="bg-teal-500/80 px-2 py-0.5 rounded text-sm backdrop-blur-sm">{opp.category}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {match && (
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex items-start gap-4">
                                <div className="bg-indigo-100 p-2 rounded-full shrink-0">
                                    <Sparkles className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-indigo-900 font-bold text-lg mb-1">It's a {match.score}% Match!</h3>
                                    <p className="text-indigo-800">{match.reason}</p>
                                </div>
                            </div>
                        )}

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">About this Opportunity</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">{opp.description}</p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Skills Required</h3>
                            <div className="flex flex-wrap gap-2">
                                {opp.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                        
                        <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                             <div className="flex items-center gap-4 mb-4">
                                <img src={opp.organization.avatar} alt="" className="w-16 h-16 rounded-full" />
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">{opp.organization.name}</h3>
                                    <p className="text-slate-500 text-sm">Organizer</p>
                                </div>
                             </div>
                             <p className="text-slate-600 italic">"{opp.organization.description}"</p>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Location</p>
                                        <p className="text-sm text-slate-600">{opp.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Date</p>
                                        <p className="text-sm text-slate-600">{opp.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Availability</p>
                                        <p className="text-sm text-slate-600">{opp.availability}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <User className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Spots</p>
                                        <p className="text-sm text-slate-600">{opp.spotsTotal - opp.spotsFilled} spots remaining</p>
                                        <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                                            <div 
                                                className="bg-teal-500 h-full rounded-full" 
                                                style={{ width: `${(opp.spotsFilled / opp.spotsTotal) * 100}%` }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full py-3" size="lg" onClick={() => alert("Application submitted! (This is a demo)")}>
                                Apply Now
                            </Button>
                            
                            <Button variant="outline" className="w-full mt-3" onClick={() => alert("Shared! (This is a demo)")}>
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const ProfileView = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-600"></div>
            <div className="px-8 pb-8">
                <div className="relative flex justify-between items-end -mt-12 mb-6">
                    <div className="bg-white p-1.5 rounded-full">
                        <div className="w-24 h-24 bg-slate-200 rounded-full overflow-hidden border-2 border-white">
                             <img 
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nyasha" 
                                alt="Avatar" 
                                className="w-full h-full"
                             />
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Profile</Button>
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900">{userProfile.name}</h1>
                <p className="text-slate-500 mb-6 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Harare, Zimbabwe
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">About Me</h3>
                        <p className="text-slate-600 mb-6">{userProfile.bio}</p>
                        
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Availability</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {userProfile.availability.map(day => (
                                <span key={day} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                    {day}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Interests</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {userProfile.interests.map(interest => (
                                <span key={interest} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                                    {interest}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {userProfile.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-yellow-800">
                        <Award className="w-8 h-8 shrink-0" />
                        <div>
                            <p className="font-bold">Total Impact</p>
                            <p className="text-sm opacity-90">You have volunteered 12 hours this year across 3 different organizations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
       <Navbar currentView={currentView} onChangeView={setCurrentView} />
       <main className="flex-grow">
          {currentView === 'landing' && <LandingView />}
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'detail' && <DetailView />}
          {currentView === 'profile' && <ProfileView />}
       </main>
       <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
         <p>© {new Date().getFullYear()} Kindred Zimbabwe. Connecting hearts with hands.</p>
       </footer>
    </div>
  );
}

export default App;