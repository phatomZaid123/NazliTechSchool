import { motion } from "framer-motion";
import { Heart, Share2, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  category: string;
  isLiked: boolean;
  onLike: (id: number) => void;
}

export function VideoCard({
  id,
  title,
  instructor,
  thumbnail,
  duration,
  views,
  likes,
  category,
  isLiked,
  onLike,
}: VideoCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-background to-background/80 border-border/50 h-full">
        <div className="relative bg-slate-900 h-40 flex items-center justify-center group">
          <div className="text-7xl opacity-40 group-hover:opacity-60 transition-opacity">
            {thumbnail}
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-0 h-0 border-l-6 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="absolute bottom-2 right-2 text-xs"
          >
            {duration}
          </Badge>
        </div>

        <div className="p-4">
          <Badge variant="outline" className="mb-2 text-xs">
            {category}
          </Badge>

          <h3 className="font-bold text-sm mb-2 line-clamp-2">{title}</h3>

          <p className="text-xs text-muted-foreground mb-4">by {instructor}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {views}
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
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 h-8 text-xs gap-1"
            >
              <Share2 className="w-3 h-3" />
              Share
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
