

import { PriceCard } from "@/app/components/PriceCard";


const planOptions = [
  {
      name: "20 Credits",
      cost: "$5.00",
      features: ["20 worksheet generations", "unlimited email support"]
  },
  {
      name: "50 Credits",
      cost: "$10.00",
      features: ["50 worksheet generations", "unlimited email support"]
  },
  {
      name: "100 Credits",
      cost: "$15.00",
      features: ["100 worksheet generations", "unlimited email support"]
  },
]


const BuyCreditsPage = () => {
  return (
    <div className="text-2xl mb-10 font-semibold text-center font-lora">
        <div className="font-lora text-3xl font-light py-14">Choose a plan that suits your needs:</div>
        <div className="flex justify-center flex-wrap gap-6">
              {planOptions.map((plan, index) => <PriceCard key={index} plan={plan} />)}
        </div>
    </div>
  )
}

export default BuyCreditsPage;