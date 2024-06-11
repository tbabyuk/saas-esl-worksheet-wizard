"use client"

import { useRouter } from "next/navigation";


export const OutOfCreditsModal = ({trialModalRef}) => {

  const router = useRouter();

  return (
        <dialog id="my_modal_3" ref={trialModalRef} className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center">Ooops! You are all out of credits!</h3>
                <p className="py-4">To continue using the app, you will need to get more credits.</p>
                <div className="text-center mt-4">
                    <button className="btn gradient-btn text-gray-100" onClick={() => router.push("/buy-credits")}>Buy Credits</button>
                </div>
            </div>
        </dialog>  
    )
}