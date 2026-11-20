import logo from "../assets/autoRescue.png"

function Navbar({setToken}) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <nav className="w-full px-6 py-2 shadow-lg bg-gray-50">
        <div className="max-w-7xl mx-auto flex gap-4">
           <img src={logo} alt="logo" className="h-8 mt-1"/>
           <div className="text-2xl font-bold text-gray-950"><span className="text-red-600">Auto</span>Rescue</div>
          <div className="grow"></div>
          <div>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
    </nav>
  )
}
export default Navbar