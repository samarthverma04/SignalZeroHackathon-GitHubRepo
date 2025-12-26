import { MapPin, Calendar, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface Item {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  status: "available" | "claimed" | "returned";
  description: string;
}

interface ItemCardProps {
  item: Item;
}

const statusColors = {
  available: "bg-success/10 text-success border-success/20",
  claimed: "bg-warning/10 text-warning border-warning/20",
  returned: "bg-muted text-muted-foreground border-muted",
};

const statusLabels = {
  available: "Available",
  claimed: "Claim Pending",
  returned: "Returned",
};

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge
          variant="outline"
          className={`absolute top-3 right-3 ${statusColors[item.status]}`}
        >
          {statusLabels[item.status]}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-display font-semibold text-lg line-clamp-1">{item.title}</h3>
          <Badge variant="secondary" className="shrink-0">
            <Tag className="h-3 w-3 mr-1" />
            {item.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {item.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {item.date}
          </span>
        </div>

        <Link to={`/item/${item.id}`}>
          <Button variant="outline" className="w-full group/btn">
            View Details
            <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
