import { LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/useAuth';
import DashboardActive from '../Dashboard-active.svg';
import DashboardInactive from '../Dashboard.svg';
import ProjectListActive from '../Project-list-active.svg';
import ProjectListInactive from '../Project-list.svg';
import CreateProjectActive from '../create-project-active.svg';
import CreateProjectInactive from '../create-project.svg';

function Sidebar() {
    const { handleLogoutAuth } = useAuth();
    const [active, setActive] = useState("Dashboard");
    const navigate = useNavigate();

    useEffect(() => {
        // Handle initial navigation based on active state
        if (active === "Dashboard") {
            navigate('/');
        } else if (active === "Project-list") {
            navigate('/project-list');
        } else if (active === "Create-project") {
            navigate('/create-project');
        }
    }, [active, navigate]);

    const handleClick = (item, path) => {
        setActive(item);
        navigate(path);
    };

    const renderItem = (item, activeImg, inactiveImg, path) => (
        <div 
            onClick={() => handleClick(item, path)} 
            className={`flex justify-center items-center cursor-pointer ${active === item ? 'relative' : ''}`}
        >
            {active === item && <div className='bg-[#044E92] w-12 md:w-1 rounded-t-xl md:rounded-r-xl h-2 md:h-8 fixed bottom-0 md:bottom-auto left-auto md:left-0'></div>}
            <img src={active === item ? activeImg : inactiveImg} alt={item} />
        </div>
    );

    return (
        <div className="w-full h-full md:h-screen gap-y-16 flex flex-row md:flex-col justify-around md:justify-center items-center">
            <div className='w-full gap-y-8 flex flex-row md:flex-col justify-around md:justify-center items-center'>

                {renderItem("Dashboard", DashboardActive, DashboardInactive, "/")}
                {renderItem("Project-list", ProjectListActive, ProjectListInactive, "/project-list")}
                <div className="hidden md:block">
                    <hr className="w-6 h-1 mx-auto bg-gray-300 border-0 rounded my-4 dark:bg-gray-700" />
                </div>
                {renderItem("Create-project", CreateProjectActive, CreateProjectInactive, "/create-project")}
            </div>

            <div className='hidden md:block' onClick={handleLogoutAuth}>
                <LogOut className='text-gray-400 hover:text-[#044E92] transition-all' />
            </div>
        </div>
    );
}

export default Sidebar;
