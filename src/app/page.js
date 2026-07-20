import DashboardStats from "@/component/DashboardStats";
import Hero from "@/component/Hero";
import LatestItems from "@/component/LatestItems";
import PlatformCTA from "@/component/PlatformCTA";
import PlatformFAQ from "@/component/PlatformFAQ";
import PlatformFeatures from "@/component/PlatformFeatures";
import RegionCatalogs from "@/component/RegionCatalogs";
import TravelAesthetics from "@/component/TravelAesthetics";


export default function Home() {
  return (
    <>
      <Hero />
       <LatestItems />
      <TravelAesthetics />
      <PlatformFeatures />
      <RegionCatalogs/>
      <DashboardStats/>
      <PlatformFAQ />
      <PlatformCTA />
    </>

  );
}
