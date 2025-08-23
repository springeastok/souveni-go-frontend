'use client';
import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';

function MapViewUpdater({ userLocation, items }) {
  const map = useMap();
  useEffect(() => {
    if (!map || (!userLocation && items.length === 0)) return;
    const bounds = new window.google.maps.LatLngBounds();
    if (userLocation) {
      bounds.extend({ lat: userLocation.lat, lng: userLocation.lng });
    }
    items.forEach(item => {
      if (item.location) {
        bounds.extend({ lat: item.location.lat, lng: item.location.lng });
      }
    });
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, 100);
    }
  }, [map, userLocation, items]);
  return null;
}

export default function MapComponent({ userLocation, items, onGoToMap }) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [openInfoWindow, setOpenInfoWindow] = useState(null);
  const [confirmingItem, setConfirmingItem] = useState(null);

  if (!API_KEY) return <div className="w-full h-full bg-gray-300 flex justify-center items-center"><p>Google Maps APIキーを設定してください</p></div>;
  if (!userLocation) return <div className="w-full h-full bg-gray-200 animate-pulse" />;

  const handleConfirmGoToMap = () => {
    if (confirmingItem) {
      onGoToMap(confirmingItem);
    }
    setConfirmingItem(null);
  };

  return (
    <div className="w-full h-full relative">
      <APIProvider apiKey={API_KEY}>
        <Map defaultCenter={{ lat: userLocation.lat, lng: userLocation.lng }} mapId="SOUVENIGO_MAP" className="w-full h-full" gestureHandling={'greedy'}>
          <AdvancedMarker position={{ lat: userLocation.lat, lng: userLocation.lng }} title={'現在地'} />
          
          {items.map((item) => (
            item.location && (
              <AdvancedMarker 
                key={item.id} 
                position={{ lat: item.location.lat, lng: item.location.lng }}
                onClick={() => setOpenInfoWindow(item)}
              >
                <img src="/Souvenigo_pin.png" alt="map pin" className="w-10 h-10 cursor-pointer" />
              </AdvancedMarker>
            )
          ))}

          {openInfoWindow && openInfoWindow.location && (
            <InfoWindow position={{ lat: openInfoWindow.location.lat, lng: openInfoWindow.location.lng }} onCloseClick={() => setOpenInfoWindow(null)}>
              <div className="p-2 text-center">
                <p className="font-bold">{openInfoWindow.name}</p>
                {openInfoWindow.image_url && (
                  <img src={openInfoWindow.image_url} alt={openInfoWindow.name} className="w-24 h-24 object-cover rounded-md mx-auto my-2" />
                )}
                <button onClick={() => setConfirmingItem(openInfoWindow)} className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                  見に行きたい！
                </button>
              </div>
            </InfoWindow>
          )}

          <MapViewUpdater userLocation={userLocation} items={items} />
        </Map>

        {confirmingItem && (
          <div className="fixed inset-0 bg-[#FDF8E8]/75 backdrop-blur-sm flex justify-center items-center z-50" onClick={() => setConfirmingItem(null)}>
            <div className="bg-white p-6 rounded-lg shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
              <p className="font-semibold mb-4">マップアプリを開きますか？</p>
              <div className="flex gap-4">
                {/* ★★★ This was the line with the typo ★★★ */}
                <button onClick={handleConfirmGoToMap} className="px-6 py-2 bg-blue-500 text-white rounded-lg">はい</button>
                <button onClick={() => setConfirmingItem(null)} className="px-6 py-2 bg-gray-200 rounded-lg">いいえ</button>
              </div>
            </div>
          </div>
        )}
      </APIProvider>

      <img 
        src="/souvenigo_logo.png" 
        alt="SouveniGo Logo" 
        className="absolute top-10 left-4 z-10 h-8"
      />
    </div>
  );
}