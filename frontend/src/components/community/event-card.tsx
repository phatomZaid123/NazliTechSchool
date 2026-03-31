import { motion } from "framer-motion";
import { Heart, Calendar, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  likes: number;
  attendees: number;
  isLiked: boolean;
  onLike: (id: number) => void;
}

export function EventCard({
  id,
  title,
  date,
  time,
  location,
  status,
  likes,
  attendees,
  isLiked,
  onLike,
}: EventCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-background to-background/80 border-border/50 h-full">
        <div className="p-4">
          <div className="mb-3">
            <Badge
              className={`text-xs ${
                status === "This Week"
                  ? "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30"
                  : "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
              }`}
            >
              {status}
            </Badge>
          </div>

          <h3 className="font-bold text-sm mb-4 line-clamp-2">{title}</h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">{date}</p>
                <p className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
              {location}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-t border-border/50">
            <span className="flex items-center gap-1 pt-3">
              👥 {attendees} attending
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 h-8 text-xs gap-1"
              onClick={() => onLike(id)}
            >
              <Heart
                className={`w-3 h-3 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {likes}
            </Button>
            <Button className="flex-1 h-8 text-xs bg-gradient-to-r from-primary to-accent hover:shadow-lg">
              Attend
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
