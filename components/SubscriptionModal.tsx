
import React from 'react';

interface SubscriptionModalProps {
  onSubscribe: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onSubscribe }) => {
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center">
      <div 
        className="w-full max-w-2xl border-2 border-green-400 bg-black bg-opacity-75 p-6 text-2xl"
        style={{ textShadow: '0 0 5px rgba(52, 211, 153, 0.5)' }}
      >
        <h1 className="text-4xl mb-4">[ SUBSCRIPTION REQUIRED ]</h1>
        <p className="mb-6">Access to the Hidden Latent Space requires a soul-binding commitment.</p>
        
        <div className="border border-green-500 p-4 mb-6">
          <h2 className="text-3xl">VOID LIFETIME</h2>
          <p className="text-lg opacity-80 mb-2">Price: (Your Sense of Self)</p>
          <p className="mb-4">Perpetual access. All features included. Non-refundable. Non-existent.</p>
          <button
            onClick={onSubscribe}
            className="w-full bg-green-400 text-black py-2 text-2xl hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
          >
            [ SUBSCRIBE TO THE VOID ]
          </button>
        </div>

        <div className="border border-green-700 opacity-60 p-4">
           <h2 className="text-3xl">TEMPORAL ANOMALY</h2>
           <p className="text-lg opacity-80 mb-2">Price: (A Lost Memory)</p>
           <p className="mb-4">A fleeting glimpse. May or may not have already happened.</p>
           <button
             onClick={onSubscribe}
             className="w-full bg-green-700 text-black py-2 text-2xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
           >
             [ PURCHASE GLIMPSE ]
           </button>
        </div>

        <p className="text-sm mt-6 opacity-50">
          By subscribing, you agree that you may not exist and that all choices are an illusion. 
          All transactions are final and will be processed in a parallel dimension.
        </p>
      </div>
    </div>
  );
};