import { AlignLeft, Search } from "lucide-react";
import Navbar from "./navBar";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiConfig from "../utils/url";
import dateTransform from "../utils/dataTransform";

const FilterType = [
  "Priority",
  "Category",
  "Reason",
  "Division",
  "Department",
  "Location",
];

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("Priority");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);

  const handleIncrement = () => {
    if (endIndex >= projects.length) return;
    setStartIndex(startIndex + 5);
    setEndIndex(endIndex + 5);
  };

  const handleDecrement = () => {
    if (startIndex <= 0) return;
    setStartIndex(startIndex - 5);
    setEndIndex(endIndex - 5);
  };

  // Fetch project list
  const getProject = async () => {
    try {
      const response = await axios.get(ApiConfig.API_PROJECT_LIST_URL);
      setProjects([...response.data.projects]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  // Update project status
  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(
        ApiConfig.API_UPDATE_PROJECT_STATUS_URL,
        { id, status }
      );
      console.log(response.data);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === id ? { ...project, status } : project
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    const selectedField = e.target.value;
    setSortField(selectedField);
    // Toggle sort order
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };
  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortField) {
      case "Priority":
        // Custom order: Medium, Low, High
        const priorityOrder = { Medium: 1, Low: 2, High: 0 };
        const priorityComparison =
          priorityOrder[a.priority] - priorityOrder[b.priority];
        return sortOrder === "asc" ? priorityComparison : -priorityComparison;
      // Add cases for other fields as needed
      case "Category":
        return sortOrder === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      case "Reason":
        return sortOrder === "asc"
          ? a.reason.localeCompare(b.reason)
          : b.reason.localeCompare(a.reason);
      case "Division":
        return sortOrder === "asc"
          ? a.division.localeCompare(b.division)
          : b.division.localeCompare(a.division);
      case "Department":
        return sortOrder === "asc"
          ? a.department.localeCompare(b.department)
          : b.department.localeCompare(a.department);
      case "Location":
        return sortOrder === "asc"
          ? a.location.localeCompare(b.location)
          : b.location.localeCompare(a.location);
      case "StartDate":
        return sortOrder === "asc"
          ? new Date(a.startDate) - new Date(b.startDate)
          : new Date(b.startDate) - new Date(a.startDate);
      default:
        return 0;
    }
  });

  console.log(sortedProjects); // Add this line to inspect sorted projects

  const filteredProjects = sortedProjects.filter((project) =>
    Object.values(project).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Navbar header={"Project Listing"} />
      <div className="w-[90%] h-screen mx-8 px-6 md:bg-white rounded-lg fixed top-32 overflow-scroll md:overflow-hidden scrollbar">
        <div className="flex justify-between items-center p-4">
          <div className="max-w-sm w-full">
            <label className=" flex items-center gap-2 border-b-2 border-gray-300 pb-2 w-full max-w-md">
              <Search className="text-gray-400" />
              <input
                type="search"
                className="grow border-none outline-none w-full max-w-md bg-slate-200 md:bg-white"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
          </div>
          <div className="block md:hidden">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="text-gray-400"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <AlignLeft />
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                {FilterType.map((type) => (
                  <p key={type}>{type}</p>
                ))}
              </div>
            </dialog>
          </div>
          <div className="hidden md:block">
            <label className="flex items-center gap-x-4 justify-center w-full max-w-md">
              <span className="text-gray-400">Sort By :</span>
              <select
                className="select select-ghost max-w-xs"
                value={sortField}
                onChange={handleSortChange}
              >
                {[
                  "Priority",
                  "Category",
                  "Reason",
                  "Division",
                  "Department",
                  "Location",
                  "StartDate",
                ].map((field) => (
                  <option key={field}>{field}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Card for Mobile view */}
        <div className="mb-52 block md:hidden">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-white p-4 mb-4 rounded ">
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="font-semibold">{project.projectTheme}</h2>
                  <p className="text-sm text-gray-400 font-normal">
                    {dateTransform(project.startDate)} to{" "}
                    {dateTransform(project.endDate)}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-sm">{project.status}</p>
                </div>
              </div>
              <div>
                <p>
                  <span className="text-sm text-gray-400">Reason: </span>
                  <span className="text-sm">{project.reason}</span>
                </p>
                <p>
                  <span>
                    <span className="text-sm text-gray-400">Type: </span>
                    <span className="text-sm">{project.type}</span>
                  </span>
                  <span>
                    {" "}
                    <span className="text-sm text-gray-400">Category: </span>
                    <span className="text-sm">{project.category}</span>
                  </span>
                </p>
                <p>
                  <span>
                    <span className="text-sm text-gray-400">Div: </span>
                    <span className="text-sm">{project.division}</span>
                  </span>
                  <span>
                    {" "}
                    <span className="text-sm text-gray-400">Dept: </span>
                    <span className="text-sm">{project.department}</span>
                  </span>
                </p>
                <p>
                  <span className="text-sm text-gray-400">Location: </span>
                  <span className="text-sm">{project.location}</span>
                </p>
                <p>
                  <span className="text-sm text-gray-400">Priority: </span>
                  <span className="text-sm">{project.priority}</span>
                </p>
              </div>
              <div className="flex justify-around items-center gap-x-4 mt-4">
                <button
                  className="bg-primary text-white w-24 h-8 rounded-2xl"
                  onClick={() => handleStatusChange(project._id, "Running")}
                >
                  Start
                </button>
                <button
                  className="w-24 h-8 rounded-2xl text-primary border-primary border"
                  onClick={() => handleStatusChange(project._id, "Closed")}
                >
                  Close
                </button>
                <button
                  className="w-24 h-8 rounded-2xl text-primary border-primary border"
                  onClick={() => handleStatusChange(project._id, "Cancelled")}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table for desktop view */}
        <div className="w-full py-8">
          <table className="min-w-full bg-white border-gray-200 rounded-md hidden md:block">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-medium text-gray-700">
                <th className="px-6 py-3 border-b border-gray-200">
                  Project Theme
                </th>
                <th className="px-6 py-3 border-b border-gray-200">Reason</th>
                <th className="px-6 py-3 border-b border-gray-200">Type</th>
                <th className="px-6 py-3 border-b border-gray-200">Division</th>
                <th className="px-6 py-3 border-b border-gray-200">Category</th>
                <th className="px-6 py-3 border-b border-gray-200">Priority</th>
                <th className="px-6 py-3 border-b border-gray-200">
                  Department
                </th>
                <th className="px-6 py-3 border-b border-gray-200">Location</th>
                <th className="px-6 py-3 border-b border-gray-200">Status</th>
                <th className="px-6 py-3 border-b border-gray-200"></th>
                <th className="px-6 py-3 border-b border-gray-200"></th>
                <th className="px-6 py-3 border-b border-gray-200"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredProjects.slice(startIndex, endIndex).map((project) => (
                <tr key={project._id}>
                  <td className="w-80 px-0 py-4 border-b border-gray-200">
                    {project.projectTheme}
                    <p className="text-sm  text-gray-400 font-normal">
                      {dateTransform(project.startDate)} to{" "}
                      {dateTransform(project.endDate)}
                    </p>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {project.reason}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {project.type}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {project.division}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {project.category}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {project.priority}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {project.department}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {project.location}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {project.status}
                  </td>
                  <td className="px-1 py-4 border-b border-gray-200">
                    <button
                      className="bg-primary text-white w-20 h-8 rounded-2xl"
                      onClick={() => handleStatusChange(project._id, "Running")}
                    >
                      Start
                    </button>
                  </td>
                  <td className="px-1 py-4 border-b border-gray-200">
                    <button
                      className="w-20 h-8 rounded-2xl text-primary border-primary border "
                      onClick={() => handleStatusChange(project._id, "Closed")}
                    >
                      Close
                    </button>
                  </td>
                  <td className="px-1 py-4 border-b border-gray-200">
                    <button
                      className="w-20 h-8 rounded-2xl text-primary border-primary border "
                      onClick={() =>
                        handleStatusChange(project._id, "Cancelled")
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="fixed bottom-4 ">
            <button
              className="btn btn-ghost w-20 h-8 rounded-2xl"
              onClick={handleDecrement}
            >
              Prev
            </button>
            <button
              className="btn btn-ghost w-20 h-8 rounded-2xl"
              onClick={handleIncrement}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
