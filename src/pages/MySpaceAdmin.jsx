import Watchlist from '../components/Myspacecom/Watchlist';
import History from '../components/History';
import Footer from '../components/Footer';
import SideBarAdmin from '../components/SideBarAdmin';

const MySpaceAdmin = () => {
  const username = 'John Doe';
  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      {/* Sidebar (always visible on left) */}
      <div className=" fixed top-0 left-0 h-screen  z-50">
         <SideBarAdmin />
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
              <h1 className="px-30 py-25 text-4xl font-bold">Hello, {username}</h1>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem("token");
                    window.location.href = '/';
                    
                  }
                }}
                className="text-black dark:text-white bg-black hover:bg-gray-900 px-6 py-3 rounded-lg text-lg shadow-lg "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="pl-30 px-6 py-8">
              <Watchlist />
        </div>
        <div className="pl-30 px-6 py-8">
          <History />
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default MySpaceAdmin;
