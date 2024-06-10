import Link from "next/link";


const SuccessCheckoutPage = () => {
    return (
      <div className="mt-44 text-center">
        <p className="text-green-500 mb-8 text-lg">Your transaction was successful!</p>
        <Link className="btn btn-secondary text-gray-100" href="/settings">View My Credits</Link>
      </div>  
    )
  }

export default SuccessCheckoutPage;
