import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { Pet } from "@/types/pet";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export function usePetsMap(
  containerRef: React.RefObject<HTMLDivElement | null>,
  pets: Pet[],
  selectedPetId: string | null
) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    // 1. Verificações iniciais de segurança
    if (!containerRef.current || !selectedPetId) return;

    const selectedPet = pets.find((p) => p.id === selectedPetId);
    if (!selectedPet) return;

    // 2. Inicialização do Mapa
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [selectedPet.lng, selectedPet.lat],
        zoom: 15,
      });
    }

    const map = mapRef.current;
    if (!map) return; 

    if (markerRef.current) {
      markerRef.current.remove();
    }

    markerRef.current = new mapboxgl.Marker({ 
      color: selectedPet.safe ? "#10b981" : "#ef4444",
      anchor: 'bottom' // Ajuda na precisão do local
    })
      .setLngLat([selectedPet.lng, selectedPet.lat])
      .addTo(map); 

    map.flyTo({
      center: [selectedPet.lng, selectedPet.lat],
      duration: 2000,
      essential: true,
    });

    setTimeout(() => {
      map.resize();
    }, 100);

  }, [containerRef, pets, selectedPetId]);
}