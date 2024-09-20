import React, { useState } from "react";

const App = () => {
  // State to hold the services
  const [services, setServices] = useState([
    { id: 1, name: "General Consultation", description: "General health check-up", price: 50 },
    { id: 2, name: "Pediatric Check-up", description: "Child health examination", price: 70 },
  ]);

  const [newService, setNewService] = useState({ name: "", description: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  // Add a new service
  const addService = (e) => {
    e.preventDefault();
    // form validation
    if (!newService.name || !newService.description || !newService.price) return; 

    const newEntry = { ...newService, id: Date.now() };
    setServices([...services, newEntry]);
    setNewService({ name: "", description: "", price: "" }); // reset form
  };

  // Delete a service
  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  // Edit a service
  const startEditService = (service) => {
    setIsEditing(true);
    setEditServiceId(service.id);
    setNewService({ name: service.name, description: service.description, price: service.price });
  };

  const updateService = (e) => {
    e.preventDefault();
    setServices(
      services.map((service) =>
        service.id === editServiceId
          ? { ...service, name: newService.name, description: newService.description, price: newService.price }
          : service
      )
    );
    setIsEditing(false);
    setNewService({ name: "", description: "", price: "" });
  };

  return (
    <div className="w-full h-screen bg-[#e7ecef]">
    <div className="container mx-auto p-4 space-y-10">
      <h1 className="text-3xl font-bold text-center mb-4">Healthcare Services</h1>
      
      {/* Service Form */}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={isEditing ? updateService : addService}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Service Name</label>
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={newService.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={newService.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
             dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center
              me-2 mb-2"
          >
            {isEditing ? "Update Service" : "Add Service"}
          </button>
        </div>
      </form>

      {/* Service List */}
      <ul className="space-y-4 shadow-lg bg-white p-5 rounded-xl">
        {services.map((service) => (
          <li key={service.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">{service.name}</p>
              <p className="text-gray-500">{service.description}</p>
              <p className="text-gray-800">${service.price}</p>
            </div>
            <div>
              <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600
               to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50
                 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5
                  py-2.5 text-center me-2 mb-2 "
                onClick={() => startEditService(service)}
              >
                Edit
              </button>
              <button
               className="text-white bg-gradient-to-r from-red-400 via-red-500
                to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                 focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 
                 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm 
                 px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => deleteService(service.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default App;
