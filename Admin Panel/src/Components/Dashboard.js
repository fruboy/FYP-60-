import LineChart from "./LineChart";
import BarChart from "./BarChart";


export default function Dashboard() {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-4 lg:px-4">
          {/* Replace with your content */}

          <div>
            <div className='flex sm:px-20 space-x-10 sm:space-x-10'>
              <div className="rounded-md shadow-md flex  max-w-xs relative cursor-pointer transition duration-50 transform hover:scale-100">
                <div className='rounded-md bg-gray-200' style={{ width: 250, height: 150 }}>
                  <p className="text-gray-800 font-bold text-l flex justify-center items-center justify-self-center mt-5">Total Salons</p>
                  <div className='flex justify-center items-center justify-self-center mt-5 '>
                    <p className="text-gray-800 font-bold text-4xl flex justify-center items-center justify-self-center">136</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md shadow-md flex  max-w-xs relative cursor-pointer transition duration-50 transform hover:scale-100">
                <div className='rounded-md bg-indigo-200' style={{ width: 250, height: 150 }}>
                  <p className="text-gray-800 font-bold text-l flex justify-center items-center justify-self-center mt-5">Total Customers</p>
                  <div className='flex justify-center items-center justify-self-center mt-5 '>
                    <p className="text-indigo-800 font-bold text-4xl flex justify-center items-center justify-self-center">348</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md shadow-md flex  max-w-xs relative cursor-pointer transition duration-50 transform hover:scale-100">
                <div className='rounded-md bg-green-200' style={{ width: 250, height: 150 }}>
                  <p className="text-green-800 font-bold text-l flex justify-center items-center justify-self-center mt-5">Total Sales</p>
                  <div className='flex justify-center items-center justify-self-center mt-5 '>
                    <p className="text-green-800 font-bold text-4xl flex justify-center items-center justify-self-center">225000</p>
                    <p className="text-green-500 font-normal text-l flex justify-center items-center justify-self-center">pkr</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md shadow-md flex  max-w-xs relative cursor-pointer transition duration-50 transform hover:scale-100">
                <div className='rounded-md bg-yellow-200' style={{ width: 250, height: 150 }}>
                  <p className="text-gray-800 font-bold text-l flex justify-center items-center justify-self-center mt-5">Sales this month</p>
                  <div className='flex justify-center items-center justify-self-center mt-5 '>
                    <p className="text-yellow-800 font-bold text-4xl flex justify-center items-center justify-self-center">67890</p>
                    <p className="text-yellow-500 font-normal text-l flex justify-center items-center justify-self-center">pkr</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* /End replace */}
          <div className={'md:grid md:grid-cols-3 md:gap-6 mt-20 py-5 px-20'} >
            <div className="col-span-3 md:col-span-2">
              <div className="max-w-3xl">
                <LineChart />
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <div className={"max-w-sm"}>
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}