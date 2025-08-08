import { Star } from "lucide-react";
// ...
<div className="flex items-center mt-1">
  {[...Array(5)].map((_, i) => (
    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
  ))}
</div>