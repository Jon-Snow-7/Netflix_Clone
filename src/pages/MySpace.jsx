import Watchlist from '../components/Myspacecom/Watchlist';
import SideBar from '../components/SideBar';
import History from '../components/History';
import Footer from '../components/Footer';
import ProfileSelector from '../components/ProfileSelector';

const MySpace = () => {
  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden">
      <div className=" fixed top-0 left-0 h-screen z-50">
        <SideBar />
      </div>
      <div className="flex-1 overflow-x-hidden z-0">
        <div
          className="w-full h-[30vh] bg-cover bg-center relative z-10"
          style={{
            backgroundImage: `url('images/two.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-opacity-60 px-8 py-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="max-sm:pl-0 max-sm:px-5 max-sm:py-30 px-30 py-25 text-5xl max-sm:text-2xl font-bold">Hello, {localStorage.getItem("prifilename")}</p>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("profile");
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

        {/* 🔽 Inserted Profile Selector Below Header */}
        <div className="!ml-30 !mt-20">
        <ProfileSelector hideHeader={true} hideManageButton={true} profile_wide={6.5} profile_height={6.5} rounded={9999} plus_margin_text={0.25} plus_margin_top={0.75} navigation = {"/myspace"}/>
        </div>
        <div className="max-sm:pl-3 max-sm:pt-0 pl-30 px-6 py-8">
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
