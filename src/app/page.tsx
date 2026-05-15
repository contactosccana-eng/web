import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import SocialFeed from "@/components/SocialFeed";
import Events from "@/components/Events";
import WeeklyActivities from "@/components/WeeklyActivities";

export default function Home() {
  return (
    <>
      <Hero />
      <Events />
      <WeeklyActivities />
      <SocialFeed />
      <InfoSection />
    </>
  );
}
