import Badge from "@/components/Badge";
import Card from "@/components/ui/Card";
import { MoonIcon } from "@radix-ui/react-icons";

const HomePage = () => {
  return (<div className="min-h-svh grid grid-rows-[auto_1fr_auto]">


  <main className="container">
     
    
  <Badge rating={4.3} moonIcon={MoonIcon} />
  <Card />
  </main>


</div>
)
};

export default HomePage;