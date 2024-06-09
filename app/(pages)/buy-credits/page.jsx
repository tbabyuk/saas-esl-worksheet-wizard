import { PlanCard } from "@/app/components/PlanCard";


const planOptions = [
  {
      numCredits: 20,
      cost: "$5.00",
      features: ["20 worksheet generations", "unlimited email support"]
  },
  {
      numCredits: 50,
      cost: "$10.00",
      features: ["50 worksheet generations", "unlimited email support"]
  },
  {
      numCredits: 100,
      cost: "$15.00",
      features: ["100 worksheet generations", "unlimited email support"]
  },
]


const BuyCreditsPage = () => {
  return (
    <div className="text-2xl mb-10 font-semibold text-center font-lora">
        <div className="font-lora text-3xl font-light py-14">Choose a plan that suits your needs:</div>
        <div className="flex justify-center flex-wrap gap-6">
              {planOptions.map((plan, index) => (
                <PlanCard 
                  key={index} 
                  numCredits={plan.numCredits} 
                  cost={plan.cost} 
                  features={plan.features} />
                )
              )}
        </div>
    </div>
  )
}

export default BuyCreditsPage;