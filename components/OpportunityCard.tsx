import React from 'react';
import { Calendar, MapPin, Users, Star } from 'lucide-react';
import { Opportunity, AIMatchResult } from '../types';
import { Button } from './Button';

interface Props {
  opportunity: Opportunity;
  onViewDetails: (id: string) => void;
  matchData?: AIMatchResult;
}

export const OpportunityCard: React.FC<Props> = ({ opportunity, onViewDetails, matchData }) => {
  const isFull = opportunity.spotsFilled >= opportunity.spotsTotal;
  const isHighMatch = matchData && matchData.score > 80;

  return (
    <div 
      className={`group relative bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full ${
        isHighMatch 
          ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
          : 'border-slate-200'
      }`}
    >
      {/* AI Match Badge */}
      {matchData && (
        <div className={`absolute top-3 right-3 z-10 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-in fade-in zoom-in duration-300 ${
            isHighMatch 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 ring-1 ring-white/30' 
            : 'bg-slate-800/80 backdrop-blur-sm'
        }`}>
           {isHighMatch ? <Star className="w-3 h-3 fill-current" /> : '✨'} 
           {matchData.score}% Match
        </div>
      )}

      <div className="relative h-48 overflow-hidden">
        <img 
          src={opportunity.imageUrl} 
          alt={opportunity.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2 py-1 rounded shadow-sm">
          {opportunity.category}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
           <img 
             src={opportunity.organization.avatar} 
             alt={opportunity.organization.name} 
             className="w-6 h-6 rounded-full"
           />
           <span className="text-sm text-slate-500">{opportunity.organization.name}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
          {opportunity.title}
        </h3>

        {matchData && (
          <p className={`text-xs p-2 rounded mb-3 border ${
              isHighMatch 
              ? 'text-indigo-700 bg-indigo-50 border-indigo-100 font-medium' 
              : 'text-slate-600 bg-slate-50 border-slate-100'
          }`}>
            "{matchData.reason}"
          </p>
        )}

        <div className="space-y-2 mb-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="truncate">{opportunity.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span>{opportunity.spotsFilled}/{opportunity.spotsTotal} spots filled</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {isFull ? 'Full' : 'Open'}
            </span>
            <Button size="sm" variant={isHighMatch ? 'primary' : 'outline'} onClick={() => onViewDetails(opportunity.id)}>
              View Details
            </Button>
        </div>
      </div>
    </div>
  );
};