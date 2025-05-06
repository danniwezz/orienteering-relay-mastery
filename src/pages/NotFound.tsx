
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-forest-dark to-forest p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center">
          <div className="bg-compass p-4 rounded-full animate-pulse-slow">
            <MapPin className="h-12 w-12 text-forest-dark" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mt-6 mb-4 text-white">Off the Map!</h1>
        <p className="text-xl text-white/80 mb-8">
          Looks like you've wandered off the trail. This checkpoint doesn't exist on our orienteering map.
        </p>
        <div className="contour-line mb-8"></div>
        <Link to="/">
          <Button className="bg-compass hover:bg-compass-dark text-white">
            Return to Base Camp
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
