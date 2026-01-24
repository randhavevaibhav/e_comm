import { Toast } from "react-hot-toast";

export const CustomSuccessToast = ({t,message,dataTest=""}:{t:Toast; message:string,dataTest?:string})=>{

    return ( <div
    data-test={dataTest}
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="shrink-0 pt-0.5">
         
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Success
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {message}
          </p>
        </div>
      </div>
    </div>
  </div>)
}