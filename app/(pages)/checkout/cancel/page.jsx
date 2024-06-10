import Link from "next/link";


const CancelCheckoutPage = () => {
    return (
      <div className="mt-44 text-center">
        <p className="text-red-500 mb-8 text-lg">Ooops! Your transaction was not completed. Please try again.</p>
        <Link className="btn btn-secondary text-gray-100" href="/buy-credits">Buy Credits</Link>
      </div>
    )
  }

export default CancelCheckoutPage;