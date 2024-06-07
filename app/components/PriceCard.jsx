import { GoCheckCircle } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";



export const PriceCard = ({name, cost, features}) => {


    return (
        <div className="border-2 border-gray-200 rounded-md h-[420px] w-[90%] max-w-[250px] p-4 grid place-items-center cursor-pointer hover:shadow-lg">
            <div className="flex flex-col">
                <span className="font-roboto text-gray-400 font-medium text-2xl mb-4 text-center">{name}</span>
                <span className="font-roboto text-gray-500 text-4xl text-center">{cost}</span>
                <hr className="my-8 border-gray-300"></hr>
                <ul className="text-gray-600 font-light text-sm font-roboto">
                    {features.map((feature) => (
                        <li className="flex items-center py-2">
                            <FaCheckCircle className="me-2 text-green-500" size={15} />{feature}
                        </li>
                    ))}
                </ul>
                <hr className="my-8 border-gray-300"></hr>
                <button className="btn font-roboto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0">Buy Credits</button>
            </div>
        </div>
    )

}