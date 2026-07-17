"use client";

import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export function MapboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
  }, []);

  return <>{children}</>;
}
