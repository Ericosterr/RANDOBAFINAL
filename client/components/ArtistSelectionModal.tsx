import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Calendar as CalendarIcon,
  Users,
  Music,
  Star,
  CheckCircle,
  X,
} from "lucide-react";

interface Artist {
  id: number;
  name: string;
  realName: string;
  genre: string;
  followers: string;
  image: string;
  description: string;
  achievements: string[];
  social: {
    instagram: string;
    tiktok: string;
    youtube: string;
  };
}

interface ArtistSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArtist: (artist: Artist) => void;
  selectedDate: Date | null;
  artists: Artist[];
}

export function ArtistSelectionModal({
  isOpen,
  onClose,
  onSelectArtist,
  selectedDate,
  artists,
}: ArtistSelectionModalProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "No date selected";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl text-white">
                Select an Artist
              </DialogTitle>
              <DialogDescription className="text-cyan-400">
                Choose an artist to book for {formatDate(selectedDate)}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {formatDate(selectedDate)}
            </Badge>
            <span className="text-gray-300 text-sm">Select from our elite roster</span>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {artists.map((artist) => (
            <Card
              key={artist.id}
              className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => onSelectArtist(artist)}
            >
              <div className="relative">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold text-white">
                    {artist.name}
                  </h3>
                  <p className="text-cyan-400 text-sm">{artist.genre}</p>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                  {artist.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Top Achievements
                  </h4>
                  <div className="space-y-1">
                    {artist.achievements.slice(0, 2).map((achievement, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span className="text-xs text-gray-400 truncate">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-300">Elite Artist</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 text-xs font-semibold"
                  >
                    <Music className="w-3 h-3 mr-1" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
