


const PricingSection = () => {
  return (
    <div className="min-h-[90vh] py-20 px-5 md:px-12">
        <p className="text-center text-4xl mb-12">Choose Your Plan</p>
        <div className="flex justify-center flex-wrap gap-3">
            <div className="bg-primary-light rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:bg-[#142766] hover:scale-110">
                <div className="flex flex-col">
                    <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">1 - Day Pass</span>
                    <span className="font-roboto font-bold text-gray-200 text-4xl text-center">$5.00</span>
                    <hr className="my-8"></hr>
                    <span className="text-lg text-gray-200 text-center">Unlimited Downloads</span>
                    <hr className="my-8"></hr>
                    <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
                </div>
            </div>
            <div className="bg-primary-light rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:bg-[#142766] hover:scale-110">
                <div className="flex flex-col">
                    <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">7 - Day Pass</span>
                    <span className="font-roboto font-bold text-gray-200 text-4xl text-center">$10.00</span>
                    <hr className="my-8"></hr>
                    <span className="text-lg text-gray-200 text-center">Unlimited Downloads</span>
                    <hr className="my-8"></hr>
                    <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
                </div>
            </div>
            <div className="bg-primary-light rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:bg-[#142766] hover:scale-110">
                <div className="flex flex-col">
                    <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">14 - Day Pass</span>
                    <span className="font-roboto font-bold text-gray-200 text-4xl text-center">$15.00</span>
                    <hr className="my-8"></hr>
                    <span className="text-lg text-gray-200 text-center">Unlimited Downloads</span>
                    <hr className="my-8"></hr>
                    <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
                </div>
            </div>
            <div className="bg-primary-light rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:bg-[#142766] hover:scale-110">
                <div className="flex flex-col">
                    <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">30 - Day Pass</span>
                    <span className="font-roboto font-bold text-gray-200 text-4xl text-center">$25.00</span>
                    <hr className="my-8"></hr>
                    <span className="text-lg text-gray-200 text-center">Unlimited Downloads</span>
                    <hr className="my-8"></hr>
                    <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PricingSection