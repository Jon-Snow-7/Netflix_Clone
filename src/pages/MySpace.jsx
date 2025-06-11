import Watchlist from '../components/Myspacecom/Watchlist';
import SideBar from '../components/SideBar';
import History from '../components/History';
import Footer from '../components/Footer';
const MySpace = () => {
  const username = 'John';
  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      {/* Sidebar (always visible on left) */}
      <div className=" fixed top-0 left-0 h-screen  z-50">
         <SideBar />
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden z-0">
        {/* Header with background image */}
        <div
          className="w-full h-[30vh] bg-cover bg-center relative z-10"
          style={{
            backgroundImage: `url('images/two.webp')`,
          }}
        >
          <div className="absolute inset-0  bg-opacity-60 px-8 py-6 flex flex-col justify-between">
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <p className="max-sm:pl-0 max-sm:px-5 max-sm:py-30 px-30 py-25 text-5xl max-sm:text-2xl font-bold">Hello, {username}</p>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem("token");
                    window.location.href = '/';
                    
                  }
                }}
                className="text-black dark:text-white bg-black hover:bg-gray-900 px-6 py-3 max-sm:px-3 max-sm:py-2 rounded-lg text-lg max-sm:text-sm shadow-lg "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="max-sm:pl-3 max-sm:pb-0 pl-30 px-6 py-8">
              <Watchlist />
        </div>
        <div className="max-sm:pl-3 max-sm:pt-0 pl-30 px-6 py-8">
          <History />
        </div>
        <Footer/>
        <br></br>
      </div>
    </div>
  );
};

export default MySpace;
