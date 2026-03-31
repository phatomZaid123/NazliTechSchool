import { motion } from "framer-motion";
import { Heart, Share2, Eye, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  avatar: string;
  date: string;
  category: string;
  reads: number;
  likes: number;
  isLiked: boolean;
  onLike: (id: number) => void;
}

export function BlogCard({
  id,
  title,
  excerpt,
  author,
  avatar,
  date,
  category,
  reads,
  likes,
  isLiked,
  onLike,
}: BlogCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-background to-background/80 border-border/50 h-full">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">{avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">
                {author}
              </p>
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
          </div>

          <Badge variant="outline" className="mb-3 text-xs">
            {category}
          </Badge>

          <h3 className="font-bold text-sm mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
            {excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {reads}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              Comments
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
