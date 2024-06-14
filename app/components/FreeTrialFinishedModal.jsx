import Link from "next/link"


export const FreeTrialFinishedModal = ({freeTrialFinishedModalRef}) => {

  return (
        <dialog id="my_modal_3" ref={freeTrialFinishedModalRef} className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center">Ooops! Your free trial is finished!</h3>
                <p className="py-4 text-center">To continue using the app, you will need to get credits.</p>
                <div className="text-center mt-4">
                    <Link href="/buy-credits" className="btn gradient-btn text-gray-100">Buy Credits</Link>
                </div>
            </div>
        </dialog>  
    )
}