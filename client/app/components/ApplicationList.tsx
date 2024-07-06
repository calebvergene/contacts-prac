import React from "react";

interface Application {
  id: number;
  status: string;
  name: string;
  open: string;
  close: string;
  link: string;
}

interface ApplicationListProps {
  applications: Application[];
  updateApplication: (application: Application) => void;
  updateCallback: () => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, updateApplication, updateCallback }) => {

  const onDelete = async (id: number) => {
    try {
      const options = {
        method: "DELETE"
      };
      const response = await fetch(`http://127.0.0.1:5000/delete_application/${id}`, options);
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <div className="w-3/4">
        <h2 className="text-center text-2xl font-bold mb-4">Applications</h2>
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="border-b border-gray-300 py-2 text-center">Name</th>
              <th className="border-b border-gray-300 py-2 text-center">Status</th>
              <th className="border-b border-gray-300 py-2 text-center">Open</th>
              <th className="border-b border-gray-300 py-2 text-center">Due</th>
              <th className="border-b border-gray-300 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <React.Fragment key={application.id}>
                {index > 0 && (
                  <tr>
                    <td colSpan={5}>
                      <hr className="border-t border-gray-300 my-4" />
                    </td>
                  </tr>
                )}
                <tr className="h-16">
                  <td className="py-2 text-center">{application.name}</td>
                  <td className="py-2 text-center">{application.status}</td>
                  <td className="py-2 text-center">{application.open}</td>
                  <td className="py-2 text-center">{application.close}</td>
                  <td className="py-2 text-center flex justify-center space-x-2">
                    <button onClick={() => onDelete(application.id)} className="text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9L14.394 18M9.26 18L9.606 9M18.628 5.79C18.97 5.842 19.31 5.897 19.65 5.956M18.628 5.79L18.16 19.673A2.25 2.25 0 0115.916 21H8.084A2.25 2.25 0 015.84 19.673L5.372 5.79M18.628 5.79C17.48 5.618 16.313 5.492 15.13 5.414M4.372 5.79C4.034 5.731 3.694 5.676 3.354 5.617M4.372 5.79A48.108 48.108 0 007.85 5.393M14.5 4.5V3.75C14.5 2.57 13.59 1.586 12.41 1.55A51.964 51.964 0 009.09 1.55C7.91 1.586 7 2.57 7 3.75V4.5M14.5 4.5H9.5M14.5 4.5H9.5M14.5 4.5V5.393M9.5 4.5V5.393" />
                      </svg>
                    </button>
                    <button onClick={() => updateApplication(application)} className="text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationList;
