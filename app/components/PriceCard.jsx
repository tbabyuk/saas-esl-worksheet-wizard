


export const PriceCard = ({name, cost, features}) => {


    return (
        <div className="bg-primary rounded-md shadow-md h-[400px] w-[90%] max-w-[280px] p-4 grid place-items-center cursor-pointer hover:scale-105">
            <div className="flex flex-col">
                <span className="font-roboto font-light text-gray-200 text-2xl mb-10 text-center">{name}</span>
                <span className="font-roboto font-bold text-gray-200 text-4xl text-center">{cost}</span>
                <hr className="my-8"></hr>
                <span className="text-lg text-gray-200 text-center">{features}</span>
                <hr className="my-8"></hr>
                <button className="btn btn-accent text-gray-200">CHOOSE PLAN</button>
            </div>
        </div>
    )

}