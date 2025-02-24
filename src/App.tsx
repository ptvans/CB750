import React, { useState, useRef } from 'react';
import SignaturePad from 'react-signature-canvas';
import { FileText, Pen, Upload, DollarSign } from 'lucide-react';

type SignaturePadRef = SignaturePad | null;

function App() {
  const [buyerName, setBuyerName] = useState(() => localStorage.getItem('buyerName') || '');
  const [buyerStreet, setBuyerStreet] = useState(() => localStorage.getItem('buyerStreet') || '');
  const [buyerCity, setBuyerCity] = useState(() => localStorage.getItem('buyerCity') || '');
  const [buyerState, setBuyerState] = useState(() => localStorage.getItem('buyerState') || 'CA');
  const [buyerZip, setBuyerZip] = useState(() => localStorage.getItem('buyerZip') || '');
  const [signature, setSignature] = useState(() => localStorage.getItem('signature') || '');
  const [licenseImage, setLicenseImage] = useState(() => localStorage.getItem('licenseImage') || '');
  const signaturePadRef = useRef<SignaturePadRef>(null);

  const handleSaveSignature = () => {
    if (signaturePadRef.current) {
      const signatureData = signaturePadRef.current.toDataURL();
      setSignature(signatureData);
      localStorage.setItem('signature', signatureData);
    }
  };

  const handleClearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setSignature('');
      localStorage.removeItem('signature');
    }
  };

  const handleBuyerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setBuyerName(name);
    localStorage.setItem('buyerName', name);
  };

  const handleBuyerStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const street = e.target.value;
    setBuyerStreet(street);
    localStorage.setItem('buyerStreet', street);
  };

  const handleBuyerCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    setBuyerCity(city);
    localStorage.setItem('buyerCity', city);
  };

  const handleBuyerStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setBuyerState(state);
    localStorage.setItem('buyerState', state);
  };

  const handleBuyerZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.slice(0, 5);
    setBuyerZip(zip);
    localStorage.setItem('buyerZip', zip);
  };

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setLicenseImage(imageData);
        localStorage.setItem('licenseImage', imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLicense = () => {
    setLicenseImage('');
    localStorage.removeItem('licenseImage');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-900">Vehicle Bill of Sale</h1>
            </div>
            <p className="text-gray-500">State of California</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-700">
                This Bill of Sale is executed on {new Date().toLocaleDateString()} between:
              </p>
              
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Seller Information:</h2>
                <p>Name: Steve Hull<br />
                Address: 20310 River Blvd, Monte Rio, CA 95462</p>
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-semibold">Vehicle Information:</h2>
                <p>
                  Make: Honda<br />
                  Model: CB750 Nighthawk<br />
                  Year: 1999<br />
                  Odometer Reading: 18,405 miles
                </p>
              </div>

              <div className="mt-6">
                <p className="text-gray-700">
                  For valuable consideration in the amount of $1,500 USD (plus delivery fee), the Seller does hereby sell, transfer, and convey to the Buyer all rights, title, and interest in the above-described vehicle.
                </p>
                <p className="mt-4 text-gray-700">
                  The vehicle is sold "AS IS" and the Seller makes no warranties, express or implied, regarding the condition or title of the vehicle.
                </p>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700">
                    To schedule delivery of vehicle, buyer shall provide a deposit in the amount of $200.00 USD. The deposit will be applied to the purchase of the vehicle. 50% of the deposit amount is refundable if transaction not completed.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Pen className="h-5 w-5" />
                Buyer's Information and Signature
              </h2>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="buyerName"
                    value={buyerName}
                    onChange={handleBuyerNameChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="buyerStreet" className="block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="buyerStreet"
                      value={buyerStreet}
                      onChange={handleBuyerStreetChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="buyerCity" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="buyerCity"
                        value={buyerCity}
                        onChange={handleBuyerCityChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label htmlFor="buyerState" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <select
                        id="buyerState"
                        value={buyerState}
                        onChange={handleBuyerStateChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="CA">California</option>
                        <option value="OR">Oregon</option>
                        <option value="WA">Washington</option>
                        <option value="NV">Nevada</option>
                        <option value="AZ">Arizona</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="buyerZip" className="block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="buyerZip"
                        value={buyerZip}
                        onChange={handleBuyerZipChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="ZIP code"
                        maxLength={5}
                        pattern="[0-9]*"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Driver's License Photo
                  </label>
                  {licenseImage ? (
                    <div className="mt-2 border rounded-lg p-4">
                      <img 
                        src={licenseImage} 
                        alt="Driver's License" 
                        className="max-h-48 mx-auto"
                      />
                      <button
                        onClick={handleRemoveLicense}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Photo
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-2 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="license-upload"
                            className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a photo</span>
                            <input
                              id="license-upload"
                              name="license-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleLicenseUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buyer's Signature
                </label>
                {signature ? (
                  <div className="border rounded-lg p-4 bg-white">
                    <img src={signature} alt="Signature" className="max-h-32" />
                    <button
                      onClick={handleClearSignature}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Clear Signature
                    </button>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-white">
                    <SignaturePad
                      ref={signaturePadRef}
                      canvasProps={{
                        className: 'signature-canvas w-full h-32 border rounded',
                      }}
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={handleSaveSignature}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save Signature
                      </button>
                      <button
                        onClick={handleClearSignature}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 border-t pt-6">
                <a
                  href="https://www.paypal.com/paypalme/vansspeed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Finalize & Pay $200 Deposit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
