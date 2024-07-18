import Link from "next/link";
import { RiShoppingBag4Fill } from "react-icons/ri";


const CheckoutCancelledPage = () => {
    return (
      <div className="mt-48 text-center">
        <p className="text-red-500 mb-8 px-2 text-lg">Ooops! Your transaction was not completed. Please try again.</p>
        <Link
                  href="/buy-credits"
                  className="gradient-btn"
                >
                  <div className="flex justify-center items-center flex-1">
                    <span>
                        <RiShoppingBag4Fill className="h-5 w-5 mr-2" />
                    </span>
                    Buy Credits
                  </div>
              </Link>
      </div>
    )
  }

export default CheckoutCancelledPage;