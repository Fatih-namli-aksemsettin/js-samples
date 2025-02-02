/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START maps_deckgl_points]
import { GeoJsonLayer } from "deck.gl";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import * as GeoJSON from "geojson";

type Properties = { mag: number };
type Feature = GeoJSON.Feature<GeoJSON.Point, Properties>;

// Initialize and add the map
function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 40, lng: -110 },
      zoom: 4,
    }
  );

  const deckOverlay = new GoogleMapsOverlay({
    layers: [
      new GeoJsonLayer({
        id: "earthquakes",
        data: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusMaxPixels: 200,
        opacity: 0.4,
        pointRadiusScale: 0.3,
        getRadius: (f: Feature) => Math.pow(10, f.properties.mag),
        getFillColor: [255, 70, 30, 180],
        autoHighlight: true,
        transitions: {
          getRadius: {
            type: "spring",
            stiffness: 0.1,
            damping: 0.15,
            enter: () => [0], // grow from size 0,
            duration: 10000,
          },
        },
        onDataLoad: () => {
          /* eslint-disable no-undef */
          // @ts-ignore defined in include
          progress.done(); // hides progress bar
          /* eslint-enable no-undef */
        },
      }),
    ],
  });

  deckOverlay.setMap(map);
}
// [END maps_deckgl_points]
export { initMap };
