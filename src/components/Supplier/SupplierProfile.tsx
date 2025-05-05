import React from 'react';
import { useParams } from 'react-router-dom';
import { useSupplier } from '../../context/SupplierContext';
import { Star, MapPin, Building2, Users, Calendar, Shield, MessageSquare } from 'lucide-react';

const SupplierProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getSupplierById, loading, error } = useSupplier();
  const supplier = id ? getSupplierById(id) : undefined;

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!supplier) {
    return <div className="text-center p-4">Supplier not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            {supplier.logo ? (
              <img src={supplier.logo} alt={supplier.name} className="w-full h-full object-contain" />
            ) : (
              <Building2 className="w-16 h-16 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{supplier.name}</h1>
              {supplier.verified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{supplier.location}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{supplier.rating.toFixed(1)}</span>
                <span className="text-gray-500">({supplier.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Response Time: {supplier.responseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
            <p className="text-gray-600 mb-4">{supplier.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span>Business Type: {supplier.businessType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Established: {supplier.yearEstablished}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span>Employees: {supplier.employees}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Production Capacity</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">{supplier.productionCapacity}</p>
            </div>
          </div>
        </div>

        {/* Main Products */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Main Products</h2>
          <div className="flex flex-wrap gap-2">
            {supplier.mainProducts.map((product, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {supplier.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-2">
              {supplier.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Contact Person</h3>
              <p className="text-gray-600">{supplier.contact.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Email</h3>
              <p className="text-gray-600">{supplier.contact.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Phone</h3>
              <p className="text-gray-600">{supplier.contact.phone}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Website</h3>
              <a
                href={supplier.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {supplier.contact.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile; 